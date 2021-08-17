import s from './Contacts.module.css';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../redux/contacts/contacts-action';
import { filteredContacts } from '../../redux/contacts/contacts-selectors';
import { FaRegAddressBook } from 'react-icons/fa';
import { VscTrash } from 'react-icons/vsc'




const Contacts = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(filteredContacts);

  return (
    <div className={s.list}>
      <ul className={s.list__ul}>
        {contacts.map(person => (
          <li key={person.id} className={s.search__contact}>
          
            <FaRegAddressBook onClick={() => dispatch(actions.deleteContact(person.id))} />
        
            {person.name} : {person.number}
            <div className={s.trash}>
            
              <VscTrash onClick={() => dispatch(actions.deleteContact(person.id))} />
            
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;