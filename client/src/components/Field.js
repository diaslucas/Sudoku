import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setBoardState, addError } from '../actions/SudokuActions';

class Field extends Component {

  constructor(props) {
    super(props)

    this.fieldRef = React.createRef();

    this.state = {
      value: '',
      cssClass: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    if (!isNaN(value)) {
      if (value !== '') {
        if (parseInt(value) === this.props.correctValue) {
          const currentTd = this.fieldRef.current.parentElement;
          this.focusNextField(currentTd);
        } else {
          this.props.addError();
          this.setState({ cssClass: 'text-danger' });
        }
      } else{
        this.setState({ cssClass: '' });
      }
      this.setState({ value });
      this.props.setBoardState(this.props.fieldIndex, parseInt(value));
    }
  }

  focusNextField(currentTd) {
    let nextTd = currentTd.nextSibling;
    if(nextTd !== null){
      if(nextTd.firstChild.tagName === 'INPUT'){
        nextTd.firstChild.focus();
      } else {
        this.focusNextField(nextTd);
      }
    } else {
      let currentTr = currentTd.parentElement;
      if (currentTr.nextSibling !== null) {
        
        let input = currentTr.nextSibling.firstChild.firstChild;
        if (input.tagName === 'INPUT') {
          currentTr.nextSibling.firstChild.firstChild.focus();
        } else {
          this.focusNextField(currentTr.nextSibling.firstChild);
        }
      }
    }
  }

  render() {
    const { value, cssClass } = this.state;
    return (
      <input type="text" value={value} className={"sudoku-input " + cssClass}
        maxLength="1" onChange={this.handleChange} ref={this.fieldRef} />
    )
  }
}


Field.propTypes = {
  sudoku: PropTypes.object,
  setBoardState: PropTypes.func,
  addError: PropTypes.func
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku
});

export default connect(mapStateToProps, { setBoardState, addError })(Field);