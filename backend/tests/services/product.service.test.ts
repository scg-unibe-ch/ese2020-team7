import { ProductService } from '../../src/services/product.service';
import { Product, ProductAttributes } from '../../src/models/product.model';
import { User, UserAttributes } from '../../src/models/user.model';
import { expect } from 'chai';

describe('ProductService Tests', () => {

    const testProductService: ProductService = new ProductService();

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
        city: 'Schmitten',
        country: null,
        admin: false,
        wallet: 500
    };

    const product1: ProductAttributes = {
        productId: 1,
        isApproved: false,
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
        deletedAfterSold: false
    };

    before('create admin', function() {
        User.create(user1);
    });

    describe('Test product listing', () => {
        it('can list a product successfully', function() {
            testProductService.create(product1).then(product => {
                expect(product.title).to.be.eq('Phone');
                expect(product.price).to.be.eq(300);
                expect(product.rejectionReason).to.be.null;
                Product.findOne({
                    where: {
                        title: 'Phone'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.null;
                });
            });
        });
        it('can not list product with missing necassary attributes', function() {
            const product10: ProductAttributes = {
                productId: 1,
                isApproved: false,
                title: null,
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
                deletedAfterSold: false
            };
            testProductService.create(product1).catch(err => {
                expect(err).not.to.be.null;
            });
        });
    });
    describe('Test update product', () => {
        it('can update product', function() {
            const product1: ProductAttributes = {
                productId: 1,
                isApproved: false,
                title: 'Phone',
                isProduct: true,
                price: 300,
                description: 'IPhone X',
                location: 'Freiburg',
                isSelling: true,
                isAvailable: true,
                isDeliverable: false,
                rejectionReason: null,
                userId: 1,
                buyerId: null,
                dateBought: null,
                deletedAfterSold: false
            };
            testProductService.update(1, product1).then(updated => {
                expect(updated.location).to.be.eq('Freiburg');
                expect(updated.isDeliverable).to.be.false;
            });
        });
        it('can not update product with unallowed data', function() {
            const product1: ProductAttributes = {
                productId: 1,
                isApproved: false,
                title: null,
                isProduct: null,
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
                deletedAfterSold: false
            };
            testProductService.update(1, product1).catch(err => {
                expect(err).not.to.be.null;
            });
        });
        it('can not update product which does not exist', function() {
            const product10: ProductAttributes = {
                productId: 10,
                isApproved: false,
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
                deletedAfterSold: false
            };
            testProductService.update(10, product10).catch(err => {
                expect(err).not.to.be.null;
            });
        });
    });
    describe('Test approve product', () => {
        it('can approve products', function() {
            testProductService.approve(1).then(approved => {
                expect(approved.isApproved).to.be.true;
            });
        });
        it('can not approve product which does not exist', function() {
            testProductService.approve(2).catch(err => {
                expect(err).not.to.be.null;
            });
        });
    });
    describe('Test reject product', () => {
        it('can reject products', function() {
            testProductService.reject(1, 'Please enter a better description!').then(rejected => {
                expect(rejected.isApproved).to.be.false;
                expect(rejected.rejectionReason).to.be.eq('Please enter a better description!');
            });
        });
        it('can not reject product which does not exist', function() {
            testProductService.reject(2, 'Please enter a better description!').catch(err => {
                expect(err).not.to.be.null;
            });
        });
    });
    describe('Test delete product', () => {
        it('can delete product', function() {
            testProductService.delete(1).then(() => {
                Product.findOne({
                    where: {
                        title: 'Phone'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).to.be.eq(null);
                });
            });
        });
    });
});
