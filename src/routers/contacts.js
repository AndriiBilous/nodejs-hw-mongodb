import { Router } from 'express';
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

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get(
    '/contacts/:contactId',
    isValidId,
    ctrlWrapper(getContactsByIdController),
);
router.post(
    '/contacts',
    validateBody(createContactSchema),
    ctrlWrapper(createContactController),
);
router.patch(
    '/contacts/:contactId',
    isValidId,
    validateBody(updateContactsSchema),
    ctrlWrapper(patchContactController),
);
router.delete(
    '/contacts/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController),
);
export default router;