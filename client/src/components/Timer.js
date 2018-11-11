import React, { Component } from 'react'

class Timer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timerVisible: true
    }
  }

  toggleTimer = () => {
    this.setState({ timerVisible: !this.state.timerVisible })
  }

  render() {
    const { timerVisible } = this.state;
    const { secs, mins, hours } = this.props;
    const btnHideTimerText = (timerVisible ? 'Hide Timer' : 'Show Timer')
    return (
      <React.Fragment>
        <div className={!timerVisible ? 'HideTimer' : ''}>
          <h4>
            {hours > 0 && (
              <span>{hours}:</span>
            )}
            {(mins.toString().length > 1 ? <span>{mins}:</span> : <span>0{mins}:</span>)}
            {(secs.toString().length > 1 ? <span>{secs}</span> : <span>0{secs}</span>)}
          </h4>
          <div>
            Too much pressure ? <br />
          </div>
        </div>
        <button className="btn btn-dark btn-sm mr-auto" onClick={this.toggleTimer}>{btnHideTimerText}</button>
      </React.Fragment>
    )
  }
}


export default Timer;