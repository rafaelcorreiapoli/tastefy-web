import { Meteor } from 'meteor/meteor'
import Departamentos from '@collections/departamentos'
import { Counts } from 'meteor/tmeasday:publish-counts'

Meteor.publish('departamentos', function ({
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

  Counts.publish(this, 'departamentos.count', Departamentos.find(selector));
  return Departamentos.find(selector, options)
});
