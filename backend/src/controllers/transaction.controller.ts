import express, { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/checkAuth';
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

export const TransactionController: Router = transactionController;
