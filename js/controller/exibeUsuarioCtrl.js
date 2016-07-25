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
                // $scope.formData = resposta.data.usuario; Os dados já estão sendo exibidos.
                $scope.msg = "Pet não encontrado.";
                usuarioService.reset();
            }
        })
    }

    $scope.removeUsuario = function (id){
        listaDeUsuariosService.remove(id)
        .then(function (resposta) {
            // $scope.formData = formData;  Os dados já estão sendo exibidos
            if(resposta.sucesso)
                $scope.msg = "Pet removido com sucesso.";
            else
                $scope.msg = "Pet não encontrado.";

            $scope.removido = true;

            // Não é preciso resetar pois os dados do usuário removido
            // não foram salvos no serviço pois não há mudança de estado.
            // usuarioService.reset();
        })
    }

    $scope.isRemovido = function() {
        return $scope.removido;
    }

});
