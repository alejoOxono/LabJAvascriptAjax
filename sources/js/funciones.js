const palindromoInput   = document.getElementById('entradaPalindromo');
const botonMayor        = document.getElementById('botonMayor');
const vocales           = document.getElementById('entradaVocales');
const conteoVocales     = document.getElementById('entradaContarVocales');
const botonUrl          = document.getElementById('botonUrl');
var http_request        = false;


palindromoInput.addEventListener('input', palindromo);
botonMayor.addEventListener('click', mayor);
vocales.addEventListener('input', filtrarVocales);
conteoVocales.addEventListener('input', contarVocales);
botonUrl.addEventListener('click', descargar);

document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault();
    document.getElementById('url').value = window.location.href;

});

function palindromo () {
    var longitud = palindromoInput.value.length;
    if (longitud === 0 || longitud === 1) {
        var resultado = document.getElementById('palindromoRespuesta');
        resultado.textContent = '';
        return;
    }
    var texto = palindromoInput.value.toLowerCase().replace(/[^a-z]/g, '');
    var esPalindromo = texto === texto.split('').reverse().join('');
    var resultado = document.getElementById('palindromoRespuesta');
    resultado.textContent = esPalindromo ? 'Es palíndromo' : 'No es palíndromo';
}

function mayor () {
    const mayorUnoInput = parseInt(document.getElementById('entradaUnoMayor').value);
    const mayorDosInput = parseInt(document.getElementById('entradaDosMayor').value);

    var mayor = Math.max(mayorUnoInput, mayorDosInput);
    var resultado = document.getElementById('mayorRespuesta');
    resultado.textContent = 'El mayor es: ' + mayor;
}

function filtrarVocales () {
    var vocalesFiltradas = vocales.value.toLowerCase().replace(/[^aeiou]/g, '');
    var resultado = document.getElementById('vocalesRespuesta');
    resultado.textContent = vocalesFiltradas;
}

function contarVocales () {
    var texto = conteoVocales.value.toLowerCase().split("");
    for (letra of texto) {
        switch (letra) {
            case 'a':
                var a = conteoVocales.value.toLowerCase().replace(/[^a]/g, '').length;
                var resultadoA = document.getElementById('contarVocalesRespuestaA');
                resultadoA.textContent = "La cantidad de a en el texto es de : " + a;
                break;
            case 'e':
                var e = conteoVocales.value.toLowerCase().replace(/[^e]/g, '').length;
                var resultadoE = document.getElementById('contarVocalesRespuestaE');
                resultadoE.textContent = "La cantidad de e en el texto es de : " + e;
                break;
            case 'i':
                var i = conteoVocales.value.toLowerCase().replace(/[^i]/g, '').length;
                var resultadoI = document.getElementById('contarVocalesRespuestaI');
                resultadoI.textContent = "La cantidad de i en el texto es de : " + i;
                break;
            case 'o':
                var o = conteoVocales.value.toLowerCase().replace(/[^o]/g, '').length;
                var resultadoO = document.getElementById('contarVocalesRespuestaO');
                resultadoO.textContent = "La cantidad de o en el texto es de : " + o;
                break;
            case 'u':
                var u = conteoVocales.value.toLowerCase().replace(/[^u]/g, '').length;
                var resultadoU = document.getElementById('contarVocalesRespuestaU');
                resultadoU.textContent = "La cantidad de u en el texto es de : " + u;
                break;
        } 
    }
}

function descargar () {
    const url   = document.getElementById('entradaUrl').value;   
    http_request= false;

    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        document.getElementById('respuestaUrl').textContent = 'Falla :( No es posible crear una instancia XMLHTTP';
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.onload = cabecera;
    http_request.open('GET', url, true);
    http_request.send();
}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            document.getElementById('estadoUrl').textContent = 'Estado: Completada';
            alert(http_request.responseText);
        } else if (http_request.status == 404) {
            document.getElementById('estadoUrl').textContent = 'Estado: No se encontró el archivo.';
        } else if (http_request.status == 301) {
            document.getElementById('estadoUrl').textContent = 'Estado: El archivo se ha movido permanentemente.';
        } else if (http_request.status == 302) {
            document.getElementById('estadoUrl').textContent = 'Estado: El archivo se ha movido temporalmente.';
        } else if (http_request.status == 500) {
            document.getElementById('estadoUrl').textContent = 'Estado: Error interno en el servidor.';
        } else if (http_request.status == 503) {
            document.getElementById('estadoUrl').textContent = 'Estado: El servidor no está disponible.';
        } else if (http_request.status == 504) {
            document.getElementById('estadoUrl').textContent = 'Estado: El tiempo de espera ha expirado.';
        } else if (http_request.status == 505) {
            document.getElementById('estadoUrl').textContent = 'Estado: La versión HTTP no está soportada.';
        } else if (http_request.status == 0) {
            document.getElementById('estadoUrl').textContent = 'Estado: No se pudo establecer la conexión.';
        } else {
            document.getElementById('estadoUrl').textContent = 'Estado: Hubo problemas con la petición.';
        }
    }
}

function cabecera() {
    const headers = http_request.getAllResponseHeaders();
    document.getElementById('cabeceraUrl').textContent = "Cabecera: " + headers;
}
