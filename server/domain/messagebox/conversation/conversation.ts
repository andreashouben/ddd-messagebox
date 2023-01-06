import {IncomingMessage} from "../messageBoxService";

export interface StoredMessage {
    from: string,
    createDate: Date,
    text: string
}

export class Conversation {
    private messages: StoredMessage[] = []
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

    public getMessages(){
        return Object.seal([...this.messages])
    }
}