import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ProfileSchema = new SimpleSchema({
  firstName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  fullName: {
    type: String,
    optional: true,
    autoValue() {
      const firstName = this.field('profile.firstName');
      const lastName = this.field('profile.lastName');
      if (firstName.isSet && lastName.isSet) {
        return `${firstName.value} ${lastName.value}`;
      }
      return firstName.value;
    },
  },
  birth: {
    type: Date,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  imageId: {
    type: String,
    optional: true,
  },
});

export const EmailSchema = new SimpleSchema({
  address: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  verified: {
    type: Boolean,
  },
});

//
// Users
//
export default new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: [EmailSchema],
  },
  profile: {
    type: ProfileSchema,
    optional: true,
    blackbox: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    type: [String],
    optional: true,
    blackbox: true,
  },
  status: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  active: {
    type: Boolean,
    optional: true,
  },
  restauranteId: {
    type: String,
    optional: true,
  },
  vouchersLidos: {
    type: Number,
    optional: true,
  },
  cuponsGerados: {
    type: Number,
    optional: true,
  },
});
