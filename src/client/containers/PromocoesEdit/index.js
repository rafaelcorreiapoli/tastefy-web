import { connect } from 'react-redux'
import PromocoesAddForm, { validate } from '@components/PromocoesAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert'
import { reset, reduxForm } from 'redux-form'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'
import Produtos from '@collections/produtos'
import Promocoes from '@collections/promocoes'

const METHOD = 'Promocoes.methods.update'

const mapStateToProps = (state, { promocao }) => ({
  values: state.form.updatePromocao && state.form.updatePromocao.values,
  loading: getMethodState(state, METHOD).loading,
  updatePromocaoSuccess: getMethodState(state, METHOD).success,
  updatePromocaoError: getMethodState(state, METHOD).error,
  initialValues: {
    ...promocao,
  },
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit(values) {
    delete values._id

    const submitValues = {
      _id: ownProps.promocaoId,
      doc: {
        ...values,
      },
    }
    dispatch(call(METHOD, submitValues))
    .then(() => {
      Alert.success('Promoção editada')
    })
    .catch((e) => {
      Alert.error(`Algum erro ocorreu: ${e.toString()}`)
    })
  },
})

const compose = ({ restauranteId, promocaoId }, onData) => {
  const handler = Meteor.subscribe('produtos.quickList', {
    restauranteId,
  })

  const handler2 = Meteor.subscribe('promocoes.single', {
    promocaoId,
  })

  if (handler.ready() && handler2.ready()) {
    const optionsProdutos = Produtos.find({
      restauranteId,
    }, {
      fields: {
        _id: 1,
        nome: 1,
        imagemUrl: 1,
      },
    }).fetch()
    const promocao = Promocoes.findOne(promocaoId)
    onData(null, {
      optionsProdutos,
      promocao,
    })
  }
}

const PromocoesEditReduxForm = reduxForm({
  form: 'updatePromocao',
  destroyOnUnmount: true,
  validate,
})(PromocoesAddForm)

const PromocaoEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(PromocoesEditReduxForm)

export default composeWithTracker(compose)(PromocaoEdit)
