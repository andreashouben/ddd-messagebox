import {MessageBoxRepository} from "./messageBoxRepository";
import {Customer} from "../customer/customer";
import {MessageBox} from "./messageBox";

export class MessageBoxService {
    private messageBoxRepo: MessageBoxRepository;

    constructor(messageBoxRepo: MessageBoxRepository) {
        this.messageBoxRepo = messageBoxRepo;

    }

    createMessageBoxForCustomer(customer: Customer) {
        const messageBox = new MessageBox(customer);
        this.messageBoxRepo.persist(messageBox);
    }

    getMessageBoxForCustomer(customer: Customer) {
        return this.messageBoxRepo.findMessageBoxByCustomerMailAddress(customer.getMailAddress());
    }
}