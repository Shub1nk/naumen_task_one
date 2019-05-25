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
      searchString: ''
    }

    this.addRows = this.addRow.bind(this);
    this.clearStringSearch = this.clearStringSearch.bind(this);
  }

  addRow(e) {
    e.preventDefault();

    const {fullname, phonenum} = this.state;
    const {addRow} = this.props;
    const newRow = {fullname, phonenum};
    addRow(newRow);

    this.setState({fullname: '', phonenum: ''});
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
            <div className="b-add__button-group">
              <button className="b-form-add__button-add" type="submit">Добавить</button> 
            </div>
          </form>
        </div>
        <p className="b-logs"></p>
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