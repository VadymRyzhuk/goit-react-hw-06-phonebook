import React from 'react';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/Contacts/contactsReducer';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = event => {
    const nameValue = event.target.value.trim();
    setName(nameValue);
  };

  const handleNumber = event => {
    const numberValue = event.target.value;
    setNumber(numberValue);
  };

  const onAddClick = event => {
    event.preventDefault();

    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(
        'This name is already in the phonebook. Please choose a different name.'
      );
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));

    event.currentTarget.reset();
  };

  return (
    <div>
      <form onSubmit={onAddClick} className={css.formData}>
        <label>
          <span className={css.labelTitleName}>Name:</span>
          <input
            type="text"
            placeholder="Anna"
            name="name"
            onChange={handleChange}
            pattern="^[A-Za-z ]*$"
            required
          />
        </label>
        <label>
          <span className={css.labelTitleNumber}>Number:</span>
          <input
            type="tel"
            placeholder="50102050"
            name="number"
            onChange={handleNumber}
            pattern="[0-9]*"
            required
          />
        </label>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export { ContactForm };
