module.exports = function (server) {

	var cont = {
		indexController: function(req, res) {
			res.view('pages/index');
		},
		aboutController: function(req, res) {
			res.view('pages/about');
		}
	}


	server.route({method: 'GET', path: '/', handler: cont.indexController});
	server.route({method: 'GET', path: '/about', handler: cont.aboutController});
}