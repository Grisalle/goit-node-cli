const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removeContact = contacts.filter((contact) => contact.id === contactId);

  return removeContact;
}

async function addContact(name, email, phone) {
  const newContact = { name, email, phone, id: crypto.randomUUID() };

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
