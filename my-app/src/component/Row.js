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
      <li className="b-list-contacts__item">
        {
          !this.state.isUpdate ?
            <Fragment>
              <div className="b-list-contacts__item__fullname">{highlight(row.fullname)}</div>
              <div className="b-list-contacts__item__phonenum">{highlight(row.phonenum)}</div>
              <div className="b-list-contacts__item__button_group">
                <button className="b-list-contacts__item__button-edit" onClick={this.enableEditRow.bind(this)}>Изменить</button>
                <button className="b-list-contacts__item__button-remove" onClick={this.removeRow.bind(this, row)}>Удалить</button>
              </div>
              {/* {row.id}.  - {highlight(row.phonenum)} */}
            </Fragment>
            :         
            <Fragment>
              <form className="b-list-contacts__item__form" onSubmit={this.updateRow.bind(this, row)}>
                <div className="b-list-contacts__item__fullname">
                  <input type='text' name='fullname' value={this.state.fullname} onChange={this.onChangeHandler.bind(this, "fullname")} placeholder="Введите имя"/>
                </div>
                <div className="b-list-contacts__item__phonenum">
                  <input type='text' name='phonenum' value={this.state.phonenum} onChange={this.onChangeHandler.bind(this, "phonenum")} placeholder="Введите номер" 
                  maxLength="10" title="Введите номер сотового телефона"/>
                </div>
                <div className="b-list-contacts__item__button_group">
                  <button className="b-list-contacts__item__button-save" onClick={this.updateRow.bind(this, row)}>Сохранить</button>
                  <button className="b-list-contacts__item__button-cancel" onClick={this.cancelEditRow.bind(this)}>Отменить</button>
                </div>
              </form>            
            </Fragment>
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