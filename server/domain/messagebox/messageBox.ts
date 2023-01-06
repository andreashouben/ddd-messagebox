import {Customer} from "../customer/customer";


export interface StoredMessage {
    from: "Customer",
    createDate: Date,
    text: string
}

interface Conversation {
    messages: StoredMessage[]
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

    createNewConversationByCustomerWithText(text: string, createDate: Date) {
        const message: StoredMessage = {
            from: "Customer",
            text, createDate
        }
        const conversation = {
            messages: [message]
        }
        this.conversations.push(conversation);
    }

    getConversations() {
        return this.conversations;
    }
}