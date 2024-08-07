import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';

const router = Router();

router.post(
    '/auth/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
router.post('/auth/login', validateBody(loginUserSchema), loginUserController);
router.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/auth/logout', ctrlWrapper(logoutUserController));

export default router;
