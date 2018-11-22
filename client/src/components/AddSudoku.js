import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardRow from './BoardRow';

class AddSudoku extends Component {

  render() {
    const { boardRows } = this.props.sudoku;
    const initialBoard = new Array(88);
    initialBoard.fill(0, 0, 88);
    return (
      <Container>
        <h3>New Sudoku</h3>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label>Initial Board</Label>
                  <table className="sudoku-board">
                    <tbody>
                      {boardRows.map(boardRow => (
                        <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={initialBoard} type="manage" initialOrFinalBoard="initial"/>
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
                        <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={initialBoard} type="manage" initialOrFinalBoard="final" />
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
                <Input type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Button color="success">Add Sudoku</Button>
        </Form>
      </Container>
    )
  }
}

AddSudoku.propTypes = {
  sudoku: PropTypes.object
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku
});

export default connect(mapStateToProps)(AddSudoku);