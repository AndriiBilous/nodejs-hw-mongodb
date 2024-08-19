import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
    '/auth/register',
    jsonParser,
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
router.post(
    '/auth/login',
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);
router.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/auth/logout', ctrlWrapper(logoutUserController));
router.post(
    '/auth/send-reset-email',
    jsonParser,
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
);
router.post(
    '/auth/reset-password',
    jsonParser,
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);

export default router;
