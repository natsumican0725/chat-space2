$(function(){
  function buildHTML(message){
    message.content? content = `<p class="lower-message__content">
                    ${message.content}
                  </p>` : content = " "


    message.image? image = `<img src="${message.image}" class="lower-message__image">` : image = " "
      image = `<img src="${message.image}" class="lower-message__image">`

    var html = `<div class="message">
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
	})
	.fail(function(){
      alert('error');
    })
  })
})

