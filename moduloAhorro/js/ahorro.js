$(document).ready(function(){
    $('#nueva_meta').on('click', funcionMostrar);
    $('#ahorra').on('click', funcionAhorrar);
    $('#submit').on('click', funcionNuevaMeta);
    $('#volver').on('click', funcionVolver);

    // OBTENER MONTO DE AHORRO (arreglar)
    $.get('restAhorro.php').done(function(resultado){
        for(var i = 0; i < resultado.length; ++ i) {
            var cad = '<p><strong>Hoy puedes ahorrar: </strong>';
            cad += resultado[i].montoAhorro;
            cad += ' Bs</p>';
            $("#appendAhorro").append(cad);
        }
    });
    
    // OBTENER METAS DE AHORRO
    $.get('restMeta.php').done(function(data){
        for(var i = 0; i < data.length; ++ i){
            var cadena = '<div class="box"><article class="info"><dl class="dl-horizontal"><dt>Para que ahorras:</dt><dd>'
            cadena += data[i].descripcionma + '</dd><dt>Cuanto necesitas:</dt><dd>'
            cadena += data[i].montoma + ' Bs</dd><dt>Progreso:</dt><dd><section class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"><span class="sr-only">80% Complete</span></div></section></dd></dl></article></div><br/>'
            $('#sectorMetas').append(cadena);
        }
    });
});

// patrones de prueba
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
    $.get('restAhorro.php').done(function(resultado){
        var JSONObject= { // objeto JSON con valores de inputs
            "montoAhorro":resultado[0].montoAhorro
        };
        $.post("restAhorro.php", JSONObject).done(function(data) { //AJAX con jquery envia a rest.php objeto JSON
            alert(JSON.stringify (JSONObject));
        }).error(function(){alert("error!!!")});
    });
    var cad = '<p><strong>Felicidades!!! ya ahorraste hoy</strong>';
    $("#appendAhorro").append(cad);
}
var funcionNuevaMeta = function(e){
    var paraque = document.getElementById("descripcion_ma").value;
    var monto_ma = document.getElementById("monto").value;
    var JSONObjectMeta = {
        usuario: 1,
        paraque: paraque,
        monto: monto_ma
    }
    $.post('restMeta.php', JSONObjectMeta).done(function(data){
        alert(JSON.stringify(data));
        funcionVolver();
    }).error(function(){alert("error!!!")});
}