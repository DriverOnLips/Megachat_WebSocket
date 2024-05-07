type ResponceToFrontPayload = {
	status: string;
	message: string;
};

export class ResponceToFront {
	public username: string;
	public time: number;
	public payload: ResponceToFrontPayload;

	public constructor({
		username,
		time,
		payload,
	}: {
		username: string;
		time: number;
		payload: ResponceToFrontPayload;
	}) {
		this.username = username;
		this.time = time;
		this.payload = payload;
	}
}
