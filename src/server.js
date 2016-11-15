import { Meteor } from 'meteor/meteor'

import './server/publications'
import './lib/methods'
import './server/config/services'
import configAccounts from './server/config/accounts'
import './server/oauth'
import './server/boot'
// import './server/files/collection'

configAccounts()
Meteor.startup(() => {

})
