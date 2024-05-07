import WebSocket from 'ws';
import { MessageFromFront } from './types/MessageFromFront';
import { generateResponse } from './utils/generateResponse';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = app.listen(8080, () => {
	console.log('Server is running on http://localhost:8080');
});
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());

// Хранение всех подключенных клиентов
let clients = new Set<WebSocket>();

// Обработка подключений к веб-сокету
wss.on('connection', (ws: WebSocket) => {
	clients.add(ws);

	// Обработка сообщений от клиента
	ws.on('message', (message: WebSocket.Data) => {
		// Преобразование бинарных данных в строку
		const messageString = message.toString();
		// Преобразование строки в JSON
		const messageJson: MessageFromFront = JSON.parse(messageString);
		// console.log(`Received from a client:`, messageJson);

		// Ответ клиенту
		wss.clients.forEach((client) => {
			if (client === ws && client.readyState === WebSocket.OPEN) {
				const response = generateResponse(messageJson);
				// Отправка сообщения в формате JSON
				client.send(JSON.stringify(response));
			}
		});

		// Отправка сообщения всем клиентам
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				// Отправка сообщения в формате JSON
				client.send(JSON.stringify(messageJson));
			}
		});

		// Отправка сообщения на server2/front
		// Здесь должен быть ваш код для отправки сообщения на server2/front
	});

	// Обработка закрытия соединения
	ws.on('close', () => {
		clients.delete(ws);
	});
});

// Обработка POST запросов на эндпоинт /back
app.post('/back', (req: any, res: any) => {
	const message = req.body.message;
	console.log(`Received POST request: ${message}`);

	// Отправка сообщения всем клиентам
	clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(message));
		}
	});

	res.sendStatus(200);
});