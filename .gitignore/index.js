const Discord = require("discord.js");
const client = new Discord.Client();
const YTDL = require("ytdl-core");


const TOKEN = "NDQ1NjQxMTU5MjM1MzM4MjQw.Dd4pqg.NfRkOHpVrpb1EBJ7EuI4YYg5fuE";
const ownerID = "174565176492687361"
const PREFIX = "-";

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "fucc u"
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", async () => {

	console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
	bot.user.setActivity("-help", {type: "WATCHING"});
  
});

const CLEAR_MESSAGES = '-clearchat';

bot.on('ready', () => {
    console.log('Mesajları silmeye hazırım!');
    bot.on('message', message => {
      if (message.content == CLEAR_MESSAGES) {
  
        // Check the following permissions before deleting messages:
        //    1. Check if the user has enough permissions
        //    2. Check if I have the permission to execute the command
  
        if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
          message.channel.sendMessage("Üzgünüz, komutu yürütme izniniz yok \""+message.content+"\"");
          console.log("Üzgünüz, komutu yürütme izniniz yok \""+message.content+"\"");
          return;
        } else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES")) {
          message.channel.sendMessage("Üzgünüm, komutu yürütme iznim yok \""+message.content+"\"");
          console.log("Üzgünüm, komutu yürütme iznim yok \""+message.content+"\"");
          return;
        }
  
        // Only delete messages if the channel type is TextChannel
        // DO NOT delete messages in DM Channel or Group DM Channel
        if (message.channel.type == 'text') {
          message.channel.fetchMessages()
            .then(messages => {
              message.channel.bulkDelete(messages);
              messagesDeleted = messages.array().length; // number of messages deleted
  
              // Logging the number of messages deleted on both the channel and console.
              message.channel.sendMessage("Mesajları başarılı bir şekilde silme. Silinen mesajların toplam sayısı: "+messagesDeleted).then(d_msg => { d_msg.delete(30000); });
              console.log('Mesajları başarılı bir şekilde silme. Silinen mesajların toplam sayısı: '+messagesDeleted).then(d_msg => { d_msg.delete(30000); });
            })
            .catch(err => {
              console.log('Toplu silme sırasında hata oluştu');
              console.log(err);
            });
        }
      }
    });
  });

bot.on("guildMemberAdd", function(member) {
    
    member.addRole(member.guild.roles.find("name", "YENI"));

});

bot.on('guildCreate', (guild) => { // If the Bot was added on a server, proceed
    if (!guildConf[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
	guildConf[guild.id] = {
		prefix: config.prefix
	}
    }
     fs.writeFile('./storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
     	if (err) console.log(err)
	})
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
        message.delete (30);
		message.channel.send(`Pong! Server pingi: ${Date.now() - message.createdTimestamp} ms`).then(d_msg => { d_msg.delete(9999); });
            break;
        case "info":
            message.reply('avatarın '+message.author.avatarURL).then(d_msg => { d_msg.delete(8990); });
            message.reply('kimliğin '+message.author.id).then(d_msg => { d_msg.delete(8990); });
            message.reply('takma adın '+message.author.username).then(d_msg => { d_msg.delete(8990); });
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Je ne peux pas lire ça");
            break;
         case "embed":
            var embed = new Discord.RichEmbed()
                .addField("Test Title", "Test Description", true)
                .addField("Test Titl2e", "Test De2scription", true)
                .addField("Test 3Title", "Test De3scription", true)
                .addField("Test 3Titl53e", "Test De3sc345ription")
                .addField("3Test Titl4e", "Test De3s4cription")
                .setColor(0x00FFFF)
                .setFooter("Ce message est assez cool, ohhh ai-je dit message que je veux dire EMBED gotem")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendMessage(embed);
            break;
            case "kurallar":
            message.delete (30);
         var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
         var day = message.guild.createdAt.getDate()
         var month = 1 + message.guild.createdAt.getMonth()
         var year = message.guild.createdAt.getFullYear()
         var sicon = message.guild.iconURL;
         var embed = new Discord.RichEmbed()
          .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/w0z6lI3.png")
          .setColor(0x00ffff)
          .setDescription("__***:x:YASAK:x:***__")
          .addField("1. Küfür ne kadar az olursa o kadar memnun oluruz.")
          .addField("2. Her hangi bir kanal veya discord reklamı yasaktır.")
          .addField("3. Kavgalarınızı özelden yapınız.")
          .addField("4. Cinsel, kan, vahşet içerikli paylaşımlar yasak.")
          .addField("5. Oyun hesabı, hediyelik eşya, oyun ekipmanı vb şeylerin satışı / takası ve referans linkleri paylaşımı yasak.")
          .addField("6. Din, dil, ırk ve siyaset içerikli konular kesinlikle yasaktır.")
          .addField("7. Spam ve flood yasak.")
          .addField("8. Eğer şarkı, video, fotoğraf, link,... paylaşmak isterseniz #:camera:clip-video-url-foto || PUBLICITÉ BAN!");
         message.channel.sendMessage(embed).then(d_msg => { d_msg.delete(8990); });
         break;
        case "yardim":
         message.delete (30);
      var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      var day = message.guild.createdAt.getDate()
      var month = 1 + message.guild.createdAt.getMonth()
      var year = message.guild.createdAt.getFullYear()
      var sicon = message.guild.iconURL;
      var embed = new Discord.RichEmbed()
      .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/w0z6lI3.png")
		.setColor(0x00ffff)
		.setTitle("Emirlerin listesi:")
        .addField("Mevcut listesini verecek", "-help")
        .addField("Admin yada Modlara ihtiyacınız olursa", "-yardimadmin")
		.addField("Botun kaç tane ping olduğunu görün", "-ping")
		.addField("Bu sunucunun kurallarına bakın", "-kurallar")
		.addField("Kişisel bilgilerinizi bilin", "-info")
		.addField("Sunucu bilgisine bakın", "-serverinfo")
		.addField("Rollerini gör", "-roll")
		.addField("Muzik için", "-turkplay [URL/ADI]")
		.addField("Birisine rapor et", "-report")
		.addField("Chat'i sil (ADMIN)", "-clearchat")
		.addField("Bot bir şey söyler (ADMIN)", "-say [Yazı]")
		.addField("Önemli konu söylemek ve herkesi etiketlemek için botu alacak (ADMIN)", "-önemli [Yazı]");
		message.channel.send({embed}).then(d_msg => { d_msg.delete(9999); });
      break;
      case "yardimadmincik":
         message.delete (30);
      var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      var day = message.guild.createdAt.getDate()
      var month = 1 + message.guild.createdAt.getMonth()
      var year = message.guild.createdAt.getFullYear()
      var sicon = message.guild.iconURL;
      var embed = new Discord.RichEmbed()
      .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/w0z6lI3.png")
		.setColor(0x00ffff)
		.setTitle("Emirlerin listesi:")
        .addField("Mevcut listesini verecek", "-help")
        .addField("Admin yada Modlara ihtiyacınız olursa", "-yardimadmin")
		.addField("Botun kaç tane ping olduğunu görün", "-ping")
		.addField("Bu sunucunun kurallarına bakın", "-kurallar")
		.addField("Kişisel bilgilerinizi bilin", "-info")
		.addField("Sunucu bilgisine bakın", "-serverinfo")
		.addField("Rollerini gör", "-roll")
		.addField("Muzik için", "-turkplay [URL/ADI]")
		.addField("Birisine rapor et", "-report")
		.addField("Chat'i sil (ADMIN)", "-clearchat")
		.addField("Bot bir şey söyler (ADMIN)", "-say [Yazı]")
		.addField("Önemli konu söylemek ve herkesi etiketlemek için botu alacak (ADMIN)", "-önemli [Yazı]");
      message.channel.send({embed}).then(d_msg => { d_msg.delete(9999); });
      break;
        case "serverinfo":
               message.delete (30);
            var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
            var day = message.guild.createdAt.getDate()
            var month = 1 + message.guild.createdAt.getMonth()
            var year = message.guild.createdAt.getFullYear()
            var sicon = message.guild.iconURL;
            var embed = new Discord.RichEmbed()
             .setAuthor(message.guild.name, sicon)
             .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/w0z6lI3.png")
             .setColor("0x00ffff")
             .setThumbnail(sicon)
             .addField("Kimlik", message.guild.id, true)
             .addField("Ad", message.guild.name, true)
             .addField("Sahip", message.guild.owner.user.tag, true)
             .addField("Bölge", message.guild.region, true)
             .addField("Server kanal", message.guild.channels.size, true)
             .addField("Üyeler", message.guild.memberCount, true)
             .addField("Insanlar", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
             .addField("Botlar", message.guild.members.filter(m => m.user.bot).size, true)
             .addField("Çevrimiçi", online.size, true)
             .addField("Roller", message.guild.roles.size, true);
            message.channel.sendMessage(embed);
            break;
            case "help":
            message.delete (30);
         var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
         var day = message.guild.createdAt.getDate()
         var month = 1 + message.guild.createdAt.getMonth()
         var year = message.guild.createdAt.getFullYear()
         var sicon = message.guild.iconURL;
         var embed = new Discord.RichEmbed()
         .setAuthor("[ADMIN]" + message.author.username + "[ADMIN]", "https://imgur.com/hd1v8Pr.png")
         .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/w0z6lI3.png")
          .setColor(0x00ffff)
          .setDescription("__***:heavy_check_mark::red_circle:SUNUCUNUMUZA HOŞGELDİNİZ:red_circle::heavy_check_mark:***__")
          .setFooter(" Yardım için [-yardim] ", "https://imgur.com/w0z6lI3.png")
          .setImage("https://imgur.com/ASDHxjF.png")
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setURL("https://imgur.com/ASDHxjF.png")
  .addField("__```Davet ☪TüRk-BoT☪:```__",
	"https://goo.gl/MhDpGn")
    .addField("__```Serverumuza katıl:```__", "https://goo.gl/eyLuNc", true);
         message.channel.sendMessage(embed).then(d_msg => { d_msg.delete(8990); });
         break;
         case "yardimadmin":
         message.delete (30);
      var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      var day = message.guild.createdAt.getDate()
      var month = 1 + message.guild.createdAt.getMonth()
      var year = message.guild.createdAt.getFullYear()
      var sicon = message.guild.iconURL;
      var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, sicon)
      .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/w0z6lI3.png")
       .setColor(0x00ffff)
 .addField("__```Yardım Edebilecek Kişiler```__", "<@174565176492687361> <@348463127354146816> <@363840664955518997>", true);
      message.channel.sendMessage(embed).then(d_msg => { d_msg.delete(8990); });
      break;
            case "say":
            message.delete()
	if (message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.RichEmbed()
		.setColor(0x00ffff)
		.setDescription(message.author.username + " diyorki: " + args.join(" "));
		message.channel.send({embed})
	}
         break;
         case "roll":
         message.delete (30);
      var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      var day = message.guild.createdAt.getDate()
      var month = 1 + message.guild.createdAt.getMonth()
      var year = message.guild.createdAt.getFullYear()
      var sicon = message.guild.iconURL;
      var embed = new Discord.RichEmbed()
      .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/w0z6lI3.png")
       .setColor(0x00ffff)
       .addField(message.author.username, "Rollerim: " + message.member.roles.map(role => role.name).join(" || ")) // user, roles
	   .setColor(0x00ffff)
	   .setThumbnail(message.author.avatarURL)
      message.channel.sendMessage(embed);
      break;
      case "oy":
         message.delete (30);
         let args = message.content.split(" ").slice(1);
         let thingToEcho = args.join(" ")
         var embed = new Discord.RichEmbed()
         .addField(thingToEcho, ":white_check_mark: veya :x: Ile yanıtla")
         .setColor("0xB40404")
         .setTimestamp()
				message.channel.sendEmbed(embed)
			.then(function (message){
				message.react("✅")
				message.react("⛔")
			}).catch(function(){
				
            });
            message.delete()
			if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
                message.channel.sendMessage("Üzgünüz, komutu yürütme izniniz yok");
                console.log("Üzgünüz, komutu yürütme izniniz yok");
                return;
              } else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES")) {
                message.channel.sendMessage("Üzgünüm, komutu yürütme iznim yok");
                console.log("Üzgünüm, komutu yürütme iznim yok");
                return;
              }
      break;
         case "önemli":
         message.delete()
         if (message.member.hasPermission("ADMINISTRATOR")) {
            const color = args[0]
                 
            const text = args.slice(1).join(" ");
            if (text.length < 1) return message.channel.send("Hiçbir şey açıklanamaz");
            //const colour = args.slice(2).join("");
            const embed = new Discord.RichEmbed()
            .setColor("0x" + color)
            .setTitle("Önemli Duyuru:")
            .setDescription(text);
            message.channel.send("@everyone")
            message.channel.send({embed})
        }
      break;
        case "noticeme":
            message.channel.sendMessage(message.author.toString() + " sadasaasdsdaasd");
            break;
        case "removerole":
            message.channel.sendMessage("removed");
            message.member.removeRole(message.member.guild.roles.find("name", "YENI"));
            break;
        case "deleterole":
            message.member.guild.roles.find("name", "YENI").delete();
            message.channel.sendMessage("delet");
            break;
        case "playst":
            if (!args[1]) {
                message.channel.sendMessage("Lütfen bir bağlantı sağlayın");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Vous devez être dans The Voice :)");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "kick":
            var kickedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
            if (!kickedmember) return message.reply("Lütfen bu sunucudan geçerli bir kişiden bahset!") // if there is no kickedmmeber var
            if (!kickedmember.kickable) return message.reply("Bu kişiyi tekmelemem!") // if the member is unkickable
            var kickreasondelete = 10 + kickedmember.user.id.length //sets the length of the kickreasondelete
            var kickreason = message.content.substring(kickreasondelete).split(" "); // deletes the first letters until it reaches the reason
            var kickreason = kickreason.join(" "); // joins the list kickreason into one line
            if (!kickreason) return message.reply("Lütfen vuruş için bir neden belirtin!") // if no reason
            kickedmember.kick(kickreason) //if reason, kick
                .catch(error => message.reply(`Üzgünüm @${message.author} seni tekmeleyemedim ama : ${error}`)); //if error, display error
            message.reply(`${kickedmember.user.username} tarafından atıldı ${message.author.username} cunku: ${kickreason}`); // sends a message saying he was kicked
            break;
        case "skipst":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            break;
        case "mute":
            if (!message.member.roles.some(r=>["🔲BoT-Admin🔲"].includes(r.name)) ) return message.reply("Désolé, vous n'avez pas la permission de le faire!"); // if author has no perms
            var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
            if (!mutedmember) return message.reply("Veuillez mentionner un membre valide de ce serveur!") // if there is no kickedmmeber var
            if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("Je ne peux pas mute cette personne!") // if memebr is an admin
            var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
            var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
            var mutereason = mutereason.join(" "); // joins the list kickreason into one line
            if (!mutereason) return message.reply("Veuillez indiquer une raison pour mettre mute!") // if no reason
            mutedmember.addRole(mutedrole) //if reason, kick
                .catch(error => message.reply(`Je suis désoler ${message.author} Je ne pouvais pas mettre mutte mais à cause de : ${error}`)); //if error, display error
            message.reply(`${mutedmember.user} a été coupé par ${message.author} car: ${mutereason}`); // sends a message saying he was kicked
            break;
        case "ummute":
            if (!message.member.roles.some(r=>["🔲BoT-Admin🔲"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
            var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
            if (!unmutedmember) return message.reply("Veuillez mentionner un(e) personne valide de ce serveur!") // if there is no kickedmmeber var
            unmutedmember.removeRole(mutedrole) //if reason, kick
                .catch(error => message.reply(`Je suis désoler ${message.author} Je ne pouvais pas mettre démmute mais à cause de : ${error}`)); //if error, display error
            message.reply(`${unmutedmember.user} a été découpé par ${message.author}!`); // sends a message saying he was kicked
            break;
        case "oy1":
            const user = message.author.username
            let vote = args.slice(0).join(" ");
            message.channel.send(`${vote}`)
            .then(function (message) {
              message.react("<>:")
              message.react("⛔")
             }).catch(function() {
          })
            break;
        case "purge":
            let messagecount = parseInt(args[1]) || 1;
    
            var deletedMessages = -1;
    
            message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
                messages.forEach(m => {
                    if (m.author.id == bot.user.id) {
                        m.delete().catch(console.error);
                        deletedMessages++;
                    }
                });
            }).then(() => {
                    if (deletedMessages === -1) deletedMessages = 0;
                    message.channel.send(`:white_check_mark: Purgé \`${deletedMessages}\` messages.`)
                        .then(m => m.delete(2000));
            }).catch(console.error);
            break;
        case "invite":
        message.channel.send('Beni sunucunuza davet et! https://discordapp.com/oauth2/authorize?&client_id=445641159235338240&scope=bot&permissions=8');
          commandIssued = true;
            break;
        case "shop":
            var server = servers[message.guild.id];
            break;
        default:
            message.channel.sendMessage(" ")
        }
        
    });

    bot.on("message", (message) => {
	
        /*
            Object message :
            
            - mentions.users = utilisateurs mentionnés
            - author.username = auteur du message
            - content = contenu du message
            - createdTimestamp = timestamp du message
            - member.guild.name = nom du serveur
            - channel.name = nom du topic
            - channel.topic = description du topic
            - channel.guild.roles = rôles sur le serveur
        */
        
        if(message.content.substring(0, 7) == "-report")
        {
            message.delete (30);
            var commande = message.content.split(" ");
            
            if(typeof commande[1] === 'undefined')
            {
                if(message.author.bot === false)
                {
                    // Nom d'utilisateur pas entré = afficher l'aide
                    message.reply("**Rapor siparişi için yardım :** \n\n Uygunsuz davranışa sahip bir veya daha fazla kullanıcıyı rapor etmek için, rapor komutundan sonra kullanıcıların adını veya adlarını koyun. \n\n belirli bir nedeni de ekleyebilirsiniz `-r:\"Sebeb\"`. \n\n Bu komutu tamamen kötüye kullanmayın, teşekkürler :wink: ! \n\n **Örnek 1 :** `!report @kullanıcı` \n **Örnek 2 :** `!report @kullanıcı1 @kullanıcı2` \n **Örnek 3 :** `!report @kullanıcı1 -r:\"Bir sebep\"`");
                }
            }
            else
            {
                // Vérifier les noms + raison de signalement
                var verifNom = true;
                var raisonSignalement = null;
                var inOptionRaison = false;
                
                for(var i = 1; i < commande.length; i++)
                {
                    // Les noms des personnes citées commencent par "<", le caractère suivant étant @
                    if(commande[i].charAt(1) !== "@")
                    {
                        // On ne prend pas en compte l'option -r (raison)
                        if(commande[i].substring(0, 4) == "-r:\"")
                        {
                            raisonSignalement = commande[i].substring(3);
                            inOptionRaison = true;
                        }
                        else
                        {
                            if(inOptionRaison == false)
                            {	
                                verifNom = false;
                            }
                            else
                            {
                                raisonSignalement = raisonSignalement + " " + commande[i];
                            }
                        }
                    }
                }
                
                if(verifNom === true)
                {
                    // Vérification des abus
                    var aAppele = false;
                    for(var i = 0; i < dernierAppel.length; i++)
                    {
                        if(dernierAppel[i][0] == message.author.id)
                        {
                            // Un signalement toutes les 3 minutes autorisé
                            if((message.createdTimestamp - dernierAppel[i][1]) < 180000)
                            {
                                aAppele = true;
                            }
                            else
                            {
                                aAppele = false;
                                dernierAppel.splice(i, 1);
                            }
                        }
                    }
                    
                    if(aAppele == false)
                    {
                        dernierAppel.push([message.author.id, message.createdTimestamp]);
                        
                        var moderateurs = new Array();
                        
                        var sontAvertis = true;
                        
                        message.channel.guild.roles.forEach(function(role)
                        {
                            // Chercher les modérateurs parmi tous les rôles
                            
                            if (role.hasPermission('BAN_MEMBERS'))
                            {
                                role.members.forEach(function(member)
                                {
                                    var estDejaPrevenu = false;
                                    for(var j = 0; j < moderateurs.length; j++)
                                    {
                                        if(member == moderateurs[j])
                                        {
                                            // Est déjà prévenu
                                            estDejaPrevenu = true;
                                        }
                                    }
                                        
                                    if(estDejaPrevenu == false)
                                    {
                                        moderateurs.push(member);
                                    
                                        // Fonction conversion timestamp -> Date
                                        function timeConverter(timestamp)
                                        {
                                            var a = new Date(timestamp);
                                            var tabMois = ['Janv.','Févr.','Mars','Avri.','Mai.','Juin','Juil.','Août','Sept.','Octo.','Nove.','Déce.'];
                                            var yıl = a.getFullYear();
                                            var ay = tabMois[a.getMonth()];
                                            var tarih = a.getDate();
                                            var saat = a.getHours();
                                            var dakika = a.getMinutes();
                                            var saniye = a.getSeconds();
                                            var time = "le " + tarih + ' ' + ay + ' ' + yıl + ' à ' + saat + 'h' + dakika + ':' + saniye ;
                                            return time;
                                        }
                                        
                                        // Reporter les utilisateurs
                                        var MP = "Gönderilen bir rapor " + timeConverter(message.createdTimestamp) + " tarafından **" + message.author.username + "** karşı yapıldı ";
                                        
                                        message.mentions.users.forEach(function(user)
                                        {
                                            MP = MP + "@" + user.username + " ";
                                        });
                                        
                                        MP =  MP + "sur *" + member.guild.name + "/" + message.channel.name + "bot";
                                        
                                        // Prise en charge de la raison du signalement
                                        if(raisonSignalement != null)
                                        {
                                            MP = MP + " aşağıdaki sebepten dolayı : *" + raisonSignalement + "bot";
                                        }
                                        
                                        try
                                        {
                                            member.user.sendMessage(MP);
                                        }
                                        catch(e)
                                        {
                                            sontAvertis = false;
                                        }
                                    }
                                });
                            }
                        });
                        
                        if(sontAvertis == true)
                        {
                            message.reply("Raporlama bitti :wink: !");
                        }
                    }
                }
            }
        }
    });

    bot.on("message", (message) => {
	
        /*
            Object message :
            
            - mentions.users = utilisateurs mentionnés
            - author.username = auteur du message
            - content = contenu du message
            - createdTimestamp = timestamp du message
            - member.guild.name = nom du serveur
            - channel.name = nom du topic
            - channel.topic = description du topic
            - channel.guild.roles = rôles sur le serveur
        */
        
        if(message.content.substring(0, 7) == "-report")
        {
            message.delete (30);
            var commande = message.content.split(" ");
            
            if(typeof commande[1] === 'undefined')
            {
                if(message.author.bot === false)
                {
                    // Nom d'utilisateur pas entré = afficher l'aide
                    message.reply("**Rapor siparişi için yardım :** \n\n Uygunsuz davranışa sahip bir veya daha fazla kullanıcıyı rapor etmek için, rapor komutundan sonra kullanıcıların adını veya adlarını koyun. \n\n belirli bir nedeni de ekleyebilirsiniz `-r:\"Sebeb\"`. \n\n Bu komutu tamamen kötüye kullanmayın, teşekkürler :wink: ! \n\n **Örnek 1 :** `!report @kullanıcı` \n **Örnek 2 :** `!report @kullanıcı1 @kullanıcı2` \n **Örnek 3 :** `!report @kullanıcı1 -r:\"Bir sebep\"`");
                }
            }
            else
            {
                // Vérifier les noms + raison de signalement
                var verifNom = true;
                var raisonSignalement = null;
                var inOptionRaison = false;
                
                for(var i = 1; i < commande.length; i++)
                {
                    // Les noms des personnes citées commencent par "<", le caractère suivant étant @
                    if(commande[i].charAt(1) !== "@")
                    {
                        // On ne prend pas en compte l'option -r (raison)
                        if(commande[i].substring(0, 4) == "-r:\"")
                        {
                            raisonSignalement = commande[i].substring(3);
                            inOptionRaison = true;
                        }
                        else
                        {
                            if(inOptionRaison == false)
                            {	
                                verifNom = false;
                            }
                            else
                            {
                                raisonSignalement = raisonSignalement + " " + commande[i];
                            }
                        }
                    }
                }
                
                if(verifNom === true)
                {
                    // Vérification des abus
                    var aAppele = false;
                    for(var i = 0; i < dernierAppel.length; i++)
                    {
                        if(dernierAppel[i][0] == message.author.id)
                        {
                            // Un signalement toutes les 3 minutes autorisé
                            if((message.createdTimestamp - dernierAppel[i][1]) < 180000)
                            {
                                aAppele = true;
                            }
                            else
                            {
                                aAppele = false;
                                dernierAppel.splice(i, 1);
                            }
                        }
                    }
                    
                    if(aAppele == false)
                    {
                        dernierAppel.push([message.author.id, message.createdTimestamp]);
                        
                        var moderateurs = new Array();
                        
                        var sontAvertis = true;
                        
                        message.channel.guild.roles.forEach(function(role)
                        {
                            // Chercher les modérateurs parmi tous les rôles
                            
                            if (role.hasPermission('BAN_MEMBERS'))
                            {
                                role.members.forEach(function(member)
                                {
                                    var estDejaPrevenu = false;
                                    for(var j = 0; j < moderateurs.length; j++)
                                    {
                                        if(member == moderateurs[j])
                                        {
                                            // Est déjà prévenu
                                            estDejaPrevenu = true;
                                        }
                                    }
                                        
                                    if(estDejaPrevenu == false)
                                    {
                                        moderateurs.push(member);
                                    
                                        // Fonction conversion timestamp -> Date
                                        function timeConverter(timestamp)
                                        {
                                            var a = new Date(timestamp);
                                            var tabMois = ['Janv.','Févr.','Mars','Avri.','Mai.','Juin','Juil.','Août','Sept.','Octo.','Nove.','Déce.'];
                                            var yıl = a.getFullYear();
                                            var ay = tabMois[a.getMonth()];
                                            var tarih = a.getDate();
                                            var saat = a.getHours();
                                            var dakika = a.getMinutes();
                                            var saniye = a.getSeconds();
                                            var time = "le " + tarih + ' ' + ay + ' ' + yıl + ' à ' + saat + 'h' + dakika + ':' + saniye ;
                                            return time;
                                        }
                                        
                                        // Reporter les utilisateurs
                                        var MP = "Gönderilen bir rapor " + timeConverter(message.createdTimestamp) + " tarafından **" + message.author.username + "** karşı yapıldı ";
                                        
                                        message.mentions.users.forEach(function(user)
                                        {
                                            MP = MP + "@" + user.username + " ";
                                        });
                                        
                                        MP =  MP + "sur *" + member.guild.name + "/" + message.channel.name + "bot";
                                        
                                        // Prise en charge de la raison du signalement
                                        if(raisonSignalement != null)
                                        {
                                            MP = MP + " aşağıdaki sebepten dolayı : *" + raisonSignalement + "bot";
                                        }
                                        
                                        try
                                        {
                                            member.user.sendMessage(MP);
                                        }
                                        catch(e)
                                        {
                                            sontAvertis = false;
                                        }
                                    }
                                });
                            }
                        });
                        
                        if(sontAvertis == true)
                        {
                            message.reply("Raporlama bitti :wink: !");
                        }
                    }
                }
            }
        }
    });
bot.login(TOKEN);
