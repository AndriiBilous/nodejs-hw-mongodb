import { Contact } from '../db/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
    userId,
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find({ userId });

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
        Contact.find().merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculatePaginationData(
        contactsCount,
        perPage,
        page,
    );

    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactById = async (contactId, userId) => {
    const contact = await Contact.findOne({ _id: contactId, userId });
    return contact;
};
export const createContact = async (payload, userId) => {
    const contact = await Contact.create({ ...payload, userId });
    return contact;
};
export const updateContact = async (
    contactId,
    payload,
    userId,
    options = {},
) => {
    const rawResult = await Contact.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
export const deleteContact = async (contactId, userId) => {
    const contact = await Contact.findOneAndDelete({
        _id: contactId,
        userId,
    });

    return contact;
};
