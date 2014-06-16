$(document).ready(function(){
    $('#a_ingreso').on('click', function(e){
        window.location="moduloIngreso/ingresos.html";
    });
    $('#a_gasto').on('click', function(e){
        window.location="moduloGastos/gastos.html";
    });
    $('#a_ahorro').on('click', function(e){
        window.location="moduloAhorro/ahorro.html";
    });
    $('#back-error').on('click', funcionVacio);
    $('#grafica_ig').on('click', function(e){
        $('#nav').show();
        $('#titulo').hide();
        $('#menu').hide();
        $('#botones').hide();
        $('.grafica').show();

        $.get('http://veuge_c.byethost8.com/restGraficasIngreso.php').done(function(vectorDeIngresos){
            $.get('http://veuge_c.byethost8.com/restGraficasGasto.php').done(function(vectorDeGastos){
                var labels;
                var labelsIngreso, labelsGasto, valuesIngreso, valuesGasto;
                var ultimoIngreso, ultimoGasto;
                var stepWidth;
                if(vectorDeIngresos.length === 0){
                    valuesIngreso = [0,0,0,0,0,0,0];
                    labelsIngreso = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
                    ultimoIngreso = -1;
                }
                else {
                    valuesIngreso = funcionValues(vectorDeIngresos, 'ingreso');
                    labelsIngreso = funcionLabel(vectorDeIngresos);
                    ultimoIngreso = Date.parse(vectorDeIngresos[vectorDeIngresos.length-1].fechaIngreso);
                }
                if(vectorDeGastos.length === 0) {
                    valuesGasto = [0,0,0,0,0,0,0];
                    labelsGasto = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
                    ultimoGasto = -1;
                }
                else {
                    valuesGasto = funcionValues(vectorDeGastos, 'gasto');
                    labelsGasto = funcionLabel(vectorDeGastos);
                    ultimoGasto = Date.parse(vectorDeGastos[vectorDeGastos.length-1].fechaGasto);
                }
                if(vectorDeIngresos.length === 0 && vectorDeGastos.length === 0){
                    stepWidth = 5;
                    labels = labelsIngreso;
                    funcionGraficar(stepWidth, labels, valuesIngreso, valuesGasto);
                    $('#personaje').show();
                    $('#animar').addClass("animated shake");
                    $('.grafica').hide();
                }
                else if(vectorDeIngresos.length != 0 || vectorDeGastos.length != 0) {
                    var diferenciaFechas = ultimoIngreso - ultimoGasto;
                    var aDias = diferenciaFechas / 86400000;
                    if(aDias != 0) {
                        if(aDias > 0) {
                            labels = labelsIngreso;
                            valuesGasto = reformularVector(valuesGasto, aDias);
                        }
                        else if(aDias < 0){
                            labels = labelsGasto;
                            aDias = Math.abs(aDias);
                            valuesIngreso = reformularVector(valuesIngreso, aDias);
                        }
                    }
                    labels = labelsIngreso;
                    var maxI = funcionMayor(valuesIngreso);
                    var maxG = funcionMayor(valuesGasto);
                    $("canvas").each(function(i,el){
                        $(el).attr({
                            "width":$(el).parent().width(),
                            "height":$(el).parent().outerHeight()
                        });
                    });
                    if (maxI > maxG) {
                        var max = maxI;
                    }
                    else {
                        var max = maxG;
                    }
                    stepWidth = Math.ceil(max/10);
                    funcionGraficar(stepWidth, labels, valuesIngreso, valuesGasto);                                    
                }
            });
        });
    });
    $('#volver').on('click', function(e){
        $('#titulo').show();
        $('#menu').show();
        $('#botones').show();
        $('.grafica').hide();
        $('#nav').hide();
    });
});

var funcionLabel = function (vectorDeObjetos) {
    var dia = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    var labels = [];
    var posicion_nueva = 6;
    var indice_actual;
    var valor_resta = 1;
    labels[posicion_nueva] = dia[vectorDeObjetos[vectorDeObjetos.length-1].indiceDia];
    posicion_nueva --;
    for (var i = vectorDeObjetos.length - 1; i >= 0; i--) {
        indice_actual = vectorDeObjetos[i].indiceDia;
        indice_actual = indice_actual - valor_resta;
        if(indice_actual < 0){
            indice_actual = indice_actual + 7;
        }
        while (i - 1 < 0 || indice_actual > vectorDeObjetos[i-1].indiceDia) {
            if(indice_actual < 0){
                indice_actual = indice_actual + 7;
            }
            labels [posicion_nueva] = dia [indice_actual];
            posicion_nueva --;
            if (posicion_nueva < 0) {
                break;
            }
            indice_actual = indice_actual - valor_resta;
        }
        if(posicion_nueva < 0) {
            break;
        }
        labels[posicion_nueva] = dia[vectorDeObjetos[i-1].indiceDia];
        posicion_nueva--;
    }
    return labels;
};

var funcionValues = function (vectorDeObjetos, cad) {
    var values = [];
    var posicion_nueva = 6;
    var indice_actual;
    var valor_resta = 1;
    
    if(cad === 'ingreso'){
        values[posicion_nueva] = vectorDeObjetos[vectorDeObjetos.length-1].totalIngreso;
    }
    else if(cad === 'gasto'){
        values[posicion_nueva] = vectorDeObjetos[vectorDeObjetos.length-1].totalGasto;
    }
    posicion_nueva --;
    for (var i = vectorDeObjetos.length - 1; i >= 0; i--) {
        indice_actual = vectorDeObjetos[i].indiceDia;
        indice_actual = indice_actual - valor_resta;
        if(indice_actual < 0){
            indice_actual = indice_actual + 7;
        }
        while (i - 1 < 0 || indice_actual > vectorDeObjetos[i-1].indiceDia) {
            if(indice_actual < 0){
                indice_actual = indice_actual + 7;
            }
            values [posicion_nueva] = 0;
            posicion_nueva --;
            if (posicion_nueva < 0) {
                break;
            }
            indice_actual = indice_actual - valor_resta;
        }
        if(posicion_nueva < 0) {
            break;
        }
        if(cad === 'ingreso')
            values[posicion_nueva] = vectorDeObjetos[i-1].totalIngreso;
        else
            values[posicion_nueva] = vectorDeObjetos[i-1].totalGasto;
        posicion_nueva--;
    }
    return values;
};

var reformularVector = function (vector, indice) {
    var nuevoVector = [];
    var ayuda = vector.length-1;
    for(var i = 6; i > 6 - indice; i --) {
        nuevoVector[i] = 0;
    }
    for(var j = 6 - indice; j >= 0; j --) {
        nuevoVector[j] = vector[ayuda];
        ayuda --;
    }
    return nuevoVector;
};
var funcionMayor = function (vector) {
    var max = 0;

    for (var i = 0; i < vector.length; i++) {
        if (parseInt(vector[i]) > max) {
            max = parseInt(vector[i]);
        }
    }
    return max;
};
var funcionGraficar = function (stepWidth, labels, valuesIngreso, valuesGasto) {
    $("canvas").each(function(i,el){
        $(el).attr({
            "width":$(el).parent().width(),
            "height":$(el).parent().outerHeight()
        });
    });
    var options = {
        scaleOverride: true,
        scaleSteps : 10,
        scaleStepWidth : stepWidth
    };
    var data = {
        labels : labels,
        datasets : [
        {
            fillColor : "rgba(168, 211, 36,0.4)",
            strokeColor : "rgba(102, 153, 0, 1)",
            pointColor : "rgba(102, 153, 0, 1)",
            pointStrokeColor : "#fff",
            data : valuesIngreso
        },
        {
            fillColor : "rgba(230, 126, 34,0.4)",
            strokeColor : "rgba(211, 84, 0 ,1)",
            pointColor : "rgba(211, 84, 0 ,1)",
            pointStrokeColor : "#fff",
            data : valuesGasto
        }
        ]
    }
    var ctx = document.getElementById("grafica_combinada").getContext("2d");
    var myNewChart = new Chart(ctx).Line(data, options); 
};
var funcionVacio = function(e){
    $('#titulo').show();
    $('#personaje').hide();
    $('#animar').removeClass("animated shake");
    $('#menu').show();
    $('#botones').show();
    $('.grafica').hide();
    $('#nav').hide();
}