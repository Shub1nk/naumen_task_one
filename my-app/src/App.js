import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import actions from './store/actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      phonenum: ''
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
    const value = event.target.value;
    this.setState({[field]: value});
  }

  render() {

    const {listClients} = this.props;

    return (
      <Fragment>
        <header>Шапка</header>
        <section>
          <ul>
            {
              listClients.map((client, i) => {
                return (
                <li key={i}>
                  {client.id}. {client.fullname} - {client.phonenum}
                  <a href="#" onClick={this.removeRow.bind(this, client)}> Удалить</a>
                </li>)
              })
            }
          </ul>
          <hr/>
          <form onSubmit={this.addRows}>
            <input type='text' name='fullname' value={this.state.fullname} onChange={this.onChangeHandler.bind(this, "fullname")}/>
            <input type='text' name='phonenum' value={this.state.phonenum} onChange={this.onChangeHandler.bind(this, "phonenum")}/>
            <button type="submit">add</button>
          </form>
          <p>Name: {this.state.fullname}</p>
          <p>Num: {this.state.phonenum}</p>
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