import { Meteor } from 'meteor/meteor'
import Vouchers from '@collections/vouchers'
import Restaurantes from '@collections/restaurantes'
import Produtos from '@collections/produtos'
import Promocoes from '@collections/promocoes'

Meteor.publish('vouchers', () => {
  return Vouchers.find()
})


export default function () {
  Meteor.publishComposite('vouchers.meusVouchers', function () {
    const userId = this.userId
    return {
      find() {
        return Vouchers.find({
          ownerId: userId,
        })
      },
      children: [{
        find(voucher) {
          const { restauranteId } = voucher
          return Restaurantes.find(restauranteId)
        },
      }, {
        find(voucher) {
          const { promocaoId } = voucher
          return Promocoes.find(promocaoId)
        },
      }],
    }
  })

  Meteor.publishComposite('vouchers.vouchersValidados', function () {
    const userId = this.userId
    return {
      find() {
        return Vouchers.find({
          validadoPor: userId,
        })
      },
      children: [{
        find(voucher) {
          const { produtoSelecionado } = voucher
          return Produtos.find(produtoSelecionado)
        },
      }, {
        find(voucher) {
          const { ownerId } = voucher
          return Meteor.users.find(ownerId)
        },
      }],
    }
  })

  Meteor.publishComposite('vouchers.single', function ({ voucherId }) {
    const userId = this.userId
    return {
      find() {
        return Vouchers.find({
          _id: voucherId,
        })
      },
    }
  })
}
