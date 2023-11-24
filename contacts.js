// Import the 'fs' module for file system operations with promises
import fs from "fs/promises";

// Import 'nanoid' for generating unique IDs
import { nanoid } from "nanoid";

// Import functions for working with file paths and URLs
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Get the current filename and directory using URL functions
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the contacts JSON file
const contactsPath = join(`${__dirname}`, "./db/contacts.json");

// Function to list all contacts from the JSON file
export const listContacts = async () => {
  try {
    // Read the contents of the contacts file
    const contacts = await fs.readFile(contactsPath);
    // Parse the JSON data and return the array of contacts
    return JSON.parse(contacts);
  } catch (error) {
    // Log any errors that occur during the operation
    console.warn(error);
  }
};

// Function to get a contact by ID from the list of contacts
export const getContactById = async (contactId) => {
  try {
    // Retrieve the list of contacts
    const contacts = await listContacts();
    // Find the contact with the specified ID
    const contact = contacts.find((el) => el.id === contactId);
    // Return the found contact
    return contact;
  } catch (error) {
    // Log any errors that occur during the operation
    console.warn(error);
  }
};

// Function to remove a contact by ID from the list of contacts
export const removeContact = async (contactId) => {
  try {
    // Retrieve the list of contacts
    const contacts = await listContacts();
    // Find the index of the contact with the specified ID
    const index = contacts.findIndex((el) => el.id === contactId);
    // Remove the contact from the list
    const [removeItem] = contacts.splice(index, 1);
    // Write the updated list of contacts back to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // Return the removed contact
    return removeItem;
  } catch (error) {
    // Log any errors that occur during the operation
    console.warn(error);
  }
};

// Function to add a new contact to the list of contacts
export const addContact = async (data) => {
  try {
    // Retrieve the list of contacts
    const contacts = await listContacts();
    // Generate a new unique ID for the contact
    const newContact = { id: nanoid(), ...data };
    // Add the new contact to the list
    contacts.push(newContact);
    // Write the updated list of contacts back to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // Return the newly added contact
    return newContact;
  } catch (error) {
    // Log any errors that occur during the operation
    console.warn(error);
  }
};

// In summary:
// The module manages a list of contacts stored in a JSON file.
// The listContacts function reads the contacts file and returns the array of contacts.
// The getContactById function retrieves a contact by ID from the list of contacts.
// The removeContact function removes a contact by ID from the list and updates the file.
// The addContact function adds a new contact to the list with a generated unique ID and updates the file.
