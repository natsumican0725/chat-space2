$(function(){
  function buildHTML(message){
    var content = message.content? `<p class="lower-message__content">
                    ${message.content}
                  </p>` : "";


    var image = message.image? `<img src="${message.image}" class="lower-message__image">` : "";

    var html = `<div class="message" data-message-id="${message.id}">
                 <div class="upper-message">
                   <div class="upper-message__user-name">
                     ${message.user_name}
                   </div>
                   <div class="upper-message__date">
                     ${message.date}
                   </div>
                 </div>
                 <div class="lower-meesage">
                  ${content}
                  ${image}
                 </div>
                </div>`
    return html;
  }
  function scrollBottom(){
    $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'slow')
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
	.done(function(data){
	  var html = buildHTML(data);
	  $('.messages').append(html)
    $('.form__message').val('')
    $('.hidden').val('');
    scrollBottom();
	})
	.fail(function(){
      alert('error');
    })
    .always(function(){
   	  $('.form__submit').prop('disabled', false);
   	})
  });

    var interval = setInterval(update, 3000);
   function update(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var message_id = $('.message').last().data('message-id');
      $.ajax({
        url: location.href,
        type: "GET",
        data: {message: message_id },
        dataType: 'json'
      })
      .done(function(json) {
        var insertHTML ='';
        json.messages.forEach(function(message){
          console.log(message)
          if( message.id  > message_id ){
            insertHTML += buildHTML(message);
            $('.messages').append(insertHTML);
            scrollBottom();
          }
        });
      })
      .fail(function(json) {
        alert('自動更新に失敗しました');
      });
   } else {
    clearInterval(interval);
   }
  }
});
