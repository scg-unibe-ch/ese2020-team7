import express, { Router, Request, Response } from 'express';
import { verifyProductOwner, verifyToken } from '../middlewares/checkAuth';
import { TransactionService } from '../services/transaction.service';

const transactionController: Router = express.Router();
const transactionService = new TransactionService;

transactionController.post('/buy/:productId', verifyToken,
    (req: Request, res: Response) => {
        const buyerId = req.body.tokenPayload.userId;
        req.body.buyerId = buyerId;

        const productId = parseInt(req.params.productId, 10);
        req.body.productId = productId;

        transactionService.buy(req.body)
        .then(bought => res.send(bought))
        .catch(err => res.status(500).send(err));
    }
);

transactionController.put('/deliveryDetails/:transactionId', verifyToken,
    (req: Request, res: Response) => {
        transactionService.setDeliveryDetails(parseInt(req.params.transactionId, 10), req.body)
        .then(updated => res.send(updated))
        .catch(err => res.status(500).send(err));
    }
);

transactionController.put('/rentedUntilDate/:productId', verifyToken,
    (req: Request, res: Response) => {
        transactionService.setRentedUntilDate(parseInt(req.params.productId, 10), req.body)
        .then(updated => res.send(updated))
        .catch(err => res.status(500).send(err));
    }
);

transactionController.put('/indicateReturn/:productId', verifyToken,
    (req: Request, res: Response) => {
        transactionService.initiateReturn(parseInt(req.params.productId, 10))
        .then(returned => res.send(returned))
        .catch(err => res.status(500).send(err));
    }
);

transactionController.put('/confirmReturn/:productId', verifyToken, verifyProductOwner,
    (req: Request, res: Response) => {
        transactionService.confirmReturn(parseInt(req.params.productId, 10))
        .then(confirmed => res.send(confirmed))
        .catch(err => res.status(500).send(err));
    }
);

transactionController.get('/allTransactions',
    (req: Request, res: Response) => {
        transactionService.getAll()
        .then(transactions => res.send(transactions))
        .catch(err => res.status(500).send(err));
    }
);

export const TransactionController: Router = transactionController;
