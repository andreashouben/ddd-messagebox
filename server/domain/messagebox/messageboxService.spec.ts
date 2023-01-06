import {IncomingMessage, MessageBoxService} from "./messageBoxService";
import {MessageBoxRepository} from "./messageBoxRepository";
import {Customer} from "../customer/customer";
import {MessageBox} from "./messageBox";
import {TimeService} from "./timeService";
import {StoredMessage} from "./conversation/conversation";
import {Conversations} from "./conversation/conversations";


class MessageBoxRepo implements MessageBoxRepository {
    private readonly repo: MessageBox[] = []

    persist(messageBox: MessageBox): void {
        const index = this.repo.findIndex(mb => mb.getUserEmail() === messageBox.getUserEmail());
        if (index === -1) {
            this.repo.push(messageBox);
        } else {
            this.repo[index] = messageBox;
        }
    }

    findMessageBoxByCustomerMailAddress(mailAddress: string): MessageBox {
        const messageBox = this.repo.find(mb => mb.getUserEmail() === mailAddress);
        if (messageBox === undefined) {
            throw Error(`Messagebox not found for user ${mailAddress}`)
        }
        return Object.create(messageBox)
    }

}

class TestTimeService implements TimeService {

    private _now = new Date();

    now(): Date {
        return this._now;
    }

    public setNow(now: Date) {
        this._now = now;
    }

    fixTime() {
        const now = new Date();
        this._now = now;
        return now;
    }
}


let messageBoxService: MessageBoxService;
let timeService: TestTimeService;
describe('messageboxService', () => {


    beforeEach(() => {
        timeService = new TestTimeService();
        messageBoxService = new MessageBoxService(new MessageBoxRepo(), timeService);
    })

    describe('with Existing messagebox', () => {
        const userMailAddress = "john.doe@example.com";
        const customer = new Customer(userMailAddress)
        const incomingMessage: IncomingMessage = {
            from: userMailAddress,
            text: 'Hi, I have a question regarding my contract',
            topic: 'Question regarding contract'
        }

        beforeEach(() => {
            messageBoxService.createMessageBoxForCustomer(customer)
        })

        it('initially has no conversations', () => {
            const conversations: Conversations = messageBoxService.getConversationsOfUser(userMailAddress);

            expect(conversations.count()).toEqual(0)
        })

        it('starts a conversation when the user sends a message', () => {

            const now = timeService.fixTime();

            messageBoxService.startConversation(incomingMessage);

            const conversationsOfUser = messageBoxService.getConversationsOfUser(userMailAddress);

            expect(conversationsOfUser.count()).toEqual(1)
            const conversation = conversationsOfUser.getLatestConversation();
            expect(conversation.getTopic()).toEqual(incomingMessage.topic)
            const storedMessages = conversation.getMessages();
            expect(storedMessages).toHaveLength(1);
            const actualMessage = storedMessages[0]

            const expectedMessage: StoredMessage = {
                from: userMailAddress,
                text: incomingMessage.text,
                createDate: now
            }
            expect(actualMessage).toEqual(expectedMessage)
        })
/*
        it('lets a customer service agent answer on a user written message', () => {
            const now = timeService.fixTime();

            messageBoxService.startConversation(incomingMessage);
            const conversationsOfUser = messageBoxService.getConversationsOfUser(userMailAddress);


        })*/
    })
})