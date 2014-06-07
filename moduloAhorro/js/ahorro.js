$(document).ready(function(){
    $('#nueva_meta').on('click', function(e){

        $('#informacionAhorro').hide();
        $('#container_nm').hide();
        $('#formularioAhorro').show();
        // var cadena = '<br/><div class="box"><article class="info"><h3 class="title text-center">Ingresos</h3><dl class="dl-horizontal"><dt>Para que ahorras:</dt><dd>Para comprar un juguete</dd><dt>Cuanto necesitas:</dt><dd>250 Bs</dd><dt>Progreso:</dt><dd><section class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"><span class="sr-only">80% Complete</span></div></section></dd></dl><br/></article></div>';
        // $('#list').append(cadena);
    });
    $.get('restAhorro.php').done(function(resultado){
        for(var i = 0; i < resultado.length; ++ i) {
            var cad = '<p><strong>Hoy puedes ahorrar: </strong>';
            cad += resultado[i].montoAhorro;
            cad += ' Bs</p>';
            $("#appendAhorro").append(cad);
        }
    });
    $('#ahorra').on('click', function(e){
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
    });

    
});

// patrones de prueba