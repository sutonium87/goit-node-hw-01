// Import the 'Command' class from the 'commander' library
import { Command } from "commander";

// Import functions for managing contacts from the 'contacts.js' module
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

// Create a new instance of the 'Command' class
const program = new Command();

// Define command-line options using the 'option' method
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

// Parse the command-line arguments
program.parse(process.argv);
const argv = program.opts();

// Define an asynchronous function to handle different actions based on user input
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    // If the action is 'list', retrieve and display all contacts
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    // If the action is 'get', retrieve and display a specific contact by ID
    case "get":
      const contact = await getContactById(id);
      return console.log(contact);

    // If the action is 'add', add a new contact and display the result
    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.log(newContact);

    // If the action is 'remove', remove a contact by ID and display the result
    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    // If the action is unknown, display a warning message
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// Invoke the 'invokeAction' function with the parsed command-line options
invokeAction(argv);

// In summary, this script is a CLI tool for managing contacts.
// Users can list contacts, get details of a specific contact, add a new contact, or remove an existing contact by providing the appropriate command - line options.
// The actual contact management functionality is implemented in the "contacts.js" module.
