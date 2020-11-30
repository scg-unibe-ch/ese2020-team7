import express, { Router, Request, Response } from 'express';
import { verifyAdmin, verifyProductOwner, verifyToken } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService;

productController.post('/add', verifyToken,
    (req: Request, res: Response) => {
        const thisUserId = req.body.tokenPayload.userId;
        req.body.userId = thisUserId;

        productService.create(req.body)
        .then(added => res.send(added))
        .catch(err => res.status(500).send(err));
    }
);  // needs all important ProductAttributes

productController.put('/update/:productId', verifyToken, verifyProductOwner,
    (req: Request, res: Response) => {
        productService.update(parseInt(req.params.productId, 10), req.body)
        .then(updated => res.send(updated))
        .catch(err => res.status(500).send(err));
    }
);  // needs attribute subject to change and updated information

productController.put('/approve/:productId', verifyToken, verifyAdmin,
    (req: Request, res: Response) => {
        productService.approve(parseInt(req.params.productId, 10))
        .then(approved => res.send(approved))
        .catch(err => res.status(500).send(err));
    }
);

productController.put('/reject/:productId', verifyToken, verifyAdmin,
    (req: Request, res: Response) => {
        productService.reject(parseInt(req.params.productId, 10), req.body.rejectionReason)
        .then(rejected => res.send(rejected))
        .catch(err => res.status(500).send(err));
    }
);

productController.delete('/delete/:productId', verifyToken, verifyProductOwner,
    (req: Request, res: Response) => {
        productService.delete(parseInt(req.params.productId, 10))
        .then(deleted => res.send(deleted))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/allProducts',
    (req: Request, res: Response) => {
        productService.getAllProducts()
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/approvedProducts',
    (req: Request, res: Response) => {
        productService.getApprovedProducts()
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/rejectedProducts', verifyToken, verifyAdmin,
    (req: Request, res: Response) => {
        productService.getRejectedProducts()
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/uncheckedProducts', verifyToken, verifyAdmin,
    (req: Request, res: Response) => {
        productService.getUncheckedProducts()
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/myProducts', verifyToken,
    (req: Request, res: Response) => {
        productService.getMyProducts(req.body.tokenPayload.userId)
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/id/:productId',
    (req: Request, res: Response) => {
        productService.getProduct(parseInt(req.params.productId, 10))
        .then(product => res.send(product))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/myRejectedProducts', verifyToken,
    (req: Request, res: Response) => {
        productService.getMyRejectedProducts(req.body.tokenPayload.userId)
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/myPendingProducts', verifyToken,
    (req: Request, res: Response) => {
        productService.getMyPendingProducts(req.body.tokenPayload.userId)
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/myApprovedProducts', verifyToken,
    (req: Request, res: Response) => {
        productService.getMyApprovedProducts(req.body.tokenPayload.userId)
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/productsIBought', verifyToken,
    (req: Request, res: Response) => {
        productService.getProductsIBought(req.body.tokenPayload.userId)
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/mySoldProducts', verifyToken,
    (req: Request, res: Response) => {
        productService.getMySoldProducts(req.body.tokenPayload.userId)
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.put('/deleteProductAfterSold/:productId', verifyToken, verifyProductOwner,
    (req: Request, res: Response) => {
        productService.deleteProductAfterSold(parseInt(req.params.productId, 10))
        .then(deleted => res.send(deleted))
        .catch(err => res.status(500).send(err));
    }
);

productController.post('/searchedProducts',
    (req: Request, res: Response) => {
        productService.search(req.body)
        .then(products => res.send(products))
        .catch(err => res.status(500).send(err));
    }
); // needs attributes from search model but not all have to have a value

productController.get('/approvedAndAvailableProducts',
    (req: Request, res: Response) => {
        productService.getApprovedAndAvailableProducts()
            .then(products => res.send(products))
            .catch(err => res.status(500).send(err));
    }
);

export const ProductController: Router = productController;
