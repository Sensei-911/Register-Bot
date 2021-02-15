/*
Bu proje exsus ve nymphdora sunucuları için özel olarak Sensei tarafından hazırlanmıştır!
Bu proje MIT lisansı ile korunuyor ve izinsiz paylaşılması yasaktır!
Bu proje kodun daha açıklayıcı olması için bir çok yorum eklenerek yazılmıştır!
*/

const { Discord, MessageEmbed } = require('discord.js')

module.exports = {
name: 'uptime',
aliases: ['çalışma_süresi'],
execute(client, message, args) {
const uptime = {
gün: Math.floor(client.uptime / 86400000),
saat: Math.floor(client.uptime / 3600000) % 24,
dakika: Math.floor(client.uptime / 60000) % 60,
saniye: Math.floor(client.uptime / 1000) % 60,
}
const uptime_embed = new MessageEmbed()
.setDescription(`${uptime.gün} gün ${uptime.saat} saat ${uptime.dakika} dakika ${uptime.saniye} saniye`)
.setColor('#00FFFF') //cyan o_o
message.channel.send(uptime_embed);
}}
