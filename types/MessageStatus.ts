enum MessageStatus {
	send = "send", // сообщение отправлено, ожидается ответ
	ok = "ok", // корректное сообщение
	error = "error", // сообщение с ошибкой
}

export default MessageStatus;
