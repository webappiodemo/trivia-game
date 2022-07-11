package main

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"net/http/httputil"
)

type GamePlayer struct {
	Name   string          `json:"name"`
	Id     string          `json:"id"`
	Points int             `json:"points"`
	WS     *websocket.Conn `json:"-"`
}

type Game struct {
	GameCode     string
	Players      map[string]*GamePlayer
	HostPlayerId string
	State        string

	ServerWS *websocket.Conn `json:"-"`
}

func (h *Game) sendState(dest *websocket.Conn) {
	data := gin.H{
		"code":         h.GameCode,
		"players":      h.Players,
		"hostPlayerId": h.HostPlayerId,
		"state":        h.State,
	}
	err := dest.WriteJSON(data)
	if err != nil {
		log.Println(err)
	}
}

func (h *Game) sendUpdate() {
	for _, player := range h.Players {
		h.sendState(player.WS)
	}
	if h.ServerWS != nil {
		h.sendState(h.ServerWS)
	}
}

func (h *Game) ServeForPlayer(playerId string, conn *websocket.Conn) {
	if existing, ok := h.Players[playerId]; ok {
		existing.WS.Close()
		existing.WS = conn
	} else {
		h.Players[playerId] = &GamePlayer{
			Name: playerId, //TODO
			Id:   playerId,
			WS:   conn,
		}
		if h.HostPlayerId == "" {
			h.HostPlayerId = playerId
		}
	}
	h.sendUpdate()
	conn.WriteJSON(gin.H{"playerId": playerId})

	var message struct {
		Type string `json:"type"`
		Data json.RawMessage
	}
	for {
		err := conn.ReadJSON(&message)
		if err != nil {
			log.Print(err)
			return
		}
		if message.Type == "start" {
			if h.State == "NEW" {
				h.State = "WAITING_QUESTION"
				h.sendUpdate()
			}
		}
		log.Print("Got message: " + message.Type)
	}
}

func (h *Game) ServeForServer(conn *websocket.Conn) {
	if h.ServerWS != nil {
		h.ServerWS.Close()
	}
	h.ServerWS = conn
	h.sendUpdate()

	var message struct {
		Type string `json:"type"`
		Data json.RawMessage
	}
	for {
		err := conn.ReadJSON(&message)
		if err != nil {
			log.Print(err)
			return
		}
		if message.Type == "create" {
			//do nothing
		}
		log.Print("Got message: " + message.Type)
	}
}

var PlayerGames map[string]*Game
var GamesByCode map[string]*Game

func main() {
	PlayerGames = make(map[string]*Game)
	GamesByCode = make(map[string]*Game)

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	upgrader := websocket.Upgrader{}
	r.GET("/game-ws", func(ctx *gin.Context) {
		conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, ctx.Writer.Header())
		if err != nil {
			log.Print(err)
			return
		}
		for {
			var initialMessage struct {
				Type       string `json:"type"`
				LobbyCode  string `json:"lobbyCode"`
				PlayerName string `json:"playerName"`
			}
			err = conn.ReadJSON(&initialMessage)
			if err != nil {
				log.Print(err)
				return
			}
			log.Print("Got initial message: " + initialMessage.Type)

			if initialMessage.Type == "join" {
				if game, ok := PlayerGames[initialMessage.PlayerName]; ok {
					game.ServeForPlayer(initialMessage.PlayerName, conn)
					return
				} else if game, ok := GamesByCode[initialMessage.LobbyCode]; ok {
					game.ServeForPlayer(initialMessage.PlayerName, conn)
					return
				} else {
					log.Print("Player tried to join an invalid game: " + initialMessage.LobbyCode)
					log.Printf("Players is: %#v", GamesByCode)
				}
			} else if initialMessage.Type == "create" {
				log.Println("Game created with id " + initialMessage.LobbyCode)
				game := &Game{GameCode: initialMessage.LobbyCode}
				game.State = "NEW"
				game.Players = make(map[string]*GamePlayer)
				GamesByCode[game.GameCode] = game
				game.ServeForServer(conn)
				return
			}
		}
	})

	forwarder := &httputil.ReverseProxy{Director: func(request *http.Request) {
		request.URL.Host = "localhost:3000"
		request.URL.Scheme = "http"
	}}
	r.NoRoute(func(ctx *gin.Context) {
		forwarder.ServeHTTP(ctx.Writer, ctx.Request)
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
