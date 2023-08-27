import PropTypes from 'prop-types';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

export const Contact = ({ id, name, number}) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <li className={css.item}>
      <div className={css.itemWrapper}>
        <p className={css.text}>
          {name}: {number}
        </p>
        <button
          className={css.contactButton}
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
