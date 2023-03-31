import { Component } from 'react';
import Phonebook from './Phonebook/Phonebook';
import Contactlist from './Contacts/Contactlist';
import Filter from './Contacts/Filter';
import css from './styles/Phonebook.module.css';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'contact';

export class App extends Component {
  state = {
    contacts: [
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (localData) {
      this.setState({ contacts: localData });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  phonebookSubmitHandler = (name, number) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };
    if (this.isThisContactExist(name)) {
      alert(`${name} is already exist!`);
    } else {
      this.setState({ contacts: [...contacts, newContact] });
    }
  };

  isThisContactExist = data => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.toLowerCase()
    );
  };

  filterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  getFilteredValue = () => {
    const { contacts, filter } = this.state;
    if (!filter) return contacts;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  removeContact = evt => {
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== evt.target.name
      ),
    });
  };

  render() {
    const getFilteredValue = this.getFilteredValue();
    console.log(getFilteredValue);
    return (
      <div className={css.form_field}>
        <h1 className={css.heading}>Phonebook</h1>
        <Phonebook onSubmit={this.phonebookSubmitHandler}></Phonebook>
        <h2 сlassName={css.sub_heading}>Contacts</h2>
        <Filter onType={this.filterChange} filter={this.state.filter}></Filter>
        <Contactlist
          contacts={getFilteredValue}
          onDelete={this.removeContact}
        ></Contactlist>
      </div>
    );
  }
}
