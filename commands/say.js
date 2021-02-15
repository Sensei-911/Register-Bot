const { Discord, MessageEmbed } = require('discord.js')
module.exports = {
name: 'say',
aliases: ['sayım', 'istatistik'],
cooldown:2,
execute(client, message, args, options){   

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Çeşitli şeyler için verilermizi oluşturuyoruz...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const sunucu = client.guilds.cache.get(options.sunucu_id)

//Kaç kişinin sesli kanallarda olduğunu hesaplıyoruz...

const voiceChannels = sunucu.channels.cache.filter(kanal => kanal.type === 'voice');
var seslidekiler = 0;
for (const [id, voiceChannel] of voiceChannels) seslidekiler += voiceChannel.members.size

//Kaç kişinin sizin tagınızı aldığını hesaplıyoruz...

var tagdakiler = 0;
sunucu.members.cache.forEach(member => {
if(member.user.username.includes(options.sunucu_tag)) {
tagdakiler = tagdakiler + 1 }})

//Aktif üye (durumu offline olmayan kişiler) sayısını buluyoruz...

const aktif_üyeler = sunucu.members.cache.filter(m => m.presence.status !== 'offline').size

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Embedimizi oluşturup kanala mesaj gönderiyoruz...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const say_embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL())
.setColor('#00FFFF') //cyan o_o
.setDescription(`Sunucumuzda toplam **${sunucu.memberCount} üye** bulunmakta.\n\nToplam **${aktif_üyeler} kişi aktif** ve **tagdaki kişi sayısı ${tagdakiler}**\n\n**Ses kanallarında** toplam **${seslidekiler} üye** bulunmakta.\n\nSunucuda toplam **${sunucu.premiumSubscriptionCount} boost** bulunuyor.`)
.setFooter(`Komut ${message.author.username} tarafından kullanıldı.`)
.setTimestamp()
message.channel.send(say_embed)

}}