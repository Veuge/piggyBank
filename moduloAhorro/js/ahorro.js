$(document).ready(function(){
    funcionObtenerMetas();
    $('#nueva_meta').on('click', funcionMostrar);
    $('#ahorra').on('click', funcionAhorrar);
    $('#submit').on('click', funcionNuevaMeta);
    $('#volver').on('click', funcionVolver);

    // OBTENER MONTO DE AHORRO (arreglar)
    $.get('../../serverSide/moduloAhorro/restAhorro.php').done(function(resultado){
        for(var i = 0; i < resultado.length - 1; ++ i) {
            var cad = '<p><strong>Hoy puedes ahorrar: </strong>';
            cad += resultado[i].montoAhorro;
            cad += ' Bs</p>';
            $("#appendAhorro").append(cad);
        }
    });
});

var funcionMostrar = function(e){
    $('#informacionAhorro').hide();
    $('#container_nm').hide();
    $('#formularioAhorro').show();
}
var funcionVolver = function(e){
    $('#informacionAhorro').show();
    $('#container_nm').show();
    $('#formularioAhorro').hide();
}
var funcionAhorrar = function(e){
    alert("Pon el dinero en tu alcancia tambien!");
    $.get('../../serverSide/moduloAhorro/restAhorro.php').done(function(resultado){
        var JSONObject= { // objeto JSON con valores de inputs
            "montoAhorro":resultado[0].montoAhorro
        };
        $.post("../../serverSide/moduloAhorro/restAhorro.php", JSONObject).done(function(data) { //AJAX con jquery envia a rest.php objeto JSON
            alert(JSON.stringify (JSONObject));
        }).error(function(){alert("error!!!")});
    });
    var cad = '<p><strong>Felicidades!!! ya ahorraste hoy</strong>';
    $('#appendAhorro').empty();
    $("#appendAhorro").append(cad);
    $('#sectorMetas').empty();
    funcionObtenerMetas();
}
var funcionNuevaMeta = function(e){
    var paraque = document.getElementById("descripcion_ma").value;
    var monto_ma = document.getElementById("monto").value;
    var JSONObjectMeta = {
        usuario: 1,
        paraque: paraque,
        monto: monto_ma
    }
    $.post('../../serverSide/moduloAhorro/restMeta.php', JSONObjectMeta).done(function(data){
        alert(JSON.stringify(data));
        funcionVolver();
    }).error(function(){alert("error!!!")});
}
var funcionObtenerMetas = function(){
    $.get('../../serverSide/moduloAhorro/restMeta.php').done(function(data){
        $.get('../../serverSide/moduloAhorro/restAhorro.php').done(function(resultado){
            var totalA = parseInt(resultado[resultado.length - 1].totalAhorro);
            var porcentaje, claseP;
            for(var i = 0; i < data.length; ++ i){
                if (totalA < data[i].montoma){
                    porcentaje = totalA * 100 / parseInt(data[i].montoma);
                }
                else {
                    porcentaje = 100;
                }
                if(porcentaje <= 25)
                    claseP = 'danger';
                else if (porcentaje > 25 && porcentaje <= 50)
                    claseP = 'warning';
                else if (porcentaje > 50 && porcentaje <= 75)
                    claseP = 'info';
                else if (porcentaje > 75 && porcentaje <= 100)
                    claseP = 'success';

                var cadena = '<div class="box"><article class="info"><dl class="dl-horizontal"><dt>Para que ahorras:</dt><dd>'
                cadena += data[i].descripcionma + '</dd><dt>Cuanto necesitas:</dt><dd>'
                cadena += data[i].montoma + ' Bs</dd><dt>Progreso:</dt><dd><section class="progress"><div class="progress-bar progress-bar-';
                cadena += claseP + '" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: '
                cadena += porcentaje + '% ;"><span class="sr-only">80% Complete</span></div></section></dd></dl></article></div><br/>'
                $('#sectorMetas').append(cadena);
                porcentaje = 0;
            }
        });
    });
};