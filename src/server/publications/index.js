import { Meteor } from 'meteor/meteor'
import './departamentos'
import './setores'

Meteor.publish(null, function () {
  return Meteor.users.find({ _id: this.userId }, { fields: { services: 1 } });
});
