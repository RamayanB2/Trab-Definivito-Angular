angular.module('app')
.controller('usuarioCtrl', function($scope, usuarioService, listaDeUsuariosService, $state) {

    if (typeof usuarioService.getDados() === 'object') {
        $scope.formData = usuarioService.getDados().usuario;
        usuarioService.reset();
    }
    else {
        $scope.formData = {
            id: null,
            nome: '',
            nome_dono: '',
            cpf: '',
            foto: '',
            hab: ''
        };
    };

    $scope.submitted = false;

    $scope.salvaUsuario = function (formData, formInvalido) {

        $scope.submitted = true;

        if(formInvalido)
        {   return;
        }

        listaDeUsuariosService.salva(formData)
        .then(function(usuario) {
            $state.go('exibeUsuario');      // Os dados do usuário foram salvos no serviço.
        })
    }
});
