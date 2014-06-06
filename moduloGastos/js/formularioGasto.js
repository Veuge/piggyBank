$(document).ready(function(){ // cuando este listo el documento
    
    $.get('rest.php').done(function(resultado){
        for(var i=0; i<resultado.length; ++i){
            var cadena = "<option value='"+resultado[i].codGasto+"'>"+resultado[i].nombreGasto+"</option>";
            //alert(cadena);
            $(".dropdown").append(cadena);
        }
    });
    $('.dropdown').on('change', funcionDropdown);
    $('#volver-form').on('click', funcionVolverFormulario);
    $('#submit').on('click', funcionGuardarIngreso);
    $('#volver').on('click', funcionVolverIngresos);
});

var funcionGuardar = function(e){
    var nuevoGasto = document.getElementById("gasto1").value;
    // var valido = true;
    //VALIDACION PARA NUEVO TIPO DE INGRESO!
    if(nuevoGasto === '') {
        $("#nuevo-tipo").addClass("has-error");
        alert("No puede ser vacio");
        // valido = false;
    }
    else{
        $.get('rest.php').done(function(listaGastos){
            var gastoValido = true;
            for(var i = 0; i < listaGastos.length; ++i) {
                if (nuevoGasto === listaGastos[i].nombreGasto){
                    alert("Ya existe ese tipo de gasto");
                    $("#nuevo-tipo").addClass("has-error");
                    gastoValido = false;
                    $('#gasto1').val('');
                    break;
                }
            }
            if (gastoValido){
                $('#gasto').empty();
                $('#gasto').append('<option value="0">Seleccione tipo</option><option value="-1" class="new">Nuevo</option>');
                var JSONObjectGasto = {
                    "nombreGasto":  nuevoGasto,
                    "descripcionGasto": "esto es nuevo"
                };
                $.post("restGasto.php", JSONObjectGasto).done(function(datos){
                    $.get('rest.php').done(function(resultado){
                        for(var i=0; i<resultado.length; ++i){
                            var cadena = "<option value='"+resultado[i].codGasto+"'>"+resultado[i].nombreGasto+"</option>";
                            $("#gasto").append(cadena);
                        }
                    }).error(function(){alert("POR QUE SIGUES MAL!!!???")});
                    $('#gasto').show();
                    $('.form-group').show();
                    $('#nuevo-tipo').hide();
                }).error(function(){alert("POR QUE SIGUES MAL!!!???")});
            }
        });
    }
};

var funcionGuardarIngreso = function (e) { //captura evento click a boton submit
    var gasto = document.getElementById("gasto").value; //var ingreso igual al valor de input ingreso
    var monto = document.getElementById("monto").value; //var monto igual al valor de input monto
    var fecha = document.getElementById("date").value; //var fecha igual al valor de input fecha
    //validar valores vacios
    if (gasto === '0' || gasto === '-1') {
        //alert("No selecciono un tipo de ingreso!");
        $('.type').addClass('has-error');
    }
    if(monto === ''){
        //alert("No ingreso el monto del ingreso");
        $('.mont').addClass('has-error');
    }
    if(fecha === ''){
        //alert("No selecciono una fecha");
        $('.fech').addClass('has-error');
    }
    if (gasto !== '0' && gasto !== '-1' && monto !== '' && fecha !== ''){
        $('.type').removeClass('has-error');
        $('.mont').removeClass('has-error');
        $('.fech').removeClass('has-error');
        var cadena = "<tr><td>";
        cadena += gasto;
        cadena += "</td><td>";
        cadena += monto;
        cadena += "</td><td>";
        cadena += fecha;
        cadena += "</td></tr>";
        //alert(cadena);
        var JSONObject= { // objeto JSON con valores de inputs
            "tipoGasto":gasto,
            "montoGasto":monto,
            "fechaGasto": fecha
        };
        $.post("rest.php", JSONObject).done(function( data ) { //AJAX con jquery envia a rest.php objeto JSON
            window.location="gastos.html";
            var show = JSON.stringify (data); //show = cadena de objeto JSON
        }).error(function(){alert("error!!!")}); //en caso de error muestra mensaje
    }
    else{
        alert('Errores en el formulario marcados con rojo');
    }
};
var funcionDropdown = function (e) {
    var a = this.options[this.selectedIndex].value;
    if(a === '-1'){
        $(this).hide(); //esconde dropdown
        $('.form-group').hide(); //esconde formularioh
        $('#nuevo-tipo').show(); //muestra form nuevo hhhhhtipo de ingreso
        $('#guardar').on('click', funcionGuardar);
    }
};
var funcionVolverFormulario = function(e){
    $('#gasto').show();
    $('.form-group').show();
    $('#nuevo-tipo').hide();
};
var funcionVolverIngresos = function (e){
    window.location="gastos.html";
};