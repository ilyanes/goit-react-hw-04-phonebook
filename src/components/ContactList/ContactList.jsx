import PropTypes from 'prop-types';

export function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id} id={contact.id}>
          <p>Name: {contact.name}</p>
          <p>Number: {contact.number}</p>
          {/* <button type="button" onClick={() => deleteContact(contact.id)}>
            Delete
          </button> */}
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.prototype = {
  contacts: PropTypes.array,
  onDelete: PropTypes.func,
};
