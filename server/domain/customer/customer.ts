export class Customer {
    private readonly mailAddress: string;

    constructor(mailAddress: string) {
        this.mailAddress = mailAddress;
    }

    getMailAddress() {
        return this.mailAddress;
    }
}