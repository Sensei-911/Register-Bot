/*
Bu proje exsus ve nymphdora sunucuları için özel olarak Sensei tarafından hazırlanmıştır!
Bu proje MIT lisansı ile korunuyor ve izinsiz paylaşılması yasaktır!
Bu proje kodun daha açıklayıcı olması için bir çok yorum eklenerek yazılmıştır!
*/

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Buradan botumuzda kullanacağımız modülleri çekiyoruz...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const { Discord, Client, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ disableMentions: "everyone", restTimeOffset: 100, messageCacheMaxSize: 50 });
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const config = require('./config/config.json');
const options = require('./config/options.json');
const cooldowns = new Collection();
const chalk = require('chalk');
const fs = require("fs");

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Botumuza kolay bir şekilde erişebileceğimiz değişkenleri eklediğimiz kısım...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.login(config.TOKEN);
client.commands = new Collection();
client.prefix = config.PREFIX;

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Botun komutlarının nerede olduğunun belirtildiği kısım ('commands' klasörünürün adını değiştirirseniz buradan da değiştirmelisiniz)...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

fs.readdirSync('./commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./commands/`).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
const command = require(`./commands/${file}`);
client.commands.set(command.name, command);
}})

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bot açıldığında çalışan kısım (durum mesajı, konsola mesaj gönderme, sesli kanalda durma bu kısımdan yapılıyor)...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.on("ready", () => { 

//Kod dağınıklığını azaltmak için sunucuyu tanımlıyoruz...

const sunucu = client.guilds.cache.get(options.sunucu_id)

//Bot başladığında konsolda botun sunucunuzda kaç kişiye hizmet ettiği ve sunucunuzun adı bilgisi gösterilir...

console.log(chalk.bold.green(`${sunucu.name} sunucusunda ${sunucu.memberCount} kişiye hizmet ediyorum!`));

//Botun istediğiniz sesli kanalda durması için gereken kısım...

client.channels.cache.get(options.durulacak_sesli_kanal_id).join(); 

//Botun durumunda gözükücek mesaj (WATCHING kısmını LISTENING, PLAYING, STREAMING olarak değiştirebilirsiniz, online kısmını ise idle, dnd, invisible olarak değiştirebilirsiniz)...

client.user.setPresence({ activity: {type:"WATCHING" , name: `Sensei | ${sunucu.name}`}, status: 'online' }); 
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sunucuya biri geldiğinde çalışan kısım (hoş geldin mesajı, kullanıcının adını kayıtsız yapmak v.b için)...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.on("guildMemberAdd", async (member) => {

const sunucu = client.guilds.cache.get(options.sunucu_id)
const hoşgeldin_kanalı = client.channels.cache.get(options.hoşgeldin_kanal_id)
if(member.user.bot) return;
await member.setNickname(`${options.sunucu_tag} Kayıtsız`)
hoşgeldin_kanalı.send(`**WELCOME TO ${sunucu.name}**\n\n**${member.user.username} Seninle Birlikte ${sunucu.memberCount} Kişiyiz!**\n\n**Kayıt Olmak İçin Teyit Odalarına Geçiş Yapabilirsin**\n\n**Bu Roldeki Arkadaşlarım Seninle İlgilenecektir <@&${options.kayıt_yetkilisi_rol_id}>**`)});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Biri kendini güncellediğinde bunları yapacak (tag için kullanılan kod)...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.on("userUpdate", async (oldUser, newUser) => {

const sunucu = client.guilds.cache.get(options.sunucu_id)

//Tag alındığında rol verilir...

if(oldUser.username !== newUser.username) {
if(newUser.username.includes(options.sunucu_tag) && !sunucu.members.cache.get(newUser.id).roles.cache.has(options.tag_rolü_id)) {
await sunucu.members.cache.get(newUser.id).roles.add(options.tag_rolü_id);
}

//Tag kaldırıldığında rol alınır...

if (!newUser.username.includes(options.sunucu_tag) && sunucu.members.cache.get(newUser.id).roles.cache.has(options.tag_rolü_id)) {
await sunucu.members.cache.get(newUser.id).roles.remove(options.tag_rolü_id);
}}})

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Biri mesaj gönderdiğinde çalışan kısım (buradaki yerler çok hassas elleme)...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.on("message", async (message) => {

//Botun hangi koşullarda komutlara cevap vermeyeceğinin ayarlandığı kısım...

if(message.author.bot) return;
if(!message.guild) return;
if(message.guild.id != options.sunucu_id) return;

//Botu etiketlediğinizde gönderilen mesaj...

if(message.content == `<@!${client.user.id}>`){
const etiket_embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL())
.setTitle('Prefix')
.setDescription(client.prefix)
.setColor('#00FFFF') //cyan o_o
.setFooter(`Daha fazla bilgi için "${client.prefix} yardım" yazın.`)
.setTimestamp();
message.channel.send(etiket_embed)};

//Prefix ayarı ve komutların ayarları çok hassas bir kısım ellemeyin...

const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.PREFIX)})\\s*`);
if (!prefixRegex.test(message.content.toLowerCase())) return;
const [matchedPrefix] = message.content.toLowerCase().match(prefixRegex);
const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();
const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
if (!command) return;

//Bir komutun kaç saniyede bir kullanılabileceği 'cooldown' ayarı ellemeyin...

if (!cooldowns.has(command.name)) {   
cooldowns.set(command.name, new Collection())}
const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 1) * 1000;
if (timestamps.has(message.author.id)) {
const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
if (now < expirationTime) {
const timeLeft = (expirationTime - now) / 1000;
return message.channel.send(`⏱ | **${message.author.username}**! Lütfen **${timeLeft.toFixed(1)} saniye** bekleyin ve tekrar deneyin!`).then(b =>{ b.delete({ timeout:5000 })})}};
timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Komutların içinden kolayca erişebilmek için eklediğimiz değişkenler (ellemeyin)... 
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

try {
command.execute(client, message, args, options)}

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bir hata olduğu zaman konsola hatayı göndericek ve komutun kullanıldığı kanala bu mesajı göndericek...
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

catch (error) { 
console.log(error)
message.channel.send(`**${message.author.username}**, komut uygulanırken bir hata oluştu, bir kaç dakika bekleyin ve tekrar deneyin.`).then(a =>{a.delete({timeout:5000})}).catch(console.error); 
}});

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
