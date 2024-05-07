const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
	console.log('Client connected');

	ws.on('message', (message) => {
		console.log(`Received message: ${message}`);
		// Дублирование сообщения всем клиентам
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

const PORT = 8000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
