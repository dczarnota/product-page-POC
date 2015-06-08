/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

require('node-jsx').install({ extension: '.jsx' });
var express = require('express');
var React = require('react');
var serialize = require('serialize-javascript');
var navigateAction = require('fluxible-router').navigateAction;

var app = require('./app');
var HtmlComponent = require('./components/Html.react');
var htmlComponent = React.createFactory(HtmlComponent);

var server = express();
server.set('state namespace', 'App');

server.use(function(req, res, next){
  var context = app.createContext();

  console.log('navigateAction: '+navigateAction);

  context.getActionContext().executeAction(navigateAction, {
    url: req.url
  }, function(err){
    if(err){
      if(err.status && err.status === 404){
        next();
      } else {
        next(err);
      }
      return;
    }

    var AppCompenent = app.getAppComponent();
    var component = AppCompenent({
      context: context.getComponentContext()
    });
    var html = React.renderToString(component);

    res.send(html);
  });
});

var port = process.env.PORT || 8000;
server.listen(port);
console.log('Listening on port: ' + port);
