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
    return (
      <tr key={`row_${row}`}>
      {newFields.map((field, index) => {
        if (this.props.type === 'add') {
          return <td key={`field_${index}`}><Field type="add" fieldIndex={index} initialOrFinalBoard={this.props.initialOrFinalBoard}/></td>
        }
        else if(this.props.type === 'edit'){
          return <td key={`field_${index}`}><Field type="edit" fieldIndex={index} fieldValue={this.props.fields[index]} initialOrFinalBoard={this.props.initialOrFinalBoard}/></td>
        }
         else {
          if(boardResults){
            if(field !== 0){
              return <td key={`startField_${index}`}><div className="sudoku-input default-value">{field}</div></td>
            } else {
                return <td key={`field_${index}`}><Field correctValue={boardResults[index]} fieldIndex={index} /></td>
            }
          } else {
            return <td key={`startField_${index}`}>{(field === 0 ? '' : field)}</td>
          }
        }
      })}
    </tr>
    )
  }
}
