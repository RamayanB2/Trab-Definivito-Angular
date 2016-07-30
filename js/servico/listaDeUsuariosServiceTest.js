angular.module('app')
.factory('listaDeUsuariosService', function ($q, usuarioService) {

    // SINGLETON - USUARIOS SÃO PETS
    
    var contador = 5;
    var mapDeUsuarios = {
        1 : {id: 1, nome:'Esteban', nome_dono: 'Carlos Roberto da Silva', cpf: '1234', foto:'http://www.mtgbrasilcardspoiler.esy.es/pets/p1.png', hab: 'Rolar' },
        2 : {id: 2, nome:'Salsicha', nome_dono: 'Jose Roberto de Arruda Siqueira', cpf: '2222',foto:'http://www.mtgbrasilcardspoiler.esy.es/pets/p2.png' , hab: 'Fingir de morto' },
        3 : {id: 3, nome:'Vinod', nome_dono: 'Lucia de Oliveira Cavalcanti Rocha', cpf: '3333', foto:'http://www.mtgbrasilcardspoiler.esy.es/pets/p3.png', hab: 'Pegar Bolinha' },
        4 : {id: 4, nome:'Isabel', nome_dono: 'Sergio Roberto Cunha de Aguiar', cpf: '1144', foto:'http://www.mtgbrasilcardspoiler.esy.es/pets/p4.png', hab: 'Comer' },
        5 : {id: 5, nome:'Dante', nome_dono: 'João Roberto da Siqueira', cpf: '6969', foto:'http://www.mtgbrasilcardspoiler.esy.es/pets/p5.png', hab: 'Respirar' },
    };

    return {
        salva: function (formData) {
            console.log("porra");
            var podeProseguir = !existeRegistro(formData);
                if (podeProseguir && formData.id === null) {
                    var deferred = $q.defer();

                    formData.id = ++contador;
                    mapDeUsuarios[formData.id] = formData;

                    resposta = {
                        sucesso: true,
                        usuario: formData,
                        msg: 'Pet cadastrado com sucesso!'
                    }
                    // É preciso salvar o usuário no serviço pois o próximo estado a ser
                    // exibido será 'exibeUsuario' que irá buscar o usuário no serviço.
                    usuarioService.setDados(resposta);

                    deferred.resolve(resposta);
                    return deferred.promise;
                }
                else {
                    var deferred = $q.defer();
                    var resposta;

                    if (formData.id in mapDeUsuarios) {
                        mapDeUsuarios[formData.id] = formData;

                        resposta = {
                            sucesso: true,
                            usuario: formData,
                            msg: 'Pet alterado com sucesso!'
                        }
                    }
                    else {
                        resposta = {
                            sucesso: false,
                            usuario: formData,
                            msg: 'Pet não cadastrado. Esse numero de registro já existe!'
                        }
                    }
                    ;

                    // É preciso salvar o usuário no serviço pois o próximo estado a ser
                    // exibido será 'exibeUsuario' que irá buscar o usuário no serviço.
                    usuarioService.setDados(resposta);

                    deferred.resolve(resposta);
                    return deferred.promise;
                }

        },

        recupera: function(id) {
            var deferred = $q.defer();
            var resposta;
            if (id in mapDeUsuarios){
                resposta = {
                    sucesso: true,
                    usuario: angular.copy(mapDeUsuarios[id]),
                    msg: ''
                }
            }
            else {
                resposta = {
                    sucesso: false,
                    usuario: null,
                    msg: 'Pet não cadastrado. Esse numero de registro já existe!'
                }
            };
            usuarioService.setDados(resposta);
            deferred.resolve(resposta);
            return deferred.promise;
        },

        remove: function(id) {
            var deferred = $q.defer();

            var usuarioRemovido;
            var resposta;

            if (id in mapDeUsuarios){
                usuarioRemovido = mapDeUsuarios[id];
                delete mapDeUsuarios[id];

                resposta = {
                    sucesso: true,
                    usuario: usuarioRemovido,
                    msg: 'Pet removido com sucesso!'
                }
            }
            else {
                resposta = {
                    sucesso: false,
                    usuario: null,
                    msg: 'Pet não encontrado!'
                }
            };

            // Não é preciso salvar o usuário no serviço pois não haverá mudança de estado.
            // usuarioService.setDados(resposta);

            deferred.resolve(resposta);
            return deferred.promise;
        },

        recuperaLista: function() {
            var deferred = $q.defer();

            var listaDeUsuarios = [];
            for (var i in mapDeUsuarios) {
                listaDeUsuarios.push(mapDeUsuarios[i]);
            };

            var resposta;
            if (listaDeUsuarios.length > 0) {
                resposta = {
                    sucesso: true,
                    usuarios: listaDeUsuarios
                }
            }
            else {
                resposta = {
                    sucesso: false,
                    usuarios: listaDeUsuarios
                }
            };

            deferred.resolve(resposta);
            return deferred.promise;
        }
    }

    function existeRegistro(formData){
        var jaExiste=false;
        for(var i in mapDeUsuarios) {
            if (mapDeUsuarios[i]['cpf'] == formData.cpf) {
                jaExiste = true;
                //alert("Esse numero de registro já está cadastrado!!!");
            }
        }
        return jaExiste;
    }

});

