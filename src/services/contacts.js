import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (id) => ContactsCollection.findById(id);

export const createContact = async (data) => ContactsCollection.create(data);

export const patchContact = async (id, data) =>
  ContactsCollection.findOneAndUpdate({ _id: id }, data, { new: true });

export const deleteContactById = async (id) =>
  ContactsCollection.findOneAndDelete({ _id: id });
