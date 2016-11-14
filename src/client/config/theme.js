import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { PRIMARY_COLOR } from '@resources/colors'

export default getMuiTheme({
  palette: {
    primary1Color: PRIMARY_COLOR,
  },
  tooltip: {
    zIndex: 99999,
  },
})
