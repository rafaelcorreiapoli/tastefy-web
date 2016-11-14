import { connect } from 'react-redux'
import ProdutosAddForm from '@components/ProdutosAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert'
import { reset } from 'redux-form'

const METHOD = 'Produtos.methods.insert'

const mapStateToProps = state => ({
  values: state.form.insertProduto && state.form.insertProduto.values,
  insertProdutoLoading: getMethodState(state, METHOD).loading,
  insertProdutoSuccess: getMethodState(state, METHOD).success,
  insertProdutoError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit(values) {
    const submitValues = {
      ...values,
      desconto: Number(values.desconto),
      restauranteId: ownProps.restauranteId,
    }
    dispatch(call(METHOD, submitValues))
    .then(() => {
      Alert.success('Produto criado')
      dispatch(reset('insertProduto'))
    })
    .catch((e) => {
      Alert.error(`Algum erro ocorreu ${e.toString()}`)
      //  dispatch(reset('insertProduto'))
    })
  },
})

const ProdutosAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProdutosAddForm)

export default ProdutosAdd
