import { Accounts } from 'meteor/accounts-base'

export default function configAccounts() {
  Accounts.urls.enrollAccount = function (token) {
    return Meteor.absoluteUrl(`enroll-account/${token}`)
  }

  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl(`reset-password/${token}`)
  }

  Accounts.onCreateUser((options, user) => {
    const returnUser = {
      ...user,
    }

    if (options.restauranteId) {
      returnUser.restauranteId = options.restauranteId
    }
    returnUser.profile = options.profile || {}
    console.log(options)
    console.log(returnUser)
    return returnUser
  })
}
