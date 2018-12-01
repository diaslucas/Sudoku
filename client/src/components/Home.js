import React, { Component } from 'react';
import BoardRow from './BoardRow';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSudokus, setCurrentSudoku, deleteSudoku } from '../actions/SudokuActions';
import Level from './Level';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class Home extends Component {

  componentDidMount() {
    this.props.getSudokus();
  }

  goToSudoku = (board) => {
    this.props.setCurrentSudoku(board);
    this.props.history.push('/sudoku');
  }

  userDidSudoku = (records) => {
    let result = false;
    if(this.props.user.userLoggedIn !== null) {
      if(records.length > 0) {
        records.forEach((record) => {
          if(record.username === this.props.user.userLoggedIn.username){
            result =  true;
          }
        });
      }
    }
    return result;
  }

  deleteSudoku(sudokuID) {
    if(window.confirm("Do you really want to delete this sudoku?")){
      this.props.deleteSudoku(sudokuID);
    }
  }

  AdminLinks = (props) => {
    if (this.props.user.userLoggedIn !== null) {
      if (this.props.user.userLoggedIn.role === 'admin') {
        return ( 
          <ul className="nav mb-1 mt-3" style={{marginLeft: '60px'}}>
            <li className="nav-item">
              <Link className="btn btn-outline-primary mr-2" to={`/EditSudoku/${props.sudokuID}`}>Update</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger ml-2" onClick={() => {this.deleteSudoku(props.sudokuID)}}>Delete</button>
            </li>
          </ul>
        )
      }
    }
    return false;
  }



  render() {
    const { boardRows, boards } = this.props.sudoku;
    const cols = boards.map((board) => {
      return (
        <Col key={board._id} md="4">
          <div className="mb-4" style={{ width: '274px' }}>
              {
                this.userDidSudoku(board.records) &&
               <div className="sudoku-done text-success"><FontAwesomeIcon icon="check-circle" size="2x" color="success"/></div>
               }
              <this.AdminLinks sudokuID={board._id} />
            <div onClick={() => this.goToSudoku(board)}>
              <table className="sudoku-board view-mode-board">
                <tbody>
                  {boardRows.map(boardRow => (
                    <BoardRow key={boardRow} row={boardRow} fields={board.initialBoard}/>
                  ))}
                </tbody>
              </table>
            </div>
            <Level value={board.level} />
          </div>
        </Col>
      )
    });
    return (
      <div>
        <Container>
          <Row>
            {cols}
          </Row>
        </Container>
      </div>
    )
  }
}

Home.propTypes = {
  getSudokus: PropTypes.func,
  setCurrentSudoku: PropTypes.func,
  deleteSudoku: PropTypes.func,
  sudoku: PropTypes.object,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku,
  user: state.user,
});

export default connect(mapStateToProps, { getSudokus, setCurrentSudoku, deleteSudoku })(Home);