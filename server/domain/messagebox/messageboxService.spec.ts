import {IncomingMessage, MessageBoxService} from "./messageBoxService";
import {MessageBoxRepository} from "./messageBoxRepository";
import {Customer} from "../customer/customer";
import {MessageBox, StoredMessage} from "./messageBox";
import {TimeService} from "./timeService";
import {Conversation} from "./conversation";


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
            const conversations: Conversation[] = messageBoxService.getConversationsOfUser(userMailAddress);

            expect(conversations).toHaveLength(0);
        })

        it('starts a conversation when the user sends a message', () => {

            const now = timeService.fixTime();

            messageBoxService.startConversation(incomingMessage);

            const conversationsOfUser = messageBoxService.getConversationsOfUser(userMailAddress);

            expect(conversationsOfUser).toHaveLength(1)
            const conversation = conversationsOfUser[0];
            expect(conversation.getTopic()).toEqual(incomingMessage.topic)
            const storedMessages = conversationsOfUser[0].messages;
            expect(storedMessages).toHaveLength(1);
            const actualMessage = storedMessages[0]

            const expectedMessage: StoredMessage = {
                from: userMailAddress,
                text: incomingMessage.text,
                createDate: now
            }
            expect(actualMessage).toEqual(expectedMessage)
        })
    })
})