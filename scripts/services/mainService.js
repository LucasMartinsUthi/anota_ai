app.factory('mainServ', ['$http', function ($http) {

	// var urlBase = "./api/filmes.json";
	var dados = {};

	dados.getDocuments = function (callback) {
		
		callback(filmes);
	}

	return dados;
}]);
