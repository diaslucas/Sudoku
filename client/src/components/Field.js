import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setBoardState } from '../actions/SudokuActions';

class Field extends Component {

  constructor(props) {
    super(props)
  
    this.fieldRef = React.createRef();

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    if(!isNaN(value)){
      if (value !== '' && parseInt(value) === this.props.correctValue) {
        const nextTd = this.fieldRef.current.parentElement.nextSibling;
        this.focusNextField(nextTd);
      }
      this.setState({value});
      this.props.setBoardState(this.props.fieldIndex, parseInt(value));
    }
  }

  focusNextField(nextTd) {
    if(nextTd.firstChild.tagName === 'INPUT'){
      nextTd.firstChild.focus();
    } else {
      this.focusNextField(nextTd.nextSibling);
    }
  }

  render() {
    const { value } = this.state;
    let cssClass = '';
    if (value !== '' && parseInt(value) !== this.props.correctValue) {
      cssClass = 'border border-danger';
    }
    return (
      <input type="text" value={this.state.value} className={"sudoku-input " + cssClass} 
      maxLength="1" onChange={this.handleChange} ref={this.fieldRef} />
    )
  }
}


Field.propTypes = {
  sudoku: PropTypes.object,
  setBoardState: PropTypes.func
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku
});

export default connect(mapStateToProps, { setBoardState })(Field);