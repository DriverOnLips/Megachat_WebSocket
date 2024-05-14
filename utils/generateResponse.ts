import { Message } from '../types/Message';
import { ResponseToFront } from '../types/ResponseToFront';

export const generateResponse = (from: Message): ResponseToFront => ({
	...from,
	status: 'ok',
});
