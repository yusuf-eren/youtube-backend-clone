import express from 'express';
import { signupController, signinController } from '../controllers/auth';
const router = express.Router();

router.post('/signup', signupController);
router.post('/signin', signinController);

export { router as authRoute };
