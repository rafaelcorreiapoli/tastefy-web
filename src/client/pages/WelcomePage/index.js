import React, { PropTypes } from 'react'
import Calendar from '@components/Calendar'
import Webcam from 'react-webcam';

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <Calendar
          month={9}
          year={2016}
          renderDay={date => <div>ok</div>}
        />
      </div>
    )
  }
}

export default WelcomePage;
