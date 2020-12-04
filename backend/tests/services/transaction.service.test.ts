import { expect } from "chai";
import { ProductAttributes, Product } from "../../src/models/product.model";
import { TransactionAttributes } from "../../src/models/transaction.model";
import { User, UserAttributes } from "../../src/models/user.model";
import { TransactionService } from "../../src/services/transaction.service";

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
    }

    const transaction2: TransactionAttributes = {
        transactionId: 2,
        productId: 2,
        buyerId: 2,
        transactionStatus: 0,
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
    }

    const transaction3: TransactionAttributes = {
        transactionId: 3,
        productId: 3,
        buyerId: 2,
        transactionStatus: 0,
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
    }

    const transaction4: TransactionAttributes = {
        transactionId: 2,
        productId: null,
        buyerId: null,
        transactionStatus: null,
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
    }

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
                    expect(foundProduct.dateBought).not.to.be.null;
                    expect(foundProduct.isAvailable).to.be.false;
                    expect(foundProduct.returnedAfterLoan).to.be.null;
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
                    expect(foundProduct.buyerId).eq(2);
                    expect(foundProduct.dateBought).not.to.be.null;
                    expect(foundProduct.isAvailable).to.be.false;
                    expect(foundProduct.returnedAfterLoan).to.be.null;
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
                    expect(foundProduct.dateBought).not.to.be.null;
                    expect(foundProduct.isAvailable).to.be.false;
                    expect(foundProduct.returnedAfterLoan).to.be.false;
                });
                expect(transaction.transactionStatus).eq(3);
            });
        });
        it('can not buy with transaction which is missing necessary data', function() {
            testTransactionService.buy(transaction4).catch(err => {
                expect(err.message).eq('Transaction could not be created!');
                expect(err).not.to.be.null;
            });
        });
        it('can not buy product when not enough money', function() {
            testTransactionService.buy(transaction1).catch(err => {
                expect(err.message).eq('The buyer does not have enough money!');
                expect(err).not.to.be.null;
                User.findByPk(1).then(foundUser => {
                    expect(foundUser.wallet).eq(800);
                });
                User.findByPk(2).then(foundUser => {
                    expect(foundUser.wallet).eq(200);
                });
            });
        });
    });
})
