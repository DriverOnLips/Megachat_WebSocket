export class ResponseToFront {
	public username: string;
	public time: number;
	public message: string;
	public status: string;

	public constructor({
		username,
		time,
		message,
		status,
	}: {
		username: string;
		time: number;
		status: string;
		message: string;
	}) {
		this.username = username;
		this.time = time;
		this.status = status;
		this.message = message;
	}
}
