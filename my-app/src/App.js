import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import actions from './store/actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      phonenum: '',
      searchString: ''
    }

    this.addRows = this.addRow.bind(this);
  }

  addRow(e) {
    e.preventDefault();

    const {fullname, phonenum} = this.state;
    const {addRow} = this.props;
    const newRow = {fullname, phonenum};
    console.log(fullname, phonenum);
    addRow(newRow);

    this.setState({
      fullname: '',
      phonenum: ''
    })
  };

  removeRow(row, event) {
    const {removeRow} = this.props;
    removeRow(row.id);
    event.preventDefault();
  }

  onChangeHandler(field, event) {
    let value = event.target.value;

    if (field === "phonenum") {
      const regexp = /^([^9]){1}|([^0-9])/
      value = event.target.value.replace(regexp, '');
    }

    if (field === "fullname") {
      const regexp = /\d/;
      value = event.target.value.replace(regexp, '');
    }

    this.setState({[field]: value});
  }

  render() {

    const {searchString} = this.state
    const {listClients} = this.props;

    const regex = new RegExp(`${this.state.searchString}`, 'gi');

    let listItems = listClients;

    if (searchString) {
      listItems = listClients.filter(item => (regex.test(item.fullname) || regex.test(item.phonenum)));
    }

    const mark = text => {

      if (!this.state.searchString) return text;

      const regexp = new RegExp(`(${this.state.searchString})`, "gmi");
      const newText = text.replace(regexp, ',$1,');
      const markArr = newText.split(',');

      if (!regexp.test(text)) return text;

      let newHTML = markArr.map(item => {
        return (
          !regexp.test(item) ? 
            <span>{item}</span> 
            : 
            <span style={{color:"red", fontWeight: "bold"}}>{item}</span>
        )
      });

      return newHTML;
    }

    return (
      <Fragment>
        <header>Шапка</header>
        <section>
        <input type='text' name='search' value={this.state.searchString} onChange={this.onChangeHandler.bind(this, "searchString")} placeholder="Введите имя или номер"
        autoComplete="off"/>
          <ul>
            {
              listItems.map((client, i) => {
                return (
                <li key={i}>
                  {client.id}. {mark(client.fullname)} - {mark(client.phonenum)}
                  <a href="#" onClick={this.removeRow.bind(this, client)}> Удалить</a>
                </li>)
              })
            }
          </ul>
          <hr/>
          <form onSubmit={this.addRows}>
            <input type='text' name='fullname' value={this.state.fullname} onChange={this.onChangeHandler.bind(this, "fullname")} placeholder="Введите имя"/>
            <br/>
            <input type='text' name='phonenum' value={this.state.phonenum} onChange={this.onChangeHandler.bind(this, "phonenum")} placeholder="Введите номер" 
            maxLength="10" title="Введите номер сотового телефона"/>
            <br/>
            <button type="submit">add</button>
          </form>
          <p>Name: {this.state.fullname}</p>
          <p>Num: {this.state.phonenum}</p>
          <p>Search: {this.state.searchString}</p>
        </section>
        <footer>Подвал</footer>

      </Fragment>
      
    )
  }
}

const mapStateToProps = ({phonebook}) => ({
  listClients: phonebook.listClients
});

const mapDispatchToProps = dispatch => ({
  addRow: state => dispatch(actions.addRows(state)),
  removeRow: state => dispatch(actions.removeRows(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);