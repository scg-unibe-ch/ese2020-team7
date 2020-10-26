import express, { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService;

productController.post('/',
    (req: Request, res: Response) => {
        productService.create(req.body)
        .then(added => res.send(added))
        .catch(err => res.status(500).send(err));
    }
);

productController.put('/:productId',
    (req: Request, res: Response) => {
        productService.update(parseInt(req.params.productId, 10), req.body)
        .then(updated => res.send(updated))
        .catch(err => res.status(500).send(err));
    }
);

productController.delete('/:productId',
    (req: Request, res: Response) => {
        productService.delete(parseInt(req.params.productId, 10))
        .then(deleted => res.send(deleted))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/',
    (req: Request, res: Response) => {
        productService.getAll()
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

export const ProductController: Router = productController;
