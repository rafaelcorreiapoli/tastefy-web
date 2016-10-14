// src/client.jsx
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import Root from 'client/components/Root';
import React from 'react';
import 'lib/methods'
import 'client/config/accounts'
import 'client/stubs'

import '!style!css!rc-slider/assets/index.css';
import '!style!css!react-select/dist/react-select.css';
import 'flexboxgrid/css/flexboxgrid.css';
// mandatory
import '!style!css!react-s-alert/dist/s-alert-default.css';
import '!style!css!react-s-alert/dist/s-alert-css-effects/slide.css';

import Perf from 'react-addons-perf'
injectTapEventPlugin();
window.Perf = Perf

Meteor.startup(() => {
  // Package['msavin:mongol'].Mongol.showCollection('departamentos')
  // Package['msavin:mongol'].Mongol.showCollection('setores')
  // Package['msavin:mongol'].Mongol.showCollection('funcionarios')
  // Package['msavin:mongol'].Mongol.showCollection('pontos')
  // Package['msavin:mongol'].Mongol.showCollection('faltas')

  ReactDOM.render(
    <Root />,
    document.getElementById('react-app')
  );
});
