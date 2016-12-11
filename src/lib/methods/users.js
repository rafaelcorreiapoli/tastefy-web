import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'
import { Chance } from 'chance'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Match, check } from 'meteor/check'

export const invite = new ValidatedMethod({
  name: 'Users.methods.invite',
  validate({ email, restauranteId, role, password, nomeCompleto, foto }) {
    check(email, String)
    check(password, String)
    check(nomeCompleto, String)
    check(foto, String)
    check(restauranteId, Match.Optional(String))
    check(role, String)
  },
  run({ email, restauranteId, role, password, nomeCompleto, foto }) {
    if (!this.isSimulation) {
      this.unblock()
      // const chance = new Chance()
      // const password = chance.bb_pin()

      const options = {
        email,
        password,
        restauranteId,
        profile: {
          nomeCompleto,
          foto,
        },
      }

      try {
        const userId = Accounts.createUser(options)
        // Accounts.sendEnrollmentEmail(userId, email)
        Roles.addUsersToRoles(userId, role)
        return true
      } catch (e) {
        throw new Meteor.Error(e.toString())
      }
    }
    return true
  },
})

export const activate = new ValidatedMethod({
  name: 'users.activate',
  validate: null,
  run() {
    return Meteor.users.update({
      _id: Meteor.userId(),
    }, {
      $set: {
        active: true,
      },
    })
  },
})
