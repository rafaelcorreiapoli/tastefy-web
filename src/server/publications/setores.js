import { Meteor } from 'meteor/meteor'
import Setores from '@collections/setores'
import { Counts } from 'meteor/tmeasday:publish-counts'

Meteor.publish('setores', function ({
  searchText,
  limit,
  skip,
  sort,
  filter,
}) {
  const selector = {
    nome: new RegExp(searchText, 'i'),
    ...filter,
  }

  const options = {
    sort,
    limit,
    skip,
  }

  Counts.publish(this, 'setores.count', Setores.find(selector));
  return Setores.find(selector, options)
});
