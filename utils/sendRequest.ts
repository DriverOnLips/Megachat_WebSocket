import axios from "axios";
import { Message } from "../types/Message";

export const sendRequest = (message: Message) => {
	axios.post("http://192.168.120.1:8800/front", message);
	//     // Обработка ответа, если необходимо
	//     console.log(response.data);
	//   })
	//  .catch(error => {
	//     // Обработка ошибок
	//     console.error(error);
	//   });
};
