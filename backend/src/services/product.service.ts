import { HostNotFoundError } from 'sequelize/types';
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

    public getAll(): Promise<Product[]> {
        return Product.findAll();
    }
}
