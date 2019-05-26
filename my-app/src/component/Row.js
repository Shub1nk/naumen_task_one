import React, { Fragment, Component } from 'react';
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
    const {updateRow, updateIdActive} = this.props;
    const newRow = Object.assign(row, {fullname, phonenum})
    this.setState({isUpdate: false});
    updateRow(newRow);
    updateIdActive(0);
  }

  enableEditRow() {
    const {row, updateIdActive} = this.props;
    this.setState({isUpdate: true});
    updateIdActive(row.id);
  }

  cancelEditRow() {
    const {updateIdActive} = this.props;
    this.setState({isUpdate: false});
    updateIdActive(0);
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

    const {row, highlight, updateId} = this.props;

    const {searchString} = this.props;
    const regexp = new RegExp(`${searchString}`, 'gi');

    let hide = false;

    if (searchString) {
      hide = (!regexp.test(row.fullname) && !regexp.test(row.phonenum))
    }

    return (
      <li className={`b-list-contacts__item ${hide ? "hide" : ""}`}>
        {
          !this.state.isUpdate ?
            <Fragment>
              <div className="b-list-contacts__item__fullname">{highlight(row.fullname)}</div>
              <div className="b-list-contacts__item__phonenum">{highlight(row.phonenum)}</div>
              <div className="b-list-contacts__item__button-group">
                <button 
                  className="b-list-contacts__item__button-edit" 
                  onClick={this.enableEditRow.bind(this)} 
                  disabled={updateId !== row.id && updateId !== 0}>
                    Изменить
                </button>
                <button 
                  className="b-list-contacts__item__button-remove" 
                  onClick={this.removeRow.bind(this, row)} 
                  disabled={updateId !== row.id && updateId !== 0}>
                    Удалить
                </button>
              </div>
            </Fragment>
            :         
            <Fragment>
              <form className="b-list-contacts__item__form" onSubmit={this.updateRow.bind(this, row)}>
                <div className="b-list-contacts__item__fullname">
                  <input 
                    type='text' name='fullname' value={this.state.fullname} 
                    onChange={this.onChangeHandler.bind(this, "fullname")} placeholder="Введите имя"/>
                </div>
                <div className="b-list-contacts__item__phonenum">
                  <input 
                    type='text' name='phonenum' value={this.state.phonenum} 
                    onChange={this.onChangeHandler.bind(this, "phonenum")} placeholder="Введите номер"
                    maxLength="10" title="Введите номер сотового телефона"/>
                </div>
                <div className="b-list-contacts__item__button-group">
                  <button 
                    className="b-list-contacts__item__button-save" 
                    onClick={this.updateRow.bind(this, row)}>
                      Сохранить
                  </button>
                  <button 
                    className="b-list-contacts__item__button-cancel" 
                    onClick={this.cancelEditRow.bind(this)}>
                      Отменить
                  </button>
                </div>
              </form>            
            </Fragment>
        } 
      </li>
    );
  }
}

const mapStateToProps = ({phonebook}) => ({
  listClients: phonebook.listClients,
  updateId: phonebook.updateIdActive
});

const mapDispatchToProps = dispatch => ({
  updateRow: state => dispatch(actions.updateRow(state)),
  removeRow: state => dispatch(actions.removeRow(state)),
  updateIdActive: state => dispatch(actions.updateIdActive(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);