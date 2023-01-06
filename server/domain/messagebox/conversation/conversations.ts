import {Conversation} from "./conversation";

export class Conversations {

    private conversations: Conversation[] =[]

    add(conversation: Conversation) {
        this.conversations = [...this.conversations, conversation]
    }

    getLatestConversation() {
        return this.conversations[0];
    }

    count() {
        return this.conversations.length;
    }
}