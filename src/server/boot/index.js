import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'
import CupomSchema from '@schemas/cupom'
import Cupons from '@collections/cupons'
import PerguntaSchema from '@schemas/pergunta'
import Perguntas from '@collections/perguntas'
import ProdutoSchema from '@schemas/produto'
import Produtos from '@collections/produtos'
import PromocaoSchema from '@schemas/promocoes'
import Promocoes from '@collections/promocoes'
import QuestionarioSchema from '@schemas/questionario'
import Questionarios from '@collections/questionarios'
import RespostaSchema from '@schemas/resposta'
import Respostas from '@collections/respostas'
import RestauranteSchema from '@schemas/restaurante'
import Restaurantes from '@collections/restaurantes'
import VoucherSchema from '@schemas/voucher'
import Vouchers from '@collections/vouchers'

const ROLES = ['admin', 'editor', 'researcher', 'viewer'];
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'q1w2e3';
const ADMIN_ROLE = 'admin';

Cupons.attachSchema(CupomSchema)
Perguntas.attachSchema(PerguntaSchema)
Produtos.attachSchema(ProdutoSchema)
Promocoes.attachSchema(PromocaoSchema)
Questionarios.attachSchema(QuestionarioSchema)
Respostas.attachSchema(RespostaSchema)
Restaurantes.attachSchema(RestauranteSchema)
Vouchers.attachSchema(VoucherSchema)

Meteor.startup(() => {
  // Seed admin for development
  if (process.env.NODE_ENV === 'development') {
    if (!Meteor.users.findOne({
      'emails.address': ADMIN_EMAIL,
    })) {
      const userId = Accounts.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      Roles.addUsersToRoles(userId, ADMIN_ROLE);
    }
  }

  // Seed Roles
  Meteor.roles.remove({
    name: { $nin: ROLES },
  });
  ROLES.forEach((role, index) => {
    Meteor.roles.upsert({
      name: role,
    }, {
      name: role,
      hierarchy: index,
    });
  });
})
