import {MessageBoxRepository} from "./messageBoxRepository";
import {Customer} from "../customer/customer";
import {MessageBox} from "./messageBox";
import {TimeService} from "./timeService";

export interface IncomingMessage {
    from: string,
    text: string
}

export class MessageBoxService {
    private messageBoxRepo: MessageBoxRepository;
    private timeService: TimeService;

    constructor(messageBoxRepo: MessageBoxRepository, timeService: TimeService) {
        this.messageBoxRepo = messageBoxRepo;
        this.timeService = timeService;
    }

    createMessageBoxForCustomer(customer: Customer) {
        const messageBox = new MessageBox(customer);
        this.messageBoxRepo.persist(messageBox);
    }


    getConversationsOfUser(userMailAddress: string) {
        const messageBox = this.messageBoxRepo.findMessageBoxByCustomerMailAddress(userMailAddress);
        return messageBox.getConversations();
    }

    startConversation(message: IncomingMessage) {
        const messageBox = this.messageBoxRepo.findMessageBoxByCustomerMailAddress(message.from);
        messageBox.createNewConversationByCustomerWithText(message.text, this.timeService.now());
        this.messageBoxRepo.persist(messageBox);
    }
}