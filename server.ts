import WebSocket from "ws";
import express from "express";
import bodyParser from "body-parser";
import { Message } from "./types/Message";
import { sendRequest } from "./utils/sendRequest";

const app = express();
const server = app.listen(8080, () => {
	console.log("Server is running on http://localhost:8080");
});
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());

// Хранение всех подключенных клиентов с их именами
let clients = new Map<WebSocket, string>();

// Обработка подключений к веб-сокету
wss.on("connection", (ws: WebSocket) => {
	// Обработка сообщений от клиента
	ws.on("message", (message: WebSocket.Data) => {
		const messageJson: Message = JSON.parse(message.toString());

		if (messageJson.status === "send") {
			clients.set(ws, messageJson.username);
		}

		wss.clients.forEach((client) => {
			if (client === ws && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({ ...messageJson, status: "ok" }));
			}

			// else if (client !== ws && client.readyState === WebSocket.OPEN) {
			// 	client.send(JSON.stringify({ ...messageJson, status: "ok" }));
			// }
		});

		// Отправка сообщения на server2/front
		// Здесь должен быть ваш код для отправки сообщения на server2/front
		// sendRequest(messageJson);
	});

	// Обработка закрытия соединения
	ws.on("close", () => {
		clients.delete(ws);
	});
});

// Обработка POST запросов на эндпоинт /back
app.post("/back", (req: express.Request, res: express.Response) => {
	const message: Message = req.body;
	console.log(`Received POST request: ${message.message}`);

	// Отправка сообщения всем клиентам, кроме указанного пользователя
	clients.forEach((username, client) => {
		if (username !== message.username && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(message));
		}
	});

	res.sendStatus(200);
});
