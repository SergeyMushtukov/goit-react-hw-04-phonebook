import css from './ContactList.module.css';
import { Contact } from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';

const getVisibleList = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

export const ContactList = () => {
  const contacts =  useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleList = getVisibleList(contacts, filter);

  return (
    <ul className={css.list}>
      {visibleList.map(({ id, name, number }) => (
        <Contact key={id} name={name} number={number} id={id}></Contact>
      ))}
    </ul>
  );
};
