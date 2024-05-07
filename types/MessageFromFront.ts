type MessageFromFrontPayload = {
	data: string;
};

export class MessageFromFront {
	public username: string;
	public time: number;
	public payload: MessageFromFrontPayload;

	constructor({
		username,
		time,
		payload,
	}: {
		username: string;
		time: number;
		payload: MessageFromFrontPayload;
	}) {
		this.username = username;
		this.time = time;
		this.payload = payload;
	}
}
