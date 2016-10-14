import { ServiceConfiguration } from 'meteor/service-configuration'

ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      appId: Meteor.settings.services.facebook.appId,
      secret: Meteor.settings.services.facebook.secret,
      loginStyle: 'popup',
    },
  },
);

ServiceConfiguration.configurations.upsert(
  { service: 'linkedin' },
  {
    $set: {
      clientId: Meteor.settings.services.linkedin.clientId,
      secret: Meteor.settings.services.linkedin.secret,
      loginStyle: 'popup',
    },
  },
);
