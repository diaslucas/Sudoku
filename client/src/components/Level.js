import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Level = props => {
    let arrLevels = Array(props.value).fill(0);
    return (
      <div className="stars-container" style={{marginTop: props.marginTop || '10px'}}>
        {
          arrLevels.map((level, index) => {
          return <FontAwesomeIcon icon="star" size={props.size || 'lg'} key={index} />;
          })
        }
      </div>
    )  
}

export default Level;
