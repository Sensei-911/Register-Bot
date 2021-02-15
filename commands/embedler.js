/*
Bu proje exsus ve nymphdora sunucuları için özel olarak Sensei tarafından hazırlanmıştır!
Bu proje MIT lisansı ile korunuyor ve izinsiz paylaşılması yasaktır!
Bu proje kodun daha açıklayıcı olması için bir çok yorum eklenerek yazılmıştır!
*/

/*
-Eğer neden burada ki embedlerin bu kadar kısa olduğunu düşünüyorsanız 
-Bu embedler komutun içinde değiştiriliyor (yani embede açıklama ekleniyor footer ekleniyor filan)
-Daha az satır kod yazılarak daha anlaşılır olmasını sağlamak için yapılmıştır...
*/

const { Discord, MessageEmbed } = require('discord.js')

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kayıt başarılı olduğunda atılacak embed... 
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
  
const başarılı = new MessageEmbed()
.setTitle('İşlem Başarılı')
.setColor('GREEN')

global.başarılı = başarılı

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kayıt başarısız olduğunda atılacak embed...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const başarısız = new MessageEmbed()
.setTitle('Hata')
.setColor('RED')

global.başarısız = başarısız

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kayıt başarılı olursa belirlediğiniz kanala atılacak embedi ayarlıyoruz...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const kayıtdan_sonra_embed = new MessageEmbed()
.setColor('#00FFFF') //cyan o_o

global.kayıtdan_sonra_embed = kayıtdan_sonra_embed

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
