$(function(){
    $.ajax({
        url:'https://api.b7web.com.br/cinema/',
        type:'GET',
        dataType:'json',
        beforeSend:function(){
            $('.filmes').html('<div class="col-md-12">Carregando...</div>');
        },
        success:function(json){
            var html = '';
            for(var i in json){
                html += '<div class="col-md-4 h-100 w-100 "><div class="filme"><img class="rounded" src="'+json[i].avatar+'"/>'+'<strong class="text-danger">'+json[i].titulo+'</strong></div></div>';
            }
            $('.filmes').html(html);
        }
    });
});