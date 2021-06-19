let pegarResultado = document.getElementById('buscadorGif');
let tempoFim = null;
let resultado = '';
let html = '';
var todosGifs = [];

//! FUNÇÃO ASSINCRONA
function httpGetAsync(theUrl, callback)
{
    //? Cria o objeto de solicitação 
    var xmlHttp = new XMLHttpRequest();

    //? Defina o retorno de chamada de mudança de estado para capturar quando a resposta chegar
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    //? Abra como uma chamada GET, passe o url e defina async = True
    xmlHttp.open("GET", theUrl, true);

    //? Chamada enviada sem parâmetros conforme foram passados na string do url
    xmlHttp.send(null);

    return;
}
//! Retorno de chamada para os 8 principais GIFs de pesquisa
function tenorCallback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    todosGifs = response_objects["results"];
    
    for(let i in todosGifs){
        html += '<div class="col-md-4 h-100 w-100"><div class="gif"><img class="rounded" src="'+todosGifs[i]["media"][0]["nanogif"]["url"]+'"/></div></div>';
    }
    $('.gifs').html(html);
    return;

}
//! FUNCÇÃO PARA BUSCAR O TERMO DIGITADO + APIKEY
function retornarGifs(resultado){
    let apiKey = '4HCLV7HQ0799';
    let limite = 30;

    let buscarDigitado = resultado;
    
    let pesquisarUrl = "https://g.tenor.com/v1/search?q=" + buscarDigitado + "&key=" +apiKey + "&limit=" + limite;

    httpGetAsync(pesquisarUrl, tenorCallback_search);
    return;

}

//? FUNÇÃO PARA DAR UM TEMPO PARA DEPOIS PEGAR O TERMO DIGITADO
function verificarResultado(){
    pegarResultado.addEventListener('keyup', function(e){
        clearTimeout(tempoFim);
        tempoFim = setTimeout(function(){
            if(pegarResultado === '' || pegarResultado.length === 0){
                return;
            }else{
                resultado = pegarResultado.value;
                resultadoDigitado(resultado);
            }
        }, 1000);
    });
    
}

//! FUNÇÃO PARA VALIDAR O TERMO DIGITADO, PARA VER SE O MESMO NÃO ESTÁ NULO 
function resultadoDigitado(resultado){
    if(resultado === ''){
        limparResultado(resultado);
        verificarResultado()
    }else{
        resultado = resultado;
        retornarGifs(resultado);
        limparResultado();
    }

}

//! FUNÇÃO PARA ZERAR A BUSCA JÁ FEITO, PARA DEPOIS PESQUISAR A NOVA BUSCA 
function limparResultado(resultado){
    if (resultado === ''){
        verificarResultado();
    }else{
        html = '';
    }
    
}

verificarResultado();