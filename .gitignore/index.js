const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDI5NzQ1ODg4MTUyNTE4Njcx.DcgpyQ.PyViJfV4Jvfq12kwYYl9aTMCo-E";
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
    console.log('Je susi prêt à éffacer les messages!');
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
              message.channel.sendMessage("Mesajları başarılı bir şekilde silindi. Silinen mesajların toplam sayısı: "+messagesDeleted).then(d_msg => { d_msg.delete(30000); });
              console.log('Mesajları başarılı bir şekilde silindi. Silinen mesajların toplam sayısı: '+messagesDeleted).then(d_msg => { d_msg.delete(30000); });
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
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " WELCOME!");

    member.addRole(member.guild.roles.find("name", "NewDayNewGame"));

    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function(role) {
        member.addRole(role);
    });
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
        message.delete (30);
		message.channel.send(`Pong! Zaman aldı: ${Date.now() - message.createdTimestamp} ms`).then(d_msg => { d_msg.delete(9999); });
            break;
        case "info":
            message.reply('senin avatarın '+message.author.avatarURL).then(d_msg => { d_msg.delete(8990); });
            message.reply('kimliğin '+message.author.id).then(d_msg => { d_msg.delete(8990); });
            message.reply('takma adın '+message.author.username).then(d_msg => { d_msg.delete(8990); });
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Bunu okuyamıyorum");
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
          .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/K0iUSPj.png")
          .setColor(0x00ffff)
          .setDescription("__***:x:YASAK:x:***__")
          .addField("1. Küfür ne kadar az olursa o kadar memnun oluruz.")
          .addField("2.Her hangi bir kanal veya discord reklamı yasaktır.")
          .addField("3.Kavgalarınızı özelden yapınız.")
          .addField("4.Cinsel paylaşım, kan, vahşet yasaktır.")
          .addField("5.Oyun hesaplarının, hediyelik eşyaların, oyun materyallerinin vb. Satışı / takası ve tavsiye bağlantılarının paylaşımı yasaktır.")
          .addField("6. Din, dil, ırk ve siyaset kesinlikle yasaktır.")
          .addField("7. Spam ve sel yasaktır.")
          .addField("8. Eğer şarkı, video, fotoğraf, link, ext ... paylaşmak isterseniz linkleri #:camera:clip-video-url-foto || REKLAM YAPMAK BAN SEBEBIDIR.!");
         message.channel.sendMessage(embed).then(d_msg => { d_msg.delete(8990); });
         break;
         case "kurallaradmin":
         message.delete (30);
      var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      var day = message.guild.createdAt.getDate()
      var month = 1 + message.guild.createdAt.getMonth()
      var year = message.guild.createdAt.getFullYear()
      var sicon = message.guild.iconURL;
      var embed = new Discord.RichEmbed()
       .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/K0iUSPj.png")
          .setColor(0x00ffff)
          .setDescription("__***:x:YASAK:x:***__")
          .addField("1. Küfür ne kadar az olursa o kadar memnun oluruz.")
          .addField("2.Her hangi bir kanal veya discord reklamı yasaktır.")
          .addField("3.Kavgalarınızı özelden yapınız.")
          .addField("4.Cinsel paylaşım, kan, vahşet yasaktır.")
          .addField("5.Oyun hesaplarının, hediyelik eşyaların, oyun materyallerinin vb. Satışı / takası ve tavsiye bağlantılarının paylaşımı yasaktır.")
          .addField("6. Din, dil, ırk ve siyaset kesinlikle yasaktır.")
          .addField("7. Spam ve sel yasaktır.")
          .addField("8. Eğer şarkı, video, fotoğraf, link, ext ... paylaşmak isterseniz linkleri #:camera:clip-video-url-foto || REKLAM YAPMAK BAN SEBEBIDIR.!");
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
       .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/K0iUSPj.png")
		.setColor(0x00ffff)
		.setTitle("Emirlerin listesi:")
		.addField("Mevcut sipariş listesini verecek", "-help")
		.addField("Botun kaç tane ping olduğunu görün", "-ping")
		.addField("Bu sunucunun kurallarına bakın", "-kurallar")
		.addField("Kişisel bilgilerinizi bilin", "-info")
		.addField("Sunucu bilgisine bakın", "-serverinfo")
		.addField("Rollerini gör", "-rollerim")
		.addField("Müzik için", "-turkplay [URL/Şarkı Adı]")
		.addField("Birisine report ed", "-report")
		.addField("Chat'i sil (ADMIN)", "-clearchat")
		.addField("Bot bir şeyler söyler (ADMIN)", "-say [yazı]")
		.addField("Bir reklamı söylemek ve herkesi etiketlemek için botu alacak (ADMIN)", "-önemli [yazı]");
		message.channel.send({embed}).then(d_msg => { d_msg.delete(9999); });
      break;
      case "yardimadmin":
         message.delete (30);
      var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      var day = message.guild.createdAt.getDate()
      var month = 1 + message.guild.createdAt.getMonth()
      var year = message.guild.createdAt.getFullYear()
      var sicon = message.guild.iconURL;
      var embed = new Discord.RichEmbed()
      .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/K0iUSPj.png")
		.setColor(0x00ffff)
		.setTitle("Emirlerin listesi:")
		.addField("Mevcut sipariş listesini verecek", "-help")
		.addField("Botun kaç tane ping olduğunu görün", "-ping")
		.addField("Bu sunucunun kurallarına bakın", "-kurallar")
		.addField("Kişisel bilgilerinizi bilin", "-info")
		.addField("Sunucu bilgisine bakın", "-serverinfo")
		.addField("Rollerini gör", "-rollerim")
		.addField("Müzik için", "-turkplay [URL/Şarkı Adı]")
		.addField("Birisine report ed", "-report")
		.addField("Chat'i sil (ADMIN)", "-clearchat")
		.addField("Bot bir şeyler söyler (ADMIN)", "-say [yazı]")
		.addField("Bir reklamı söylemek ve herkesi etiketlemek için botu alacak (ADMIN)", "-önemli [yazı]");
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
             .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/K0iUSPj.png")
             .setColor("0x00ffff")
             .setThumbnail(sicon)
             .addField("Kimlik", message.guild.id, true)
             .addField("Sunucu adı", message.guild.name, true)
             .addField("Kullanıcı adın", message.guild.owner.user.tag, true)
             .addField("Bölge", message.guild.region, true)
             .addField("Server", message.guild.channels.size, true)
             .addField("Insanlar/Botlar", message.guild.memberCount, true)
             .addField("Insanlar", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
             .addField("Botlar", message.guild.members.filter(m => m.user.bot).size, true)
             .addField("Çevrim içi", online.size, true)
             .addField("Rolleriniz", message.guild.roles.size, true);
            message.channel.sendMessage(embed);
            break;
            case "yardim":
            message.delete (30);
         var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
         var day = message.guild.createdAt.getDate()
         var month = 1 + message.guild.createdAt.getMonth()
         var year = message.guild.createdAt.getFullYear()
         var sicon = message.guild.iconURL;
         var embed = new Discord.RichEmbed()
         .setAuthor("[ADMIN]" + message.author.username + "[ADMIN]", "https://imgur.com/hd1v8Pr.png")
          .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/K0iUSPj.png")
          .setColor(0x00ffff)
          .setDescription("__***:heavy_check_mark::red_circle:SUNUCU'YA HOŞGELDİNİZ:red_circle::heavy_check_mark:***__")
          .setFooter(` Yardım için [-yardim] • ${day}.${month}.${year} `, "https://imgur.com/K0iUSPj.png")
          .setImage("https://imgur.com/StHMUDI.png")
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setURL("")
  .addField("__```☪TüRk-BoT☪ davet etmek için:```__",
	"https://goo.gl/Yrbvid")
    .addField("__```Sunucuya katılmak için:```__", "https://goo.gl/xREjkN", true);
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
         case "rol":
         message.delete (30);
      var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      var day = message.guild.createdAt.getDate()
      var month = 1 + message.guild.createdAt.getMonth()
      var year = message.guild.createdAt.getFullYear()
      var sicon = message.guild.iconURL;
      var embed = new Discord.RichEmbed()
       .setFooter(` Pour la commande d'aide [-aide] • ${day}.${month}.${year} `, "https://imgur.com/rAgsGxu.png")
       .setColor(0x00ffff)
       .addField(message.author.username, "Rolum: " + message.member.roles.map(role => role.name).join(" || ")) // user, roles
	   .setColor(0x00ffff)
	   .setThumbnail(message.author.avatarURL)
      message.channel.sendMessage(embed);
      break;
         case "önemli":
         message.delete()
         if (message.member.hasPermission("ADMINISTRATOR")) {
            const color = args[0]
                 
            const text = args.slice(1).join(" ");
            if (text.length < 1) return message.channel.send("Can not announce nothing");
            //const colour = args.slice(2).join("");
            const embed = new Discord.RichEmbed()
            .setColor("0x" + color)
            .setTitle("Önemli duyuru:")
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
            message.member.removeRole(message.member.guild.roles.find("name", "NewDayNewGame"));
            break;
        case "deleterole":
            message.member.guild.roles.find("name", "NewDayNewGame").delete();
            message.channel.sendMessage("delet");
            break;
        case "playn":
            if (!args[1]) {
                message.channel.sendMessage("S'il vous plaît fournir un lien");
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
        case "skipn":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
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
                    message.reply("**Rapor etmek için yardım :** \n\n Uygunsuz davranışa sahip bir veya daha fazla kullanıcıyı rapor etmek için, rapor komutundan sonra kullanıcıların adını veya adlarını koyun. \n\n belirli birini ve nedeni de ekleyebilirsiniz `-r:\"Sebebin\"`. \n\n Bu komutu tamamen kötüye kullanmayın, teşekkürler :wink: ! \n\n **Örnek 1 :** `!report @kullanıcı` \n **Örnek 2 :** `!report @kullanıcı1 @kullanıcı2` \n **Örnek 3 :** `!report @kullanıcı1 -r:\"Bir sebep\"`");
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
                                            var annee = a.getFullYear();
                                            var mois = tabMois[a.getMonth()];
                                            var date = a.getDate();
                                            var heure = a.getHours();
                                            var min = a.getMinutes();
                                            var sec = a.getSeconds();
                                            var time = " + tarih + ' ' + ay + ' ' + yıl + ' içinde ' + zaman + 'saat' + dakika + ':' + saniye ;
                                            return time;
                                        }
                                        
                                        // Reporter les utilisateurs
                                        var MP = "Un rapport soumis " + timeConverter(message.createdTimestamp) + " par **" + message.author.username + "** a été effectué à l'encontre de ";
                                        
                                        message.mentions.users.forEach(function(user)
                                        {
                                            MP = MP + "@" + user.username + " ";
                                        });
                                        
                                        MP =  MP + "sur *" + member.guild.name + "/" + message.channel.name + "*";
                                        
                                        // Prise en charge de la raison du signalement
                                        if(raisonSignalement != null)
                                        {
                                            MP = MP + " pour la raison suivante : *" + raisonSignalement + "*";
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
                            message.reply("Raporlama bitti hayirli urlu olsun :wink: !");
                        }
                    }
                }
            }
        }
    });

bot.login(TOKEN);
