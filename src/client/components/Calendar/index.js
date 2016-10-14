import React, { PropTypes } from 'react'
import { Calendar as CalendarFunc } from 'calendar'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import { Check, Close, ChevronLeft, ChevronRight } from '@resources/icons'

const styles = {
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  year: {
    color: '#aaa'
  },
  daysContainer: {
    //padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  month: {
    minWidth: 200,
    textAlign: 'center',
  },
  day: {
    width: 100,
    height: 100,
    position: 'relative',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    position: 'absolute',
    right: 5,
    top: 5,
    fontSize: 10,
    color: '#aaa',
  },
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const FIRST_MONTH = 0
const LAST_MONTH = 11
const nextMonthYear = (month, year, direction = 1) => {
  let nextMonth
  let nextYear

  if (direction === 1) {
    if (month === LAST_MONTH) {
      nextMonth = FIRST_MONTH
      nextYear = year + 1
    } else {
      nextMonth = month + 1
      nextYear = year
    }
  } else if (direction === -1) {
    if (month === FIRST_MONTH) {
      nextMonth = LAST_MONTH
      nextYear = year - 1
    } else {
      nextMonth = month - 1
      nextYear = year
    }
  }


  return {
    month: nextMonth,
    year: nextYear,
  }
}
class Calendar extends React.Component {
  static propTypes = {
    month: PropTypes.number,
    year: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.calendar = new CalendarFunc(1);
    this.handleChangeDate = this.handleChangeDate.bind(this)

    this.state = {
      month: props.month,
      year: props.year,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        month: nextProps.month,
        year: nextProps.year,
      })
    }
  }

  handleChangeDate(direction) {
    this.setState({
      ...nextMonthYear(this.state.month, this.state.year, direction),
    })
  }

  render() {
    const {
      month,
      year,
    } = this.state

    const {
      renderDay
    } = this.props

    const weeks = this.calendar.monthDays(year, month);
    const dates = this.calendar.monthDates(year, month);

    return (
      <Paper style={styles.container}>
        <div style={styles.header}>
          <IconButton onTouchTap={() => this.handleChangeDate(-1)}>
            <ChevronLeft />
          </IconButton>
          <h3 style={styles.month}>
            {months[month]} <span style={styles.year}>({year})</span>
          </h3>
          <IconButton onTouchTap={() => this.handleChangeDate(1)}>
            <ChevronRight />
          </IconButton>
        </div>
        <Divider />
        <div style={styles.daysContainer}>
          {weeks.map((week, i) => (
            <div
              key={i}
              style={{ display: 'inline-flex', borderBottom: i !== weeks.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
              {week.map((day, j) => (
                <div
                  key={j}
                  style={Object.assign({}, styles.day, { borderRight: j !== week.length - 1 ? '1px solid #e0e0e0' : 'none', backgroundColor: day === 0 ? '#f9f9f9' : 'initial' }, )}>
                  <span style={styles.dayNumber}>
                    {day !== 0 && day}
                  </span>
                  {renderDay && renderDay(dates[i][j])}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Paper>
    )
  }
}

export default Calendar;
