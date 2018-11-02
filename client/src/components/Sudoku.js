import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import BoardRow from './BoardRow';
import Timer from './Timer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Sudoku extends Component {

  render() {
    if(this.props.sudoku.currentSudoku != null){
    const { boardRows, currentSudoku } = this.props.sudoku;
    const { initialBoard, finalBoard } = currentSudoku;
    return (
      <Container>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <table className="sudoku-board">
              <tbody>
                {boardRows.map(boardRow => (
                  <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={initialBoard} boardResults={finalBoard} />
                ))}
              </tbody>
            </table>
          </Col>
          <Col md="3">
            <Timer />
          </Col>
        </Row>
      </Container>
    )
    } else {
      return (
        <div></div>
      )
    }
  }
}


Sudoku.propTypes = {
  sudoku: PropTypes.object
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku,
});

export default connect(mapStateToProps)(Sudoku);