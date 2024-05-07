import { MessageFromFront } from '../types/MessageFromFront';
import { ResponceToFront } from '../types/ResponseToFront';

export const generateResponse = (from: MessageFromFront): ResponceToFront => ({
	...from,
	payload: {
		status: 'ok',
		message: '',
	},
});
