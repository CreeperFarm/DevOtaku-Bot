const {Client, Events, GatewayIntentBits} = require('discord.js');
const fs = require('fs');
const client = new Client({intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const TOKEN = config.botToken;
prefix = "!";
//const prefix = config.prefix;

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "! The prefix is " + prefix + " .");
});

client.on('messageCreate', msg => {

    console.log(msg.content);

    if (msg.author.bot) return;

    if (msg.content === prefix + "ping") {
        msg.reply("Pong!");
    }

    if (message.content == prefix + "help"){
        const embed = new Discord.MessageEmbed()
           .setColor("#B072FF")
           .setTitle("Liste des commandes:")
           .setAuthor("CreeperFarm", "https://avatars.githubusercontent.com/u/62711198?s=96&v=4", "https://github.com/CreeperFarm")
           .addField(prefix + "projet", "Donne le lien du projet CreeperAnime")
           .addField(prefix + "anime", "Permet la sélection d'un anime")
           .addField(prefix + "", "Add soon ...");
  
        message.reply({ embeds: [embed]});
    }
});

client.login(TOKEN)