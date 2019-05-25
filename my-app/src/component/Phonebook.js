import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

import Row from './Row';

class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      phonenum: '',
      searchString: '',
      isSendData: false,
      buttonAddText: 'Добавить запись',
      errorAdd: false, 
      logs: {
        text: '',
        color: ''
      }
    }

    this.addRows = this.addRow.bind(this);
    this.clearStringSearch = this.clearStringSearch.bind(this);
  }

  addRow(e) {
    e.preventDefault();

    const {listClients} = this.props;

    this.setState({isSendData: true, buttonAddText: 'Проверяем данные...'});

    const self = this;

    setTimeout(() => {
      const {fullname, phonenum} = self.state;
      const {addRow} = self.props;
      const newRow = {fullname, phonenum};

      const findFullname = listClients.find(item => item.fullname === fullname);
      const findPhonenum = listClients.find(item => item.phonenum === phonenum);

      if (!findFullname && !findPhonenum) {
        addRow(newRow)
        self.setState({isSendData: false, buttonAddText: "Данные добавлены!", fullname: '', phonenum: '', logs: {text: `Добавлен новый контакт: ${fullname} - ${phonenum}`, color: 'green'}})
      } else {
        self.setState({isSendData: false, buttonAddText: "Ошибка!", errorAdd: true, logs: { text: "Есть совпадение по имени или телефону", color: 'red'}})
      }
      setTimeout(() => {
        self.setState({buttonAddText: 'Добавить запись', errorAdd: false})
      }, 2000)
    }, 3000)

  };

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

  clearStringSearch() {
    this.setState({searchString: ''});
  }

  render() {

    const highlight = text => {

      if (!this.state.searchString) return text;
  
      const regexp = new RegExp(`(${this.state.searchString})`, "gmi");
      const newText = text.replace(regexp, ',$1,');
      const markArr = newText.split(',');
  
      if (!regexp.test(text)) return text;
  
      let newHTML = markArr.map((item, i) => {
        return (
          !regexp.test(item) ? 
            <span key={i}>{item}</span> 
            : 
            <span key={i} style={{color:"red", fontWeight: "bold"}}>{item}</span>
        )
      });
  
      return newHTML;
    }

    const {searchString} = this.state
    const {listClients} = this.props;
    let counterRow;

    const regexp = new RegExp(`${this.state.searchString}`, 'gi');

    if (searchString) {
      counterRow = (listClients.filter(item => (regexp.test(item.fullname) || regexp.test(item.phonenum)))).length;
    }

    return (
      <section className="b-phonebook">
        <div className="b-phonebook__search">
          <input type='text' name='search' value={this.state.searchString} onChange={this.onChangeHandler.bind(this, "searchString")} placeholder="Введите имя или номер"
          autoComplete="off" autoFocus/>
          {this.state.searchString && <span onClick={this.clearStringSearch}></span>}
          {this.state.searchString && <p className="b-phonebook__coincidence">Совпадений: {counterRow}</p>}
        </div>
        <ul className="b-list-contacts">
          {
            counterRow !== 0 ?
              listClients.map((row, i) => {
                return (
                  <Row key={row.id} row={row} highlight={highlight} searchString={searchString}/>
                )
              })
              :
              <li className="b-list-contacts__not-found">По вашему запросу ничего не найдено</li>
          }
        </ul>
        <hr/>
        <div className="b-add">
          <form className="b-add__form" onSubmit={this.addRows}>
            <div className="b-add__fullname"> 
              <input type='text' name='fullname' value={this.state.fullname} onChange=  {this.onChangeHandler.bind(this, "fullname")} placeholder="Введите имя"/>
            </div>
            <div className="b-add__phonenum">
              <input type='text' name='phonenum' value={this.state.phonenum} onChange={this.onChangeHandler.bind(this, "phonenum")} placeholder="Введите номер" 
              maxLength="10" title="Введите номер сотового телефона"/>
            </div>
            <div className="b-add__button-group" disabled={!this.state.fullname || !this.state.phonenum}>
              <button className="b-form-add__button-add" type="submit" disabled={this.state.isSendData} style={this.state.errorAdd ? {background: "#c9302c"} : {}}>{this.state.buttonAddText}</button> 
            </div>
          </form>
        </div>
        <p className="b-logs" style={{color: this.state.logs.color}}>{this.state.logs.text}</p>
      </section>
    );
  }
}

const mapStateToProps = ({phonebook}) => ({
  listClients: phonebook.listClients
});

const mapDispatchToProps = dispatch => ({
  addRow: state => dispatch(actions.addRow(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);