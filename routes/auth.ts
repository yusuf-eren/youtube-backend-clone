import express from 'express';
import { body } from 'express-validator';
import {
    signupController,
    signinController,
    signoutControler,
} from '../controllers/auth';
const router = express.Router();

router.post(
    '/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
    ],
    signupController
);
router.post('/signin', signinController);
router.get('/signout', signoutControler);

export { router as authRoute };
