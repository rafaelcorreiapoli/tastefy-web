import { ServiceConfiguration } from 'meteor/service-configuration'
import { Meteor } from 'meteor/meteor'

ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      appId: Meteor.settings.services.facebook.appId,
      secret: Meteor.settings.services.facebook.secret,
    },
  }
)
