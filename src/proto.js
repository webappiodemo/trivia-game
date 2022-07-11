import React, {useEffect, useState} from "react";

const ProtoContext = React.createContext({
    send: (message) => {
    },
    wsReady: false,
});
const useProtocol = () => {
    return React.useContext(ProtoContext);
}

const ProtoProvider = React.memo(({children}) => {
    const [ws, setWS] = useState(null);
    const [data, setData] = useState({});
    const [wsReady, setWSReady] = useState(false);

    useEffect(() => {
        if (ws) {
            return;
        }

        const reconnect = () => {
            const proto = (window.location.protocol === "http:" ? "ws:" : "wss:")
            const newWS = new WebSocket(proto + "//" + window.location.host + "/game-ws");
            newWS.onmessage = ev => {
                setData(prevData => ({...prevData, ...JSON.parse(ev.data)}))
            }
            newWS.onclose = ev => {
                setWSReady(false);
                reconnect();
            }
            newWS.onopen = ev => {
                setWSReady(true);
            }
            setWS(newWS);
        }
        reconnect();
    }, [])

    return <ProtoContext.Provider value={{
        send: message => {
            if (!ws || ws.readyState !== WebSocket.OPEN) {
                console.error("disconnected");
                return;
            }
            ws.send(JSON.stringify(message));
        },
        wsReady: wsReady,
        ...data
    }}>{children}</ProtoContext.Provider>
});

export {useProtocol, ProtoProvider}