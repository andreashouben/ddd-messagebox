import {MessageBox} from "./messageBox";

export interface MessageBoxRepository {
    persist(messageBox: MessageBox): void

    findMessageBoxByCustomerMailAddress(mailAddress: string): MessageBox;
}