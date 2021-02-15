/*
Bu proje exsus ve nymphdora sunucuları için özel olarak Sensei tarafından hazırlanmıştır!
Bu proje MIT lisansı ile korunuyor ve izinsiz paylaşılması yasaktır!
Bu proje kodun daha açıklayıcı olması için bir çok yorum eklenerek yazılmıştır!
*/

module.exports = {
name: 'ping',
aliases: ['gecikme_süresi'],
execute(client, message, args) {
message.channel.send('Ping hesaplanıyor...').then(msg => {
var ping = msg.createdTimestamp - message.createdTimestamp
msg.edit(`${ping}ms`); 

})}}
