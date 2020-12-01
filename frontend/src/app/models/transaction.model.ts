export class Transaction {

  constructor(
    public transactionId: number,
    public productId: number,
    public buyerId: number,
    public transactionStatus: number,
    public deliveryStreet: string,
    public deliveryPinCode: number,
    public deliveryCity: string,
    public deliveryCountry: string

  ) {}
}
