import {Customer} from "../customer/customer";
import {IncomingMessage} from "./messageBoxService";
import {Conversation} from "./conversation";


export interface StoredMessage {
    from: string,
    createDate: Date,
    text: string
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

    createNewConversationFromIncomingMessage(incomingMessage: IncomingMessage, createDate: Date) {
        const conversation = new Conversation(incomingMessage, createDate);
        this.conversations.push(conversation);
    }

    getConversations() {
        return this.conversations;
    }
}