import MessageStatus from "./MessageStatus";

export class Message {
	public username: string;
	public time: number;
	public message: string;
	public status: MessageStatus;

	public constructor({
		username,
		time,
		message,
		status,
	}: {
		username: string;
		time: number;
		message: string;
		status: MessageStatus;
	}) {
		this.username = username;
		this.time = time;
		this.message = message;
		this.status = status;
	}
}
