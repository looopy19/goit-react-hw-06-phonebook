import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../redux/contacts/contacts-action';
import { getItems } from '../../redux/contacts/contacts-selectors';
import s from './Form.module.css';
import PhoneInput from 'react-phone-input-2';
import { v4 as uuidv4 } from 'uuid';

function Form() {

  const dispatch = useDispatch();
  const contacts = useSelector(getItems);

  const onSubmit = (name, number) => dispatch(actions.addContact(name, number));

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
 
  const nameId = useRef(uuidv4());

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setName(value);
  };

   const handlePhoneInput = phone => setNumber(phone);

   const reset = () => {
    setName('');
    setNumber('');
  };

   const validateContact = (contactName, contacts) => {
    if (contacts.some(({ name }) => name === contactName)) {
      alert(`${contactName} is already in contacts.`);
      return false;
    } else return true;
  };

  // для получения данных из формы в App.js во время сабмита
  // использую метод с поднятием состояния в родитель
  const handleSubmit = e => {
    e.preventDefault();
    const isContactValid = validateContact(name, contacts);

    if (isContactValid) {
      onSubmit(name, number);
      reset();
    }
  };

    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={handleSubmit}>
          <label htmlFor={nameId.current}>
            <p className={s.form__label}>Name</p>
            <input
              type="text"
              name="name"
              className={s.form__firstInput}
              value={name}
              onChange={handleInputChange}
              id={nameId.current}
              placeholder="Enter name"
              required
            />
          </label>
          <label>
            <p className={s.form__label}>Number</p>
            <PhoneInput
              name="number"
              value={number}
              onChange={handlePhoneInput}
              maxLength="9"
              minLength="7"
              pattern="[0-9]{3}-{0,1}[0-9]{2}-{0,1}[0-9]{2}"
              required
              placeholder="123-45-67"
            />
          </label>
          <div className={s.submit__box}>
            <button
              className={s.form__button}
              type="submit"
              disabled={name === '' || number === ''}
            >
              Add contact
            </button>
          </div>
        </form>
      </div>
      );
    }
  


export default Form;