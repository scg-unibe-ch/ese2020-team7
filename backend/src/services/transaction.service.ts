
import { Product } from '../models/product.model';
import { Transaction, TransactionAttributes } from '../models/transaction.model';
import { User } from '../models/user.model';

export class TransactionService {

    public async buy(transaction: TransactionAttributes): Promise<TransactionAttributes> {
        return Transaction.create(transaction)
        .then(createdTransaction => {
            if (createdTransaction) {
                return Product.findByPk(transaction.productId)
                .then(foundProduct => {
                    return User.findByPk(transaction.buyerId)
                    .then(foundBuyer => {
                        if (foundBuyer.wallet >= foundProduct.price) {
                            return foundProduct.update({
                                isAvailable: false,
                                dateBought: Date.now(),
                                buyerId: createdTransaction.buyerId
                            });
                        } else {
                            return Promise.reject('The buyer does not have enough money!');
                        }
                    });
                })
                .then(() => {
                    return createdTransaction.update({
                            transactionStatus: 1
                    });
                })
                .then(async () => {
                    if  (createdTransaction.transactionStatus === 1) {
                        const statusMakePayment = await this.makePayment(createdTransaction);
                        return createdTransaction.update({
                            transactionStatus: statusMakePayment
                        });
                    } else {
                        return Promise.reject('Something went wrong in step 1!');
                    }
                })
                .then(async () => {
                    if (createdTransaction.transactionStatus === 2) {
                        const statusReceivePayment = await this.receivePayment(createdTransaction);
                        return createdTransaction.update({
                            transactionStatus: statusReceivePayment
                        });
                    } else {
                        return Promise.reject('Something went wrong in step 2!');
                    }
                })
                .then(() => {
                    if (createdTransaction.transactionStatus === 3) {
                        return Promise.resolve(createdTransaction);
                    } else {
                        return Promise.reject('Something went wrong in step 3!');
                    }

                })
                .catch(err => Promise.reject(err));
            } else {
                return Promise.reject('Transaction could not be created!');
            }
        })
        .catch(err => Promise.reject(err));
    }

    private makePayment(transaction: Transaction): Promise<number> {
        return Product.findByPk(transaction.productId)
        .then(foundProduct => {
            return User.increment({ wallet: -foundProduct.price }, {
                where: {
                    userId: transaction.buyerId
                }
            });
        })
        .then(() => {
            return Promise.resolve(2);
        })
        .catch(err => Promise.reject(err));
    }

    private receivePayment(transaction: Transaction): Promise<number> {
        return Product.findByPk(transaction.productId)
        .then(foundProduct => {
            return User.increment({ wallet: foundProduct.price }, {
                where: {
                    userId: foundProduct.userId
                }
            });
        })
        .then(() => {
            return Promise.resolve(3);
        })
        .catch(err => Promise.reject(err));
    }
}
