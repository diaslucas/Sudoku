import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Level extends Component {

  render() {
    let arrLevels = Array(this.props.value).fill(0);
    
    return (
      <div className="stars-container" style={{marginTop: this.props.marginTop || '10px'}}>
        {
          arrLevels.map((level, index) => {
          return <FontAwesomeIcon icon="star" size={this.props.size || 'lg'} key={index} />;
        })
        }
      </div>
    );
  }
  
}
