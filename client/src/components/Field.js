import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setBoardState, addError } from '../actions/SudokuActions';
import { setInitialBoardState, setFinalBoardState } from '../actions/ManageSudokuActions';

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
      this.setState({ value });
      if (this.props.type === 'add' || this.props.type === 'edit') {
        this.handleChangeManageSudokuMode(value);
      } else {
        this.handleChangeGameMode(value);
      }

    }
  }

  // Change initial / final board State 
  handleChangeManageSudokuMode(value) {
    if(!value){
      value = 0
    }
    const { initialOrFinalBoard } = this.props;
    if(initialOrFinalBoard === 'initial'){
      this.props.setInitialBoardState(this.props.fieldIndex, parseInt(value));
    } else if(initialOrFinalBoard === 'final'){
      this.props.setFinalBoardState(this.props.fieldIndex, parseInt(value));
    }
    if(value > 0){
      this.focusNextField(this.fieldRef.current.parentElement);
    }
  }

  // Change board State of current sudoku being played
  handleChangeGameMode(value) {
    if (value !== '') {
      if (parseInt(value) === this.props.correctValue) {
        const currentTd = this.fieldRef.current.parentElement;
        this.focusNextField(currentTd);
      } else {
        this.props.addError();
        this.setState({ cssClass: 'text-danger' });
      }
    } else {
      this.setState({ cssClass: '' });
    }
    this.props.setBoardState(this.props.fieldIndex, parseInt(value));
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
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.fieldValue !== undefined){
      let value = '';
      if(nextProps.fieldValue > 0){
        value = nextProps.fieldValue;
      }
      this.setState({ value });
    }
  } 

  render() {
    const { value, cssClass } = this.state;
    if(this.props.type === 'add' || this.props.type === 'edit'){
      return <input type="text" value={value} className="sudoku-input" maxLength="1" onChange={this.handleChange} ref={this.fieldRef} />
    }
    return (
      <input type="text" pattern="\d*" value={value} className={"sudoku-input " + cssClass}
        maxLength="1" onChange={this.handleChange} ref={this.fieldRef} />
    )
  }
}


Field.propTypes = {
  sudoku: PropTypes.object,
  setBoardState: PropTypes.func,
  addError: PropTypes.func,
  setInitialBoardState: PropTypes.func,
  setFinalBoardState: PropTypes.func
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku
});

export default connect(mapStateToProps, { setBoardState, addError, setInitialBoardState, setFinalBoardState })(Field);