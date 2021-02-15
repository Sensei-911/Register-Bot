module.exports = {
name: 'ping',
aliases: ['gecikme_süresi'],
execute(client, message, args) {
message.channel.send('Ping hesaplanıyor...').then(msg => {
var ping = msg.createdTimestamp - message.createdTimestamp
msg.edit(`${ping}ms`); 

})}}