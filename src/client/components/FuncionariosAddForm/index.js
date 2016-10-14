import React, { PropTypes } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import Joi from 'joi-browser';
import { RaisedButton, Divider, IconButton, MenuItem } from 'material-ui';
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper';
import validator from '@utils/validator'
import FileInputCamera from '@components/FileInputCamera'
import { Add, Remove } from '@resources/icons'
// import FileInputDrop from '@components/FileInputDrop'

import {
  SelectField,
  TextField,
  DatePicker,
} from 'redux-form-material-ui'

const contatoSchema = Joi.object({
  telefone: Joi.string().required(),
  celular: Joi.string().required(),
})

const dependenteSchema = Joi.object({
  nome: Joi.string().required(),
  contato: contatoSchema,
})

const schema = Joi.object({
  fotos: Joi.array().items(Joi.string().required()).min(1).required(),
  nome: Joi.string().required(),
  dataNascimento: Joi.object().required(),
  cpf: Joi.string().required(),
  contato: contatoSchema,
  setorId: Joi.string().required(),
  endereco: Joi.object({
    rua: Joi.string().required(),
    numero: Joi.number().required(),
    complemento: Joi.string().required(),
  }).required(),
  dependentes: Joi.array().items(dependenteSchema),
});

const validate = values => validator(values, schema)


const MyDivider = () => (
  <Divider
    style={{
      marginTop: 40,
      marginBottom: 40,
      marginLeft: -20,
      marginRight: -20,
      backgroundColor: '#f0f0f0',
    }}
  />
)

class FuncionariosAddForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    array: PropTypes.object,
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      invalid,
      array: {
        push,
      },
    } = this.props

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Field
            name="fotos"
            component={FileInputCamera}
          />
          {/* <Field
            name="documentos"
            component={FileInputDrop}
          /> */}
          <Field
            floatingLabelText="Nome do Funcionário"
            component={TextField}
            name="nome"
            fullWidth
          />
          {/* <Field
            floatingLabelText="Data de nascimento"
            component={DatePicker}
            name="dataNascimento"
            fullWidth
            defaultValue={null}
          /> */}
          <Field
            floatingLabelText="CPF"
            component={TextField}
            name="cpf"
            fullWidth
          />
          <Field
            floatingLabelText="Data de Nascimento"
            component={DatePicker}
            name="dataNascimento"
            fullWidth
            container="inline"
            mode="landscape"
          />
          <MyDivider />
          <h3>Contato</h3>
          <Field
            floatingLabelText="Telefone"
            component={TextField}
            name="contato.telefone"
            fullWidth
          />
          <Field
            floatingLabelText="Celular"
            component={TextField}
            name="contato.celular"
            fullWidth
          />
          <MyDivider />
          <h3>Endereço</h3>
          <Field
            floatingLabelText="Rua"
            component={TextField}
            name="endereco.rua"
            fullWidth
          />
          <Field
            floatingLabelText="Número"
            component={TextField}
            type="number"
            name="endereco.numero"
            fullWidth
          />
          <Field
            floatingLabelText="Complemento"
            component={TextField}
            name="endereco.complemento"
            fullWidth
          />
          <MyDivider />
          <Field
            floatingLabelText="Setor"
            component={SelectField}
            name="setorId"
            fullWidth
          >
            <MenuItem value="setor1" primaryText="Setor 1" />
            <MenuItem value="setor2" primaryText="Setor 2" />
            <MenuItem value="setor3" primaryText="Setor 3" />
          </Field>
          <MyDivider />

          <FieldArray
            name="dependentes"
            component={
              dependentes => (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3 style={{ marginRight: 20 }}>Dependentes</h3>
                    <RaisedButton
                      primary
                      label="Adicionar"
                      onTouchTap={() => push('dependentes', {})}
                      icon={<Add />}
                    />
                  </div>

                  {
                    dependentes.fields.map((dependente, dependenteIndex) => (
                      <div key={dependenteIndex} style={{ marginLeft: 10, marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            tooltip="Remover"
                            onTouchTap={() => dependentes.fields.remove(dependenteIndex)}
                          >
                            <Remove color="#F44336" />
                          </IconButton>
                          <h4 style={{ margin: 0, marginLeft: 20 }}>
                            Dependente #{dependenteIndex + 1}
                          </h4>
                        </div>
                        <Field
                          floatingLabelText="Nome do Dependente"
                          component={TextField}
                          name={`${dependente}.nome`}
                          fullWidth
                        />
                        {/* <h3>Contato</h3> */}
                        <Field
                          floatingLabelText="Telefone"
                          component={TextField}
                          name={`${dependente}.contato.telefone`}
                          fullWidth
                        />
                        <Field
                          floatingLabelText="Celular"
                          component={TextField}
                          name={`${dependente}.contato.celular`}
                          fullWidth
                        />
                      </div>
                    ))
                  }
                </div>
              )
          } />
        </InputWrapper>
        <InputWrapper>
          <RaisedButton
            label={'Criar'}
            disabled={invalid}
            primary
            type="submit"
          />
        </InputWrapper>
      </form>
    )
  }
}


export default reduxForm({
  form: 'novoFuncionario',
  destroyOnUnmount: false,
  validate,
})(FuncionariosAddForm)
