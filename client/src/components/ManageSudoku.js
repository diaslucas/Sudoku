import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardRow from './BoardRow';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { resetBoardsStates, setManageSudoku } from '../actions/ManageSudokuActions';

class ManageSudoku extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       level: '',
       redirectToHome: false,
       addMode: true,
       sudokuID: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  
  handleChange(event) {
    this.setState({ level: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addMode, level, sudokuID } = this.state;
    const { initialBoard, finalBoard } = this.props.manageSudoku;
    const sudoku = { initialBoard, finalBoard, level: parseInt(level) };
    if(addMode){
      axios
      .post('/api/sudokus/', sudoku)
      .then(res => {
        if(res.data.success){
          this.setState({ redirectToHome: true });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert(err.message));
    } else {
      axios
      .put(`/api/sudokus/${sudokuID}`, sudoku)
      .then(res => {
        if(res.data.success){
          this.setState({ redirectToHome: true });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert(err.message));
    }
  }

  componentDidMount() {
    this.props.resetBoardsStates();
    const { sudokuID } = this.props.match.params;
    if(sudokuID){
      this.props.setManageSudoku(sudokuID);
      this.setState({ addMode: false, sudokuID });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(!this.state.addMode){
      this.setState({ level: nextProps.manageSudoku.level });
    }
  } 

  cancel = () => {
    this.setState({redirectToHome: true});
  }

  clearForm = () => {
    this.props.resetBoardsStates();
  }

  render() {
    const { addMode, level } = this.state;
    const { boardRows } = this.props.sudoku;
    const { initialBoard, finalBoard } = this.props.manageSudoku;
    let type = 'add';
    let submitBtnText = 'Add Sudoku'; 
    if(!addMode){ 
      type = 'edit';
      submitBtnText = 'Update Sudoku';
    }
    if(this.state.redirectToHome){
      return <Redirect to='/' /> 
    }
    return (
      <Container>
        <h3>New Sudoku</h3>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label>Initial Board</Label>
                  <table className="sudoku-board">
                    <tbody>
                      {boardRows.map(boardRow => (
                        <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={initialBoard} type={type} initialOrFinalBoard="initial"/>
                      ))}
                    </tbody>
                  </table>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Final Board</Label>
                  <table className="sudoku-board">
                    <tbody>
                      {boardRows.map(boardRow => (
                        <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={finalBoard} type={type} initialOrFinalBoard="final" />
                      ))}
                    </tbody>
                  </table>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <FormGroup>
                <Label>Level</Label>
                <Input type="text" value={level} onChange={this.handleChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Button color="success" className="mr-2 mb-4">{submitBtnText}</Button>
          <Button color="primary" className="mr-2 mb-4" onClick={this.clearForm}>Clear</Button>
          <Button color="danger" className="mr-2 mb-4" onClick={this.cancel}>Cancel</Button>
        </Form>
      </Container>
    )
  }
}

ManageSudoku.propTypes = {
  sudoku: PropTypes.object,
  manageSudoku: PropTypes.object,
  resetBoardsStates: PropTypes.func,
  setManageSudoku: PropTypes.func,
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku,
  manageSudoku: state.manageSudoku
});

export default connect(mapStateToProps, {resetBoardsStates, setManageSudoku})(ManageSudoku);