import { Meteor } from 'meteor/meteor'
import './cupons'
import './produtos'
import './promocoes'
import './questionarios'
import './restaurantes'
import './users'
import './vouchers'

Meteor.publish(null, function () {
  return Meteor.users.find({ _id: this.userId }, { fields: { services: 1 } })
})
