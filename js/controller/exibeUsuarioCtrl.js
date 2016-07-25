angular.module('app')
.controller('exibeUsuarioCtrl', function($scope, usuarioService, listaDeUsuariosService, $state) {

    $scope.formData = usuarioService.getDados().usuario;
    $scope.msg = usuarioService.getDados().msg;
    usuarioService.reset();
    $scope.removido = false;

    $scope.recuperaUsuario = function (id){

        listaDeUsuariosService.recupera(id)
        .then(function(resposta) {
            if (resposta.sucesso) {
                $state.go('editaUsuario');
            }
            else {
                // $scope.formData = resposta.data.usuario; Os dados j� est�o sendo exibidos.
                $scope.msg = "Pet n�o encontrado.";
                usuarioService.reset();
            }
        })
    }

    $scope.removeUsuario = function (id){
        listaDeUsuariosService.remove(id)
        .then(function (resposta) {
            // $scope.formData = formData;  Os dados j� est�o sendo exibidos
            if(resposta.sucesso)
                $scope.msg = "Pet removido com sucesso.";
            else
                $scope.msg = "Pet n�o encontrado.";

            $scope.removido = true;

            // N�o � preciso resetar pois os dados do usu�rio removido
            // n�o foram salvos no servi�o pois n�o h� mudan�a de estado.
            // usuarioService.reset();
        })
    }

    $scope.isRemovido = function() {
        return $scope.removido;
    }

});
