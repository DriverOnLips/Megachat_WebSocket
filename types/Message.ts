export class Message {
	public username: string;
	public time: number;
	public message: string;

	public constructor({
		username,
		time,
		message,
	}: {
		username: string;
		time: number;
		message: string;
	}) {
		this.username = username;
		this.time = time;
		this.message = message;
	}
}
