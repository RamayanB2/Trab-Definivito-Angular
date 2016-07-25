angular.module('app')
.factory('usuarioService', function () {

    // SINGLETON
    var dados;

    return {
        reset: function () {
            dados = 'undefined';
        },

        getDados: function () {
            return dados;
        },

        setDados: function (resposta) {
            dados = resposta;
        }
    }

});
