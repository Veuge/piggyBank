$(document).ready(function(){
    $('#nueva_meta').on('click', funcionMostrar){

        
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
    $('#submit').on('click', function(e){
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
    });
    $('#volver').on('click', funcionVolver);
    
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