json.messages @messages.each do |message|
  json.content  message.content
  json.user_name  message.user.name
  json.image  message.image.url
  json.date  message.created_at.to_s(:datetime)
  json.id  message.id
end
