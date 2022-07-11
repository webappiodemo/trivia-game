FROM golang:1.16 AS gobuild

WORKDIR /app
COPY main.go go.mod go.sum ./
COPY vendor ./vendor
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 \
    go build -mod=vendor -tags netgo -ldflags '-w' \
    -o /goserver

FROM node:18-buster
COPY package.json package-lock.json ./
RUN npm install
COPY public public
COPY src src
RUN npm run build
COPY --from=gobuild /goserver ./goserver

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start-prod"]