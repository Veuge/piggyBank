$(document).ready(function(){
            
    $.get('../../serverSide/moduloGastos/restGasto.php').done(function(resultado){

        for(var i=0; i<resultado.length-1; ++i){
            var cadena = "<tr><td>"
            cadena += resultado[i].nombreGasto;
            cadena += "</td><td>";
            cadena += resultado[i].fechaGasto;
            cadena += "</td><td>";
            cadena += resultado[i].montoGasto;
            cadena += "</td></tr>";

            $("#result").append(cadena);
        }
        var total = "<tr class='success'><td colspan='2'><strong>Total</strong</td><td>";
        total += resultado[resultado.length-1].totalGasto;
        total += "</td></tr>";
        $("#total").append(total);
    });
    $('#stats').on('click', function(e){
        $('.tabla').hide();
        $('.grafica').show();

        $.get('../../serverSide/moduloGastos/restGraficas.php').done(function(arrayFechaTotal){
            var dia = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
            var labels = [];
            var values = [];
            if(arrayFechaTotal.length === 0) {
                labels = dia;
                values = [0,0,0,0,0,0,0];
                var stepWidth = 5;
            }
            else {
                var posicion_nueva = 6;
                var indice_actual;
                var valor_resta = 1;
                labels[posicion_nueva] = dia[arrayFechaTotal[arrayFechaTotal.length-1].indiceDia];
                values[posicion_nueva] = arrayFechaTotal[arrayFechaTotal.length-1].totalGasto;
                posicion_nueva --;
                for (var i = arrayFechaTotal.length - 1; i >= 0; i--) {
                    indice_actual = arrayFechaTotal[i].indiceDia;
                    indice_actual = indice_actual - valor_resta;
                    if(indice_actual < 0){
                        indice_actual = indice_actual + 7;
                    }
                    while (i - 1 < 0 || indice_actual > arrayFechaTotal[i-1].indiceDia) {
                        if(indice_actual < 0){
                            indice_actual = indice_actual + 7;
                        }
                        labels [posicion_nueva] = dia [indice_actual];
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
                    labels[posicion_nueva] = dia[arrayFechaTotal[i-1].indiceDia];
                    values[posicion_nueva] = arrayFechaTotal[i-1].totalGasto;
                    posicion_nueva--;
                }
                var max = funcionMayor(values);
                var stepWidth = Math.ceil(max/10);
            }
            $("canvas").each(function(i,el){
                $(el).attr({
                    "width":$(el).parent().width()
                });
            });
            // alert('Maximo: ' + max + ' tamaño de ceil: ' + stepWidth);
            var options = {
                scaleOverride: true,
                scaleSteps : 10,
                scaleStepWidth : stepWidth
            };
            var data = {
                labels : labels,
                datasets : [
                    {
                        fillColor : "rgba(230, 126, 34,0.4)",
                        strokeColor : "rgba(211, 84, 0 ,1)",
                        pointColor : "rgba(211, 84, 0 ,1)",
                        pointStrokeColor : "#fff",
                        data : values
                    }
                    
                ]
            }
            var canvas = document.getElementById("grafica_gasto");
            var ctx = canvas.getContext("2d");
            var myChart = new Chart(ctx).Line(data, options);
        });
    })
    $('#get-back').on('click', function(e){
        $('.tabla').show();
        $('.grafica').hide();
    });
});
var funcionMayor = function (vector) {
    var max = 0;
    for (var i = 0; i < vector.length; i++) {
        if (parseInt(vector[i]) > max) {
            max = parseInt(vector[i]);
        }
    }
    return max;
}