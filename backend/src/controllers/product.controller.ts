import express, { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';

const productController: Router = express.Router();

productController.post('/',
    (req: Request, res: Response) => {
        Product.create(req.body)
        .then(added => res.send(added))
        .catch(err => res.status(500).send(err));
    }
);

productController.put('/:id',
    (req: Request, res: Response) => {
        Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }

        })
        .catch(err => res.status(500).send(err));
    }
);

productController.delete('/:id',
    (req: Request, res: Response) => {
        Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy()
                    .then(product => res.status(200).send({ deleted: product }))
                    .catch(err => res.status(500).send(err));
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/',
    (req: Request, res: Response) => {
        Product.findAll()
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

export const ProductController: Router = productController;
