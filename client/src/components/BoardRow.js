import React, { Component } from 'react';
import Field from './Field';

export default class BoardRow extends Component {
 
  render() {
    let fields = this.props.fields;
    let row = this.props.row;
    let start = 0;
    let end = 0;
    start = (row === 0 ? 0 : row * 8  + row);
    end = start + 8;
    let newFields = [];
    fields.forEach((element, index) => {
      if (index >= start && index <= end) {
        newFields[index] = element;
      }
    });
    
    const boardResults = this.props.boardResults;
    let x =1;
    return (
      <tr>
      {newFields.map((field, index) => {
        if(boardResults){
          if(field !== 0){
            return <td><div className="sudoku-input default-value" key={index}>{field}</div></td>
          } else {
              return <td><Field key={index} correctValue={this.props.boardResults[index]} ind={index} /></td>
          }
        } else {
          return <td key={index}>{(field == 0 ? '' : field)}</td>
        }
      })}
    </tr>
    )
  }
}
