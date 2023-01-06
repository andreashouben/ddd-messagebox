import {Customer} from "../customer/customer";
import {IncomingMessage} from "./messageBoxService";
import {Conversation} from "./conversation/conversation";
import {Conversations} from "./conversation/conversations";


export class MessageBox {
    private customer: Customer;

    private conversations: Conversations;

    constructor(customer: Customer) {
        this.customer = customer;
        this.conversations = new Conversations();
    }

    getUserEmail() {
        return this.customer.getMailAddress();
    }

    createNewConversationFromIncomingMessage(incomingMessage: IncomingMessage, createDate: Date) {
        const conversation = new Conversation(incomingMessage, createDate);
        this.conversations.add(conversation);
    }

    getConversations() {
        return this.conversations;
    }
}