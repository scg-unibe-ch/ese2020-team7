import { SearchRequest } from '../models/search.model';
import { Transaction, TransactionAttributes } from '../models/transaction.model';
import { Product, ProductAttributes } from './../models/product.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<Product> {
        return Product.create(product)
        .then(inserted => Promise.resolve(inserted))
        .catch(err => Promise.reject(err));
    }

    public update(productId: number, product: ProductAttributes): Promise<Product> {
        return Product.findByPk(productId)
        .then(found =>
                found.update(product)
                .then(() => { return Promise.resolve(found);
                })
        )
        .catch(err => Promise.reject(err));
    }

    public rent(productId: number, rentedUntil: Date): Promise<Product> {
        return Product.findByPk(productId)
            .then(found =>
                found.update({rentedUntil: rentedUntil})
                    .then(() => { return Promise.resolve(found);
                    })
            )
            .catch(err => Promise.reject(err));
    }

    public approve(productId: number): Promise<Product> {
        return Product.findByPk(productId)
        .then(found =>
            found.update({isApproved: true})
            .then(() => { return Promise.resolve(found);
            })
        )
        .catch(err => Promise.reject(err));
    }

    public reject(productId: number, rejectionReason: string): Promise<Product> {
        return Product.findByPk(productId)
        .then(found =>
            found.update({isApproved: false, rejectionReason: rejectionReason})
            .then(() => { return Promise.resolve(found);
            })
        )
        .catch(err => Promise.reject(err));
    }

    public delete(productId: number): Promise<Product> {
        return Product.findByPk(productId)
        .then(found =>
            found.destroy()
            .then(() => Promise.resolve(found))
        )
        .catch(err => Promise.reject(err));
    }

    public getAllProducts(): Promise<Product[]> {
        return Product.findAll();
    }

    public getApprovedProducts(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: true
            }
        });
    }

    public getRejectedProducts(): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { isApproved: false },
                    { rejectionReason: { [ Op.not ]: null }}
                ]
            }
        });
    }

    public getUncheckedProducts(): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { isApproved: false },
                    { rejectionReason: null}
                ]
            }
        });
    }

    public getMyProducts(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { buyerId: thisUserId},
                    { deletedAfterSold: false }
                ]
            }
        });
    }

    public getProduct(thisProductId: number): Promise<Product> {
        return Product.findOne({
            where: {
                productId: thisProductId
            }
        });
    }

    public getMyRejectedProducts(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { userId: thisUserId },
                    { isApproved: false},
                    { rejectionReason: { [ Op.not ]: null }}
                ]
            }
        });
    }

    public getMyPendingProducts(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { userId: thisUserId},
                    { isApproved: false},
                    { rejectionReason: null}
                ]
            }
        });
    }

    public getMyApprovedProducts(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { userId: thisUserId},
                    { isApproved: true},
                    { isAvailable: true }
                ]
            }
        });
    }

    public getProductsIBought(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { buyerId: thisUserId},
                    { isProduct: true },
                    { isSelling: true }
                ]
            }
        });
    }

    public getProductsImRenting(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { buyerId: thisUserId},
                    { isProduct: true },
                    { isSelling: false }
                ]
            }
        });
    }

    public getProductsImLending(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { userId: thisUserId},
                    { buyerId: { [ Op.not ]: null }},
                    { isProduct: true },
                    { isSelling: false }
                ]
            }
        });
    }

    public getProductsIRented(thisUserId: number): Promise<Product[]> {
        const Rented: Product[] = [];
        return Transaction.findAll({
            where: {
                buyerId: thisUserId

            }
        }).then(async foundTransactions => {
            for await (const element of foundTransactions) {
                const product = await Product.findByPk(element.productId);
                if (product.isProduct && !product.isSelling) {
                    Rented.push(product);
                }
            }
        }).then(() => {
            return Promise.resolve(Rented);
        });
    }

    public getServicesImUtilizing(thisUserId: number): Promise<Product[]> {
        const Services: Product[] = [];
        return Transaction.findAll({
            where: {
                buyerId: thisUserId

            }
        }).then(async foundTransactions => {
            for await (const element of foundTransactions) {
                const service = await Product.findByPk(element.productId);
                if (!service.isProduct) {
                    Services.push(service);
                }
            }
        }).then(() => {
            return Promise.resolve(Services);
        });
    }

    public getMySoldProducts(thisUserId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { userId: thisUserId },
                    { buyerId: { [ Op.not ]: null }},
                    { deletedAfterSold: false }
                ]
            }
        });
    }

    public deleteProductAfterSold(productId: number): Promise<Product> {
        return Product.findByPk(productId)
        .then(found =>
            found.update({deletedAfterSold: true})
            .then(() => { return Promise.resolve(found);
            })
        )
        .catch(err => Promise.reject(err));
    }

    public search(filters: SearchRequest): Promise<Product[]> {
        const { Op } = require('sequelize');

        const options: any = {};

        if (filters.title) {
            options.title = {
                [ Op.substring ]: filters.title
            };
        }

        if (filters.location) {
            options.location = {
                [ Op.substring ]: filters.location
            };
        }

        if (filters.minPrice && filters.maxPrice) {
            options.price = {
                [ Op.between ]: [ filters.minPrice, filters.maxPrice]
            };
        } else if (filters.minPrice && !filters.maxPrice) {
            options.price = {
                [ Op.gte ]: filters.minPrice
            };
        } else if (!filters.minPrice && filters.maxPrice) {
            options.price = {
                [ Op.lte ]: filters.maxPrice
            };
        }

        if (filters.isDeliverable != null) {
            options.isDeliverable = {
                [ Op.is ]: filters.isDeliverable
            };
        }

        if (filters.isProduct != null) {
            options.isProduct = {
                [ Op.is ]: filters.isProduct
            };
        }

        if (filters.isSelling != null) {
            options.isSelling = {
                [ Op.is ]: filters.isSelling
            };
        }

        options.isApproved = {
            [ Op.is ]: true
        };

        return Product.findAll({
            where: options
        });
    }

    public getApprovedAndAvailableProducts(): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
                [ Op.and ]: [
                    { isApproved: true },
                    { isAvailable: true}
                ]
            }
        });
    }
}
