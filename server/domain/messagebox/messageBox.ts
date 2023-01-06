import {Customer} from "../customer/customer";

export class MessageBox {
    private customer: Customer;

    constructor(customer: Customer) {
        this.customer = customer;
    }

    getUserEmail() {
        return this.customer.getMailAddress();
    }
}