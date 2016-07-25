angular.module('filtros',[]);


// Recebe um registro sem formatação (Exemplo: 1234) e retorna um registro formatado: 123.4
angular.module('filtros').filter('cpf', function (){
    return function (cpf) {
        if (cpf) {
            if (cpf.length == 11) {
                return cpf.substr(0, 3) + "." + cpf.substr(3, 3) + "." + cpf.substr(6, 3) + "-" + cpf.substr(9);
            }
        }
        return cpf;
    };
});

// Recebe uma img formatação  e retorna um img formatada
angular.module('filtros').filter('foto', function (){
    return function (foto) {
        if (foto.indexOf('.png')==-1&&foto.indexOf('.png')==-1) {
            return "<img src=''"+foto+"'>";
        }
        return foto;
    };
});

