var twilio = require('twilio-js');
var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 3000});

server.views({
    engines: { jade: require('jade') },
    path: __dirname + '/templates',
    compileOptions: {
        pretty: true
    }
});

var phoneRoutes = require('./routes/phone.js')(server);
var pageRoutes = require('./routes/pages.js')(server);

server.route({
    method: 'GET',
    path: '/css/{file}.css',
    handler: function (request, reply) {
        reply.file("./css/"+request.params.file+".css");
    }
});
server.route({
    method: 'GET',
    path: '/js/{file}.js',
    handler: function (request, reply) {
        reply.file("./js/"+request.params.file+".js");
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
