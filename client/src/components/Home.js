import React, { Component } from 'react';
import BoardRow from './BoardRow';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSudokus, setCurrentSudoku } from '../actions/SudokuActions';
import Level from './Level';


class Home extends Component {

  componentWillMount() {
    this.props.getSudokus();
  }

  goToSudoku = (boardID) => {
    this.props.setCurrentSudoku(boardID);
    this.props.history.push('/sudoku');
  }

  render() {
    const { boardRows, boards } = this.props.sudoku;
    const cols = boards.map((board) => {
      return (
        <Col key={board._id} md="4">
          <div style={{ width: '274px' }}>
            <div onClick={() => this.goToSudoku(board._id)}>
              <table className="sudoku-board view-mode-board">
                <tbody>
                  {boardRows.map(boardRow => (
                    <BoardRow key={boardRow} row={boardRow} fields={board.initialBoard} />
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
  sudoku: PropTypes.object
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku,
});

export default connect(mapStateToProps, { getSudokus, setCurrentSudoku })(Home);