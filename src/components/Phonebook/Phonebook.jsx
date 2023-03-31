import { Component } from 'react';
import css from '../styles/Field-form.module.css'

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  }

  handleInputChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.currentTarget.value });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.name, this.state.number);    
    this.setState({ name: '' , number: ''});
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <p className={css.caption}>Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
            className={css.input}
          />
          <p className={css.caption}>Number</p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInputChange}  
            className={css.input}         
          />
          <br/>
          <button type="submit" className={css.button}>Add contact</button>
        </form>
      </>
    );
  }
}

export default Phonebook;
