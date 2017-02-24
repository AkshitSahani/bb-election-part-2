var list = $('<li>');

var list2 = $('<li>');

var list3 = $('<li>');

var list4 = $('<li>');

var list5 = $('<li>');

var lists = [list, list2, list3, list4, list5];

$(document).ready(function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(data){


    for (var i = 0; i < data['candidates'].length; i++){

      var form = $('<form>').attr('method', 'POST').attr('action', 'https://bb-election-api.herokuapp.com/vote');

      var input1 = $('<input>').attr('type', 'submit').attr('value', 'Vote now!').attr('class','submit');

      var input2 = $('<input>').attr('type', 'hidden').attr('name', 'name');

      $(lists[i]).html('Name: ' + (data['candidates'][i]['name']) + ', Votes:' + (data['candidates'][i]['votes'])).append($(form).append(input1).append($(input2).attr('value', data['candidates'][i]['name'])));
    };


    for (var j = 0; j < lists.length; j++){
      $('#votes').append(lists[j]);
    }

    $('form').on('submit', function(e){
      e.preventDefault();
    })

    $('.submit').on('click', function(){
      $.ajax({
        url: 'https://bb-election-api.herokuapp.com/vote',
        method: 'POST',
        data: {'name': $(this).siblings('input[type=hidden]').val()}
      }
      ).done(function(){
        location.reload();
      });
    })

// to reload a page (location.reload())
    // $('.refresh').on('click', function(){
    //   location.reload();
    
  });
});
