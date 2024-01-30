import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../redux/Contacts/contactsReducer';

const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(store => store.contacts.filter);
  const contacts = useSelector(store => store.contacts.contacts);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const handleDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };
  return (
    <div>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id} id={contact.id}>
            {contact.name}:{contact.number}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ContactList };
