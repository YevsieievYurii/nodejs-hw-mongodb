import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const baseQuery = ContactsCollection.find(filter);

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.find(filter).countDocuments(),
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

export const getContactById = async (id) => {
  return ContactsCollection.findById(id);
};

export const createContact = async (data) => {
  return ContactsCollection.create(data);
};

export const patchContact = async (id, data) => {
  return ContactsCollection.findOneAndUpdate({ _id: id }, data, { new: true });
};

export const deleteContactById = async (id) => {
  return ContactsCollection.findOneAndDelete({ _id: id });
};
