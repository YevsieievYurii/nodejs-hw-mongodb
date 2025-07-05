import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;

  const query = { ...filter, userId };

  const baseQuery = ContactsCollection.find(query);

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.find(query).countDocuments(),
    baseQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const pagination = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...pagination,
  };
};

export const getContactById = async (id, userId) => {
  return ContactsCollection.findOne({ _id: id, userId });
};

export const createContact = async (data) => {
  return ContactsCollection.create(data);
};

export const patchContact = async (id, userId, data) => {
  return ContactsCollection.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
  });
};

export const deleteContactById = async (id, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: id, userId });
};
