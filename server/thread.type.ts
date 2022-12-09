import { Message } from "./message.type";

export type Thread = {
  id: string;
  topic: string;
  messages: Message[];
};
