import { expect } from 'chai';
import dirtychai from 'dirty-chai';
import { ProductAttributes, Product } from '../../src/models/product.model';
import { Transaction, TransactionAttributes } from '../../src/models/transaction.model';
import { User, UserAttributes } from '../../src/models/user.model';
import { TransactionService } from '../../src/services/transaction.service';

// use command "npm run test" to run the tests

const chai = require('chai');
chai.use(dirtychai);

describe('TransactionService Tests', () => {

    const testTransactionService: TransactionService = new TransactionService();

    const user1: UserAttributes = {
        userId: 1,
        userName: 'Luca',
        password: 'notSecure10',
        email: 'luca@gmail.com',
        firstName: 'Luca',
        lastName: 'Schaller',
        gender: null,
        telephoneNumber: null,
        street: null,
        pinCode: null,
        city: null,
        country: null,
        admin: false,
        wallet: 500
    };

    const user2: UserAttributes = {
        userId: 2,
        userName: 'Nora',
        password: 'notSecure12',
        email: 'nora@gmail.com',
        firstName: 'Nora',
        lastName: 'Weber',
        gender: null,
        telephoneNumber: null,
        street: null,
        pinCode: null,
        city: null,
        country: null,
        admin: false,
        wallet: 500
    };

    const product1: ProductAttributes = {
        productId: 1,
        isApproved: true,
        title: 'Phone',
        isProduct: true,
        price: 300,
        description: 'IPhone X',
        location: 'Bern',
        isSelling: true,
        isAvailable: true,
        isDeliverable: true,
        rejectionReason: null,
        userId: 1,
        buyerId: null,
        dateBought: null,
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const product2: ProductAttributes = {
        productId: 2,
        isApproved: true,
        title: 'Cleaning',
        isProduct: false,
        price: 40,
        description: 'We will clean your house!',
        location: 'Basel',
        isSelling: true,
        isAvailable: true,
        isDeliverable: false,
        rejectionReason: null,
        userId: 1,
        buyerId: null,
        dateBought: null,
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const product3: ProductAttributes = {
        productId: 3,
        isApproved: true,
        title: 'Motorboat',
        isProduct: true,
        price: 100,
        description: 'Go on the lake for a weekend!',
        location: 'Murten',
        isSelling: false,
        isAvailable: true,
        isDeliverable: false,
        rejectionReason: null,
        userId: 1,
        buyerId: null,
        dateBought: null,
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const transaction1: TransactionAttributes = {
        transactionId: 1,
        productId: 1,
        buyerId: 2,
        transactionStatus: 0,
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
    };

    const transaction2: TransactionAttributes = {
        transactionId: 2,
        productId: 2,
        buyerId: 2,
        transactionStatus: 0,
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
    };

    const transaction3: TransactionAttributes = {
        transactionId: 3,
        productId: 3,
        buyerId: 2,
        transactionStatus: 0,
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
    };

    const transaction4: TransactionAttributes = {
        transactionId: 2,
        productId: null,
        buyerId: null,
        transactionStatus: null,
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
    };

    before('create admin', function() {
        User.create(user1);
        User.create(user2);
        Product.create(product1);
        Product.create(product2);
        Product.create(product3);
    });

    describe('Test buy product', () => {
        it('can buy a product successfully', function() {
            testTransactionService.buy(transaction1).then(transaction => {
                User.findByPk(1).then(foundUser => {
                    expect(foundUser.wallet).eq(800);
                });
                User.findByPk(2).then(foundUser => {
                    expect(foundUser.wallet).eq(200);
                });
                Product.findByPk(1).then(foundProduct => {
                    expect(foundProduct.buyerId).eq(2);
                    expect(foundProduct.dateBought).not.to.be.null();
                    expect(foundProduct.isAvailable).to.be.false();
                    expect(foundProduct.returnedAfterLoan).to.be.null();
                });
                expect(transaction.transactionStatus).eq(3);
            });
        });
        it('can buy a service successfully', function() {
            testTransactionService.buy(transaction2).then(transaction => {
                User.findByPk(1).then(foundUser => {
                    expect(foundUser.wallet).eq(840);
                });
                User.findByPk(2).then(foundUser => {
                    expect(foundUser.wallet).eq(160);
                });
                Product.findByPk(1).then(foundProduct => {
                    expect(foundProduct.buyerId).to.be.null();
                    expect(foundProduct.dateBought).to.be.null();
                    expect(foundProduct.isAvailable).to.be.null();
                    expect(foundProduct.returnedAfterLoan).to.be.null();
                });
                expect(transaction.transactionStatus).eq(3);
            });
        });
        it('can loan a product successfully', function() {
            testTransactionService.buy(transaction3).then(transaction => {
                User.findByPk(1).then(foundUser => {
                    expect(foundUser.wallet).eq(940);
                });
                User.findByPk(2).then(foundUser => {
                    expect(foundUser.wallet).eq(60);
                });
                Product.findByPk(1).then(foundProduct => {
                    expect(foundProduct.buyerId).eq(2);
                    expect(foundProduct.dateBought).not.to.be.null();
                    expect(foundProduct.isAvailable).to.be.false();
                    expect(foundProduct.returnedAfterLoan).to.be.false();
                });
                expect(transaction.transactionStatus).eq(3);
            });
        });
        it('can not buy with transaction which is missing necessary data', function() {
            testTransactionService.buy(transaction4).catch(err => {
                expect(err.message).eq('Transaction could not be created!');
                expect(err).not.to.be.null();
            });
        });
        it('can not buy product when not enough money', function() {
            testTransactionService.buy(transaction1).catch(err => {
                expect(err.message).eq('The buyer does not have enough money!');
                expect(err).not.to.be.null();
                User.findByPk(1).then(foundUser => {
                    expect(foundUser.wallet).eq(800);
                });
                User.findByPk(2).then(foundUser => {
                    expect(foundUser.wallet).eq(200);
                });
            });
        });
    });
    describe('Test add delivery details', () => {
        it('can add successfully add delivery details to transaction', function() {
            testTransactionService.setDeliveryDetails(1, {
                transactionId: 1,
                productId: 1,
                buyerId: 2,
                transactionStatus: 3,
                deliveryStreet: 'Hauptstrasse 10',
                deliveryPinCode: 1700,
                deliveryCity: 'Freiburg',
                deliveryCountry: 'Switzerland'
            }).then(() => {
                Transaction.findByPk(1).then(foundTransaction => {
                    expect(foundTransaction.deliveryStreet).be.eq('Hauptstrasse 10');
                    expect(foundTransaction.deliveryPinCode).be.eq(1700);
                    expect(foundTransaction.deliveryCity).be.eq('Freiburg');
                    expect(foundTransaction.deliveryCountry).be.eq('Switzerland');
                });
            });
        });
        it('can not add invalid delivery details', function() {
            testTransactionService.setDeliveryDetails(2, {
                transactionId: 2,
                productId: 2,
                buyerId: 2,
                transactionStatus: 3,
                deliveryStreet: null,
                deliveryPinCode: null,
                deliveryCity: null,
                deliveryCountry: null
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test set return date', () => {
        it('can successfully set a return date for a rentable product', function() {
            testTransactionService.setRentedUntilDate(3, new Date(Date.now())).then(() => {
                Product.findByPk(3).then(foundProduct => {
                    expect(foundProduct.rentedUntil).not.to.be.null();
                });
            });
        });
        it('can not set invalid return date', function() {
            testTransactionService.setRentedUntilDate(3, null).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test initialize return', () => {
        it('can successfully initalize the return of a rentable product', function() {
            testTransactionService.initiateReturn(3).then(() => {
                Product.findByPk(3).then(foundProduct => {
                    expect(foundProduct.returnedAfterLoan).to.be.true();
                });
            });
        });
        it('can not initalize return of non existent product', function() {
            testTransactionService.initiateReturn(10).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test confirm return', () => {
        it('can successfully confirm the return of a rentable product', function() {
            testTransactionService.confirmReturn(3).then(() => {
                Product.findByPk(3).then(foundProduct => {
                    expect(foundProduct.isAvailable).to.be.true();
                    expect(foundProduct.dateBought).to.be.null();
                    expect(foundProduct.buyerId).to.be.null();
                    expect(foundProduct.rentedUntil).to.be.null();
                    expect(foundProduct.returnedAfterLoan).to.be.null();
                });
            });
        });
        it('can not confirm return of non existent product', function() {
            testTransactionService.confirmReturn(10).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test get all transactions', () => {
        it('can return all transactions', function() {
            testTransactionService.getAll().then(transactions => {
                expect(transactions[0].productId).eq(1);
                expect(transactions.length).eq(3);
            });
        });
    });
});
