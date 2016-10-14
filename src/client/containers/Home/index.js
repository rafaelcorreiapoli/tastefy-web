import { connect } from 'react-redux'
import { closeModal } from '@ducks/home'
import Home from '@components/Home'

const mapStateToProps = (state) => ({
  open: state.dialogOpen,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
