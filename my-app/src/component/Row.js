import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      fullname: props.row.fullname,
      phonenum: props.row.phonenum
    }
  }

  updateRow(row) {
    const {fullname, phonenum} = this.state;
    const {updateRow, listClients} = this.props;
    const newRow = Object.assign(row, {fullname, phonenum})
    this.setState({isUpdate: false});
    console.log("row", row);
    console.log("newRow", newRow);

    console.log("listClients", listClients)
    
    updateRow(newRow);
  }

  enableEditRow() {
    this.setState({isUpdate: true});
  }

  cancelEditRow() {
    this.setState({isUpdate: false});
  }
  
  removeRow(row) {
    const {removeRow} = this.props;
    removeRow(row.id);    
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

    const {row, highlight} = this.props;

    return (
      <li>
        {
          !this.state.isUpdate ?
            <div>
              {row.id}. {highlight(row.fullname)} - {highlight(row.phonenum)}
              <button onClick={this.enableEditRow.bind(this)}>Редактировать</button>
              <button onClick={this.removeRow.bind(this, row)}>Удалить</button>
            </div>
            :         
            <div>
              <form onSubmit={this.updateRow.bind(this, row)}>
                <input type='text' name='fullname' value={this.state.fullname} onChange={this.onChangeHandler.bind(this, "fullname")} placeholder="Введите имя"/>
                <br/>
                <input type='text' name='phonenum' value={this.state.phonenum} onChange={this.onChangeHandler.bind(this, "phonenum")} placeholder="Введите номер" 
                maxLength="10" title="Введите номер сотового телефона"/>
                <br/>
                <button onClick={this.updateRow.bind(this, row)}>Сохранить</button>
                <button onClick={this.cancelEditRow.bind(this)}>Отменить</button>
              </form>
            </div>
        } 
      </li>
    );
  }
}

const mapStateToProps = ({phonebook}) => ({
  listClients: phonebook.listClients
});

const mapDispatchToProps = dispatch => ({
  updateRow: state => dispatch(actions.updateRow(state)),
  removeRow: state => dispatch(actions.removeRow(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);