$(document).ready(function(){ // cuando este listo el documento
    
    $.get('http://veuge_c.byethost8.com/moduloIngreso/rest.php').done(function(resultado){
        for(var i=0; i<resultado.length; ++i){
            var cadena = "<option value='"+resultado[i].codIngreso+"'>"+resultado[i].nombreIngreso+"</option>";
            //alert(cadena);
            $(".dropdown").append(cadena);
        }
    });
    $('.dropdown').on('change', funcionDropdown);
    $('#volver-form').on('click', funcionVolverFormulario);
    $('#submit').on('click', funcionGuardarIngreso);
    $('#volver').on('click', funcionVolverIngresos);
    $('#back-error').on('click', funcionVolverError);
});

var funcionGuardar = function(e){
    var nuevoIngreso = document.getElementById("ingreso1").value;
    // var valido = true;
    //VALIDACION PARA NUEVO TIPO DE INGRESO!
    if(nuevoIngreso === '') {
        $("#nuevo-tipo").addClass("has-error");
    }
    else{
        $.get('http://veuge_c.byethost8.com/moduloIngreso/rest.php').done(function(listaIngresos){
            var ingresoValido = true;
            for(var i = 0; i < listaIngresos.length; ++i) {
                if (nuevoIngreso === listaIngresos[i].nombreIngreso){
                    $('#personaje').show();
                    $('')
                    alert("Ya existe ese tipo de ingreso");
                    $("#nuevo-tipo").addClass("has-error");
                    ingresoValido = false;
                    $('#ingreso1').val('');
                    break;
                }
            }
            if (ingresoValido){
                $('#ingreso').empty();
                $('#ingreso').append('<option value="0">Seleccione tipo</option><option value="-1" class="new">Nuevo</option>');
                var JSONObjectIngreso = {
                    "nombreIngreso":  nuevoIngreso,
                    "descripcionIngreso": "esto es nuevo"
                };
                $.post("http://veuge_c.byethost8.com/moduloIngreso/restIngreso.php", JSONObjectIngreso).done(function(datos){
                    $.get('http://veuge_c.byethost8.com/moduloIngreso/rest.php').done(function(resultado){
                        for(var i=0; i<resultado.length; ++i){
                            var cadena = "<option value='"+resultado[i].codIngreso+"'>"+resultado[i].nombreIngreso+"</option>";
                            $("#ingreso").append(cadena);
                        }
                    }).error(function(){alert("POR QUE SIGUES MAL!!!???")});
                    
                    $('#ingreso').show();
                    $('.form-group').show();
                    $('#nuevo-tipo').hide();
                }).error(function(){alert("POR QUE SIGUES MAL!!!???")});
            }
        });
    }
};

var funcionGuardarIngreso = function (e) { //captura evento click a boton submit
    var ingreso = document.getElementById("ingreso").value; //var ingreso igual al valor de input ingreso
    var monto = document.getElementById("monto").value; //var monto igual al valor de input monto
    var fecha = document.getElementById("date").value; //var fecha igual al valor de input fecha
    //validar valores vacios
    if (ingreso === '0' || ingreso === '-1') {
        seleccionError(1);
        $('.type').addClass('has-error');
        $('#animar').addClass('animated shake');
        $('#personaje').show();
        $('#ingreso-form').hide();
    }
    if(monto === ''){
        seleccionError(2);
        $('.mont').addClass('has-error');
        $('#animar').addClass('animated shake');
        $('#personaje').show();
        $('#ingreso-form').hide();
    }
    if(fecha === ''){
        seleccionError(3);
        $('.fech').addClass('has-error');
        $('#animar').addClass('animated shake');
        $('#personaje').show();
        $('#ingreso-form').hide();
    }
    if (ingreso !== '0' && ingreso !== '-1' && monto !== '' && fecha !== ''){
        $('.type').removeClass('has-error');
        $('.mont').removeClass('has-error');
        $('.fech').removeClass('has-error');
        var cadena = "<tr><td>";
        cadena += ingreso;
        cadena += "</td><td>";
        cadena += monto;
        cadena += "</td><td>";
        cadena += fecha;
        cadena += "</td></tr>";
        //alert(cadena);
        var JSONObject= { // objeto JSON con valores de inputs
            "tipoIngreso":ingreso,
            "montoIngreso":monto,
            "fechaIngreso": fecha
        };
        $.post("http://veuge_c.byethost8.com/moduloIngreso/rest.php", JSONObject).done(function( data ) { //AJAX con jquery envia a rest.php objeto JSON
            window.location="ingresos.html"; //show = cadena de objeto JSON
        }).error(function(){alert("error!!!")}); //en caso de error muestra mensaje
    }
    else{
        // alert('Errores en el formulario marcados con rojo');
    }
};
var funcionDropdown = function (e) {
    var a = this.options[this.selectedIndex].value;
    if(a === '-1'){
        $(this).hide(); //esconde dropdown
        $('.form-group').hide(); //esconde formulario
        $('#nuevo-tipo').show(); //muestra form nuevo tipo de ingreso
        $('#guardar').on('click', funcionGuardar);
    }
};
var funcionVolverFormulario = function(e){
    $('#ingreso').show();
    $('.form-group').show();
    $('#nuevo-tipo').hide();
};
var funcionVolverIngresos = function (e){
    window.location="ingresos.html";
};
var funcionVolverError = function (e){
    $('#personaje').hide();
    $('#ingreso-form').show();
    $('.sacar' ).remove();
};
var seleccionError = function(cod){
    if(cod === 1){
        var error = "<p class='sacar'>&#42; No seleccionaste el tipo de ingreso</p>";
        $('.mens-error').append(error);
    }
    else if(cod === 2){
        var error = "<p class='sacar'>&#42; No escribiste el monto de ingreso</p>";
        $('.mens-error').append(error);
    }
    else if(cod === 3){
        var error = "<p class='sacar'>&#42; No seleccionaste una fecha</p>";
        $('.mens-error').append(error);
    }
    else if(cod === 4){
        var error = "<p class='sacar'>&#42; No escribiste un nuevo tipo de ingreso</p>";
        $('.mens-error').append(error);
    }
}