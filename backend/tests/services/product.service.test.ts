import { ProductService } from '../../src/services/product.service';
import { Product, ProductAttributes } from '../../src/models/product.model';
import { User, UserAttributes } from '../../src/models/user.model';
import { expect } from 'chai';
import { SearchRequest } from '../../src/models/search.model';

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
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const product2: ProductAttributes = {
        productId: 2,
        isApproved: true,
        title: 'Laptop',
        isProduct: true,
        price: 400,
        description: 'Windows SurfaceBook',
        location: 'Bern',
        isSelling: true,
        isAvailable: false,
        isDeliverable: true,
        rejectionReason: null,
        userId: 1,
        buyerId: 2,
        dateBought: new Date(Date.now()),
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const product3: ProductAttributes = {
        productId: 3,
        isApproved: true,
        title: 'Laptop',
        isProduct: true,
        price: 450,
        description: 'MacBook Pro',
        location: 'Freiburg',
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

    const product4: ProductAttributes = {
        productId: 4,
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
        buyerId: 2,
        dateBought: new Date(Date.now()),
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const product5: ProductAttributes = {
        productId: 5,
        isApproved: true,
        title: 'Motorboat',
        isProduct: true,
        price: 400,
        description: 'Go on the lake for a weekend!',
        location: 'Murten',
        isSelling: false,
        isAvailable: false,
        isDeliverable: false,
        rejectionReason: null,
        userId: 1,
        buyerId: 2,
        dateBought: new Date(Date.now()),
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const product6: ProductAttributes = {
        productId: 6,
        isApproved: true,
        title: 'Sailboat',
        isProduct: true,
        price: 350,
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

    const product7: ProductAttributes = {
        productId: 7,
        isApproved: false,
        title: 'Picture',
        isProduct: true,
        price: 50,
        description: 'Golden Gate Bridge',
        location: 'Bern',
        isSelling: true,
        isAvailable: true,
        isDeliverable: true,
        rejectionReason: 'Please give a better description!',
        userId: 1,
        buyerId: null,
        dateBought: null,
        deletedAfterSold: false,
        rentedUntil: null,
        returnedAfterLoan: null
    };

    const product8: ProductAttributes = {
        productId: 8,
        isApproved: false,
        title: 'Lamp',
        isProduct: true,
        price: 30,
        description: 'Desklamp',
        location: 'Freiburg',
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

    before('create admin', function() {
        User.create(user1);
        User.create(user2);
        Product.create(product2);
        Product.create(product3);
        Product.create(product4);
        Product.create(product5);
        Product.create(product6);
        Product.create(product7);
        Product.create(product8);
    });

    describe('Test product listing', () => {
        it('can list a product successfully', function() {
            testProductService.create(product1).then(product => {
                expect(product.title).eq('Phone');
                expect(product.price).eq(300);
                expect(product.rejectionReason).to.be.null();
                Product.findOne({
                    where: {
                        title: 'Phone'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.null();
                });
            });
        });
        it('can not list product with missing necassary attributes', function() {
            testProductService.create({
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
                deletedAfterSold: false,
                rentedUntil: null,
                returnedAfterLoan: null
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test update product', () => {
        it('can update product', function() {
            testProductService.update(1, {
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
                deletedAfterSold: false,
                rentedUntil: null,
                returnedAfterLoan: null
            }).then(() => {
                Product.findOne({
                    where: {
                        title: 'Phone'
                    }
                }).then(foundProduct => {
                    expect(foundProduct.location).eq('Freiburg');
                    expect(foundProduct.isDeliverable).to.be.false();
                });
            });
        });
        it('can not update product with unallowed data', function() {
            testProductService.update(1, {
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
                deletedAfterSold: false,
                rentedUntil: null,
                returnedAfterLoan: null
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
        it('can not update product which does not exist', function() {
            testProductService.update(10, {
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
                deletedAfterSold: false,
                rentedUntil: null,
                returnedAfterLoan: null
            }).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test approve product', () => {
        it('can approve products', function() {
            testProductService.approve(1).then(() => {
                Product.findOne({
                    where: {
                        title: 'Phone'
                    }
                }).then(foundProduct => {
                    expect(foundProduct.isApproved).to.be.true();
                });
            });
        });
        it('can not approve product which does not exist', function() {
            testProductService.approve(10).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test reject product', () => {
        it('can reject products', function() {
            testProductService.reject(1, 'Please enter a better description!').then(() => {
                Product.findOne({
                    where: {
                        title: 'Phone'
                    }
                }).then(foundProduct => {
                    expect(foundProduct.isApproved).to.be.false();
                    expect(foundProduct.rejectionReason).eq('Please enter a better description!');
                });
            });
        });
        it('can not reject product which does not exist', function() {
            testProductService.reject(10, 'Please enter a better description!').catch(err => {
                expect(err).not.to.be.null();
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
                    expect(foundProduct).eq(null);
                });
            });
        });
        it('can not delete product which does not exist', function() {
            testProductService.delete(10).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test get all products', () => {
        it('can return all listed products', function() {
            testProductService.getAllProducts().then(products => {
                expect(products[0].productId).eq(2);
                expect(products.length).eq(7);
            });
        });
    });
    describe('Test get all approved products', () => {
        it('can return all approved products', function() {
            testProductService.getApprovedProducts().then(products => {
                expect(products[0].productId).eq(2);
                expect(products.length).eq(5);
            });
        });
    });
    describe('Test get all rejected products', () => {
        it('can return all rejected products', function() {
            testProductService.getRejectedProducts().then(products => {
                expect(products[0].productId).eq(7);
                expect(products.length).eq(1);
            });
        });
    });
    describe('Test get all unchecked products', () => {
        it('can return all unchecked products', function() {
            testProductService.getUncheckedProducts().then(products => {
                expect(products[0].productId).eq(8);
                expect(products.length).eq(1);
            });
        });
    });
    describe('Test get all my products', () => {
        it('can return all my products', function() {
            testProductService.getMyProducts(1).then(products => {
                expect(products[0].productId).eq(2);
                expect(products.length).eq(7);
            });
        });
    });
    describe('Test get one product', () => {
        it('can return one product', function() {
            testProductService.getProduct(4).then(product => {
                expect(product.title).eq('Cleaning');
                expect(product.price).eq(40);
            });
        });
    });
    describe('Test get my rejected products', () => {
        it('can return my rejected products', function() {
            testProductService.getMyRejectedProducts(1).then(products => {
                expect(products[0].productId).eq(7);
                expect(products.length).eq(1);
            });
        });
    });
    describe('Test get my pending products', () => {
        it('can return my pending products', function() {
            testProductService.getMyPendingProducts(1).then(products => {
                expect(products[0].productId).eq(8);
                expect(products.length).eq(1);
            });
        });
    });
    describe('Test get my approved products', () => {
        it('can return my approved products', function() {
            testProductService.getMyApprovedProducts(1).then(products => {
                expect(products[0].productId).eq(3);
                expect(products.length).eq(3);
            });
        });
    });
    describe('Test get products I purchased', () => {
        it('can return products I purchased', function() {
            testProductService.getProductsIBought(2).then(products => {
                expect(products[0].productId).eq(2);
                expect(products.length).eq(1);
            });
        });
    });
    describe('Test get products Im renting', () => {
        it('can return products Im renting', function() {
            testProductService.getProductsImRenting(2).then(products => {
                expect(products[0].productId).eq(5);
                expect(products.length).eq(1);
            });
        });
    });
    describe('Test get services Im utilizing', () => {
        it('can return services Im utilizing', function() {
            testProductService.getServicesImUtilizing(2).then(products => {
                expect(products[0].productId).eq(4);
                expect(products.length).eq(1);
            });
        });
    });
    describe('Test get my sold products', () => {
        it('can return my sold products', function() {
            testProductService.getMySoldProducts(1).then(products => {
                expect(products[0].productId).eq(2);
                expect(products.length).eq(3);
            });
        });
    });
    describe('Test deleteAfterSold', () => {
        it('can delete product after it sold', function() {
            testProductService.deleteProductAfterSold(2).then(() => {
                Product.findOne({
                    where: {
                        productId: 2
                    }
                }).then(foundProduct => {
                    expect(foundProduct.deletedAfterSold).to.be.true();
                });
            });
        });
        it('can not delete product after it sold which does not exist', function() {
            testProductService.deleteProductAfterSold(10).catch(err => {
                expect(err).not.to.be.null();
            });
        });
    });
    describe('Test search products', () => {
        it('can return products searched with title containing Lap', function() {
            const filter: SearchRequest = {
                title: 'Lap'
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(3);
                expect(products.length).to.be.eq(1);
            });
        });
        it('can return products searched with location containing M', function() {
            const filter: SearchRequest = {
                location: 'M'
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(6);
                expect(products.length).to.be.eq(1);
            });
        });
        it('can return products searched with minimum price', function() {
            const filter: SearchRequest = {
                minPrice: 100
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(3);
                expect(products.length).to.be.eq(2);
            });
        });
        it('can return products searched with maximum price', function() {
            const filter: SearchRequest = {
                minPrice: 100
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(4);
                expect(products.length).to.be.eq(1);
            });
        });
        it('can return products searched with minimum and maximum price', function() {
            const filter: SearchRequest = {
                minPrice: 100,
                maxPrice: 400
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(3);
                expect(products.length).to.be.eq(1);
            });
        });
        it('can return products searched with isDeliverable', function() {
            const filter: SearchRequest = {
                isDeliverable: false
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(4);
                expect(products.length).to.be.eq(2);
            });
        });
        it('can return products searched with isProduct', function() {
            const filter: SearchRequest = {
                isProduct: true
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(3);
                expect(products.length).to.be.eq(2);
            });
        });
        it('can return products searched with isSelling', function() {
            const filter: SearchRequest = {
                isSelling: false
            };
            testProductService.search(filter).then(products => {
                expect(products[0].productId).to.be.eq(6);
                expect(products.length).to.be.eq(1);
            });
        });
    });
});
