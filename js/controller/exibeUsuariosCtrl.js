angular.module('app').controller('exibeUsuariosCtrl', function($scope, listaDeUsuariosService, $state) {

    listaDeUsuariosService.recuperaLista()
    .then(function(resposta) {
        //console.log(resposta.usuarios);
        $scope.usuarios = resposta.usuarios;
    });

// ----------------------------------------------------------------------------------------------

    $scope.removeUsuario = function (id){

        listaDeUsuariosService.remove(id)
        .then(function(resposta) {
            $state.go($state.current, {}, {reload: true});  // $state.go('exibeUsuarios');
        })
    }

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

});