import { ACCENT } from '@resources/colors';

const styles = {
  container: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  valueRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    alignSelf: 'stretch',
    width: '100%'
  },
  addButton: {
    alignSelf: 'flex-end',
    color: ACCENT
  },
  deleteButton: {
    //marginLeft: 10
  },
  deleteIcon: {
    color: ACCENT
  }
}

export default styles;
