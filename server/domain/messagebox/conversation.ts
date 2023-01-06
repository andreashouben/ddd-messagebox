import {IncomingMessage} from "./messageBoxService";
import {StoredMessage} from "./messageBox";

export class Conversation {
    messages: StoredMessage[] = []
    topic: string;


    constructor(incomingMessage: IncomingMessage, createDate: Date) {
        const {from, text, topic} = incomingMessage;
        this.topic = topic;
        const storedMessage: StoredMessage = {
            from, text, createDate
        }
        this.messages = [...this.messages, storedMessage];
    }

    public getTopic() {
        return this.topic;
    }
}