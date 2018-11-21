import React, { Component } from 'react';
import BoardRow from './BoardRow';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSudokus, setCurrentSudoku } from '../actions/SudokuActions';
import Level from './Level';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  render() {
    const { boardRows, boards } = this.props.sudoku;
    const cols = boards.map((board) => {
      return (
        <Col key={board._id} md="4">
          <div style={{ width: '274px' }}>
            <div onClick={() => this.goToSudoku(board)}>
              {
                this.userDidSudoku(board.records) &&
               <div className="sudoku-done text-success"><FontAwesomeIcon icon="check-circle" size="2x" color="success"/></div>
               }
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
  sudoku: PropTypes.object,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku,
  user: state.user,
});

export default connect(mapStateToProps, { getSudokus, setCurrentSudoku })(Home);