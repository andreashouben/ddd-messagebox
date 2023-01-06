import {MessageBoxService} from "./messageBoxService";
import {MessageBoxRepository} from "./messageBoxRepository";
import {Customer} from "../customer/customer";
import {MessageBox} from "./messageBox";

describe('messageboxService', () => {

    class MessageBoxRepo implements MessageBoxRepository{
        private readonly repo: MessageBox[] = []
        persist(messageBox: MessageBox): void {
            this.repo.push(messageBox);
        }

        findMessageBoxByCustomerMailAddress(mailAddress: string): MessageBox {
             const messageBox = this.repo.find(mb => mb.getUserEmail() === mailAddress);
             if (messageBox === undefined){
                 throw Error(`Messagebox not found for user ${mailAddress}`)
             }
             return messageBox;
        }

    }

    it('can create a new messageBox for a customer', () => {
        const messageBoxService = new MessageBoxService(new MessageBoxRepo());
        const userMailAddress = "john.doe@example.com";
        const customer = new Customer(userMailAddress)

        messageBoxService.createMessageBoxForCustomer(customer)
        const messageBox: MessageBox = messageBoxService.getMessageBoxForCustomer(customer);

        expect(messageBox.getUserEmail()).toEqual(userMailAddress);
    })


})