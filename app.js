var React = require('react');
var Fluxible = require('fluxible');
var Application = require('./components/Application');
var ApplicationStore = require('./stores/ApplicationStore');

var app = new Fluxible({
  component: Application
});

// app.registerStore(ApplicationStore);

module.exports = app;
