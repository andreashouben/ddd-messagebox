import {Customer} from "../customer/customer";
import {IncomingMessage} from "./messageBoxService";


export interface StoredMessage {
    from: string,
    createDate: Date,
    text: string
}

class Conversation {
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

export class MessageBox {
    private customer: Customer;

    private conversations: Conversation[] = [];

    constructor(customer: Customer) {
        this.customer = customer;
    }

    getUserEmail() {
        return this.customer.getMailAddress();
    }

    createNewConversationByCustomerWithText(incomingMessage: IncomingMessage, createDate: Date) {
        const conversation = new Conversation(incomingMessage, createDate);
        this.conversations.push(conversation);
    }

    getConversations() {
        return this.conversations;
    }
}