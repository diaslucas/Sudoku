import React, { Component } from 'react'

export default class Timer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timerVisible: true,
      secs: 0,
      mins: 0,
      hours: 0,
      startTime: Date.now()
    }
  }

  componentDidMount() {
    setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    const { secs, mins, hours } = this.state;
    let newSecs = secs + 1;
    let newMins = mins;
    let newHours = hours;
    if (newSecs === 60) {
      newSecs = 0;
      newMins = mins + 1;
      if (newMins === 60) {
        newSecs = 0;
        newMins = 0;
        newHours = hours + 1;
      }
    }

    this.setState({
      secs: newSecs,
      mins: newMins,
      hours: newHours
    });
  }

  toggleTimer = () => {
    this.setState({ timerVisible: !this.state.timerVisible })
  }

  render() {
    const { timerVisible, secs, mins, hours } = this.state;
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
