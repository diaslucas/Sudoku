import React, { Component } from 'react';
import BoardRow from './BoardRow';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boardRows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      fields: [],
      boardResults: []
    };
  }

  componentWillMount() {
    axios
      .get('/api/sudokus')
      .then(res => {
        this.setState({
          fields: res.data[0].initialBoard,
          boardResults: res.data[0].finalBoard
        })
      })
  }

  render() {
    const { boardRows, fields, boardResults } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <a href="/1">
                <table className="sudoku-board">
                  <tbody>
                    {boardRows.map(boardRow => (
                      <BoardRow key={boardRow} row={boardRow} fields={fields} />
                    ))}
                  </tbody>
                </table>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

