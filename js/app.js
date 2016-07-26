angular.module('app', ['ui.router','ui.mask','filtros', 'trNgGrid']);

angular.module('app').run(function () {
    var defaultTranslation = {};
    var enTranslation = angular.extend({}, defaultTranslation);
    enTranslation[TrNgGrid.translationDateFormat] = "yyyy-MM-dd";
    TrNgGrid.translations["en"] = enTranslation;
    var ptBrTranslation = angular.extend({}, enTranslation,
        {
            "Search": "Pesquisa",
            "Page":"P�gina",
            "First Page": "Primeira",
            "Next Page": "Pr�xima",
            "Previous Page": "Anterior",
            "Last Page": "�ltima",
            "Sort": "Ordenar",
            "No items to display": "Qtd de itens a exibir",
            "displayed": "exibidos",
            "in total": "no total"
        });
    ptBrTranslation[TrNgGrid.translationDateFormat] = "dd/MM/yyyy";
    TrNgGrid.translations["pt-br"] = ptBrTranslation;
});

// No ui-router h� 3 formas principais de Ativar um Estado
// 1. Navegando diretamente para o URL associado com o estado. Ex: /prodCategorias/Celulares que ir� casar com /proCategorias/:nomeCategoria
// 2. Chamando state.go() no $state service
// 3. Clicando em um link que cont�m a diretiva ui-sref

angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
        //    Para definir uma rota, utilizamos o m�todo .config, mas em vez de configurarmos
        //    nossas rotas no $routeProvider, definimos os estados com $stateProvider.
        //    A configura��o abaixo designa o estado denominado home ao objeto de configura��o
        //    do estado. O objeto de configura��o do estado, ou o stateConfig, possui op��es
        //    similares que utilizamos para configurar nossos estados.

        //    Podemos configurar templates em cada uma das nossas vis�es utilizando uma das
        //    seguintes op��es:
        //	  template ? Um string com conte�do HTML ou uma fun��o que retorna HTML
        //	  templateUrl ? Um string que define um caminho para um template ou uma fun��o que retorna um URL
        //	  templateProvider ? A function that returns an HTML content string

        //    Exemplo:
        //    $stateProvider.state('home', {
        //		  template: '<h1>Hello {{ name }}</h1>'
        //		});

        //		Controller
        //		Assim como no ngRoute, podemos associar um controlador existente a um URL (atrav�s de um string)
        //      ou podemos criar uma fun��o controladora que funciona como controlador para o estado.
        //		Se um template n�o tiver sido definido, ent�o o controlador n�o ser� criado.

        //      URL
        //	    A op��o url ir� designar um URL que a aplica��o est�, a um estado espec�fico. Dessa forma,
        //      podemos navegar por estados em vez de apenas por URL.

        //	    Quando o usu�rio navega para /, ent�o a aplica��o ir� efetuar a transi��o para o estado home
        //      e ir� preencher o conte�do da diretiva ui-view com o conte�do definido no templateUrl.

        //      O URL pode possuir v�rias op��es diferentes.
        //	    Podemos capturar o :nomeDaCategoria como o segundo componente no URL. Se a aplica��o transitar para
        //	    /prodCategorias/Celulares, ent�o $stateParams.nomeDaCategoria se torna Celulares.
        //      O caminho deve casar com o URL exatamente. Se o usu�rio navegar para /prodCategorias/, esse caminho
        //	    ir� funcionar; no entanto, se navegar para /prodCategorias, o estado n�o ser� ativado.

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl : 'paginas/home.html',
                controller  : 'homeCtrl'
            })
            .state('quemSomos', {
                url: '/quemSomos',
                templateUrl : 'paginas/quemSomos.html',
                controller  : 'quemSomosCtrl'
            })
            .state('editaUsuario', {
                url: '/usuario',
                templateUrl : 'paginas/usuario/form.html',
                controller  : 'usuarioCtrl'
            })
            .state('exibeUsuario', {
                url: '/exibeUsuario',
                templateUrl: 'paginas/usuario/exibe.html',
                controller: 'exibeUsuarioCtrl'
            })
            .state('exibeUsuarios', {
                url: '/exibeUsuarios',
                templateUrl: 'paginas/usuario/exibeUsuarios.html',
                controller: 'exibeUsuariosCtrl'
            })
        ;

        $urlRouterProvider.otherwise('/');
    });

angular.module('app').controller('ContatoCtrl', function($scope) {

    $scope.formData = {
        nome: '',
        email:'',
        assunto:'',
        msg:''

    };

    $scope.assuntos = [
        {id :1, assunto: "Duvidas"},
        {id: 2, assunto: "Sugestoes"},
        {id: 3, assunto: "Queixas"},
        {id: 4, assunto: "Meu pet sabe falar!"}
    ];

    $scope.submitted = false;
    $scope.hoje = new Date();  // Data de hoje - javascript

    $scope.processaContato = function() {

        $scope.submitted = true;

        $scope.respostaNome = 'Nome = ' + $scope.formData.nome;
        $scope.respostaEmail = 'Email = ' + $scope.formData.email;

        if ($scope.formData.assunto === '' || $scope.formData.assunto == undefined)
            $scope.respostaAssunto = 'Faixa Et�ria: N�o selecionada.';
        else {
            var assunto = parseInt($scope.formData.assunto);
            $scope.respostaAssunto = 'Assunto: ' + $scope.assuntos[assunto-1].assunto;
        }

        $scope.respostaMsg = 'Mensagem = ' + $scope.formData.msg;
    }
});
