
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import {verifyAdmin, verifyToken} from '../middlewares/checkAuth';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body)
        .then(registered => res.status(201).send(registered))
        .catch(err => res.status(400).send(err));
    }
);  // needs all important UserAttributes

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body)
        .then(login => res.status(202).send(login))
        .catch(err => res.status(400).send(err));
    }
);  // needs all attributes from login model

userController.put('/update/:userId', verifyToken,
    (req: Request, res: Response) => {
        userService.update(parseInt(req.params.userId, 10), req.body)
        .then(updated => res.status(200).send(updated))
        .catch(err => res.status(400).send(err));
    }
); // needs attribute subject to change and updated information

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(404).send(err));
    }
);

userController.get('/id/:userId',
    (req: Request, res: Response) => {
        userService.getUser(parseInt(req.params.userId, 10))
            .then(user => res.status(200).send(user))
            .catch(err => res.status(404).send(err));
    }
);

userController.put('/promoteAdmin', verifyToken, verifyAdmin,
    (req: Request, res: Response) => {
        userService.makeAdmin(req.body)
        .then(promoted => res.status(200).send(promoted))
        .catch(err => res.status(404).send(err));
    }
); // needs the userName of the user who is to be made admin

userController.put('/demoteAdmin', verifyToken, verifyAdmin,
    (req: Request, res: Response) => {
        userService.removeAdmin(req.body)
        .then(demoted => res.status(200).send(demoted))
        .catch(err => res.status(404).send(err));
    }
); // needs the userName of the user who is to be removed from admin status

export const UserController: Router = userController;
