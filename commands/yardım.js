/*
Bu proje exsus ve nymphdora sunucuları için özel olarak Sensei tarafından hazırlanmıştır!
Bu proje MIT lisansı ile korunuyor ve izinsiz paylaşılması yasaktır!
Bu proje kodun daha açıklayıcı olması için bir çok yorum eklenerek yazılmıştır!
*/

const { Discord, MessageEmbed } = require('discord.js');
 
module.exports = {
name: 'help',
execute(client, message, args) {
 
/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gösterilecek sayfaları tanımlıyoruz her 'array' bir sayfa (sayfalar embedin 'description' kısmına geliyor)...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

let pages = 
[
`\`\`\`\nKomut Adı Takma Adı, Açıklama\n\`\`\`\n**erkek / ${client.commands.get('erkek').aliases ? client.commands.get('erkek').aliases.join(', ') : "Takma ad bulunamadı."}**\n\n**${client.commands.get('erkek').description ? client.commands.get('erkek').description : "İnsanlara erkek rolü vererek kaydetmeye yarar."}**`,
`\`\`\`\nKomut Adı Takma Adı, Açıklama\n\`\`\`\n**kız / ${client.commands.get('kız').aliases ? client.commands.get('kız').aliases.join(', ') : "Takma ad bulunamadı."}**\n\n**${client.commands.get('kız').description ? client.commands.get('kız').description : "İnsanlara kız rolü vererek kaydetmeye yarar."}**`,
`\`\`\`\nKomut Adı Takma Adı, Açıklama\n\`\`\`\n**say / ${client.commands.get('say').aliases ? client.commands.get('say').aliases.join(', ') : "Takma ad bulunamadı."}**\n\n**${client.commands.get('say').description ? client.commands.get('say').description : "Sunucu hakkında bazı bilgiler verir."}**`,
`\`\`\`\nKomut Adı Takma Adı, Açıklama\n\`\`\`\n**uptime / ${client.commands.get('uptime').aliases ? client.commands.get('uptime').aliases.join(', ') : "Takma ad bulunamadı."}**\n\n**${client.commands.get('uptime').description ? client.commands.get('uptime').description : "Botun ne kadar süredir çalıştığını gösterir."}**`,
`\`\`\`\nKomut Adı Takma Adı, Açıklama\n\`\`\`\n**ping / ${client.commands.get('ping').aliases ? client.commands.get('ping').aliases.join(', ') : "Takma ad bulunamadı."}**\n\n**${client.commands.get('ping').description ? client.commands.get('ping').description : "Botun gecikme süresini gösterir (gönderilen mesaj ile botun gönderdiği mesajın zamanı arasındaki fark alınır)."}**`,
];

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Komut kullanıldığında direk uygulanan şeyler (emojiye basılmadan)...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

//Hangi sayfadan başlayacağını belirtiyoruz...

let page = 1;
 
//İleri veya geri emojisine tıklamadan çıkan embedi hazırlıyoruz...

const embed = new MessageEmbed()
.setColor('#00FFFF')
.setFooter(`Sayfa ${page} / ${pages.length}`)
.setDescription(pages[page-1])
message.channel.send(embed).then(msg => {
 
//Sayfaları çevirebilmemiz için gereken emojileri ekliyoruz...

msg.react('⬅')
.then(r => {
msg.react('➡')

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kodun çalışabilmesi için bazı şeyleri tanımlıyoruz...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

//Sayfaları bizden başka birinin çevirememmesi için ayarlamalar yapıyoruz...

const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
 
//Geri ve ileri tuşlarının ayarlamalarını yapıyoruz (ne kadar süre geçtikten sonra kullanılamıyacağı filan)

const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Emojilere tıkladığımızda çıkan embedler ayarlamalar...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

//İleri emojisine basınca bu kısım uygulanıyor...

forwards.on('collect', r => {
if(page === pages.length) return;
page++;
embed.setDescription(pages[page-1]);
embed.setColor('#00FFFF')
embed.setFooter(`Sayfa ${page} / ${pages.length}`)
msg.edit(embed)
r.users.remove(r.users.cache.filter(u => u === message.author).first())
})

//Geri emojisine basınca bu kısım uygulanıyor...

backwards.on('collect', r => {
if(page === 1) return;
page--;
embed.setColor('#00FFFF')
embed.setDescription(pages[page-1]);
embed.setFooter(`Sayfa ${page} / ${pages.length}`)
msg.edit(embed)
r.users.remove(r.users.cache.filter(u => u === message.author).first())

})})})}}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
