import { SearchRequest } from '../models/search.model';
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
        return Product.findAll({
            where: {
                userId: thisUserId
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

    public search(filters: SearchRequest): Promise<Product[]> {
        const { Op } = require('sequelize');
        const title = filters.title;
        const location = filters.location;
        const minPrice = filters.minPrice;
        const maxPrice = filters.maxPrice;
        const isDeliverable = filters.isDeliverable;

        const options: any = {};

        if (title) {
            options.title = {
                [ Op.substring ]: title
            };
        }

        if (location) {
            options.location = {
                [ Op.substring ]: location
            };
        }

        if (minPrice && maxPrice) {
            options.price = {
                [ Op.between ]: [ minPrice, maxPrice]
            };
        } else if (minPrice && !maxPrice) {
            options.price = {
                [ Op.gte ]: minPrice
            };
        } else if (!minPrice && maxPrice) {
            options.price = {
                [ Op.lte ]: maxPrice
            };
        }

        if (isDeliverable != null) {
            options.isDeliverable = {
                [ Op.is ]: true
            };
        }

        options.isApproved = {
            [ Op.is ]: true
        };

        return Product.findAll({
            where: options
        });
    }
}
