import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    getContactsController,
    getContactsByIdController,
    createContactController,
    patchContactController,
    deleteContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    createContactSchema,
    updateContactsSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/contacts', ctrlWrapper(getContactsController));
router.get(
    '/contacts/:contactId',
    isValidId,
    ctrlWrapper(getContactsByIdController),
);
router.post(
    '/contacts',
    jsonParser,
    upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(createContactController),
);
router.patch(
    '/contacts/:contactId',
    isValidId,
    jsonParser,
    upload.single('photo'),
    validateBody(updateContactsSchema),
    ctrlWrapper(patchContactController),
);
router.delete(
    '/contacts/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController),
);

export default router;
