const {Client, Events, GatewayIntentBits, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const client = new Client({intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages]});

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const TOKEN = config.botToken;
prefix = "?";
//const prefix = config.prefix;

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "! The prefix is " + prefix + " .");
});

// Message when someone join the server

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'arriver-départ-✈');
    console.log(member.guild.memberCount);
    if (!channel) return;
    const embed = new EmbedBuilder()
        .setColor('#B072FF')
        .setTitle("Quelqu'un vient d'arriver !")
        .setAuthor({name: "CreeperFarm", iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4", url:"https://github.com/CreeperFarm"})
        .addFields(
            {name: `Bienvenue à toi ${member} sur le serveur !`},
            {name: "Nous sommes désormais " + member.guild.memberCount + " sur le serveur !"}
        )
    channel.send({ embeds: [embed]});
    console.log(member.guild.memberCount + " members on the server");
    console.log(member + " joined the server");
});

// Message when someone leave the server

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'arriver-départ-✈');
    if (!channel) return;
    channel.send(`${member} a quitté le serveur, à bientôt !`);
    console.log(member.guild.memberCount + " members on the server");
    console.log(member + " left the server");
});

// Respond to commands
client.on('messageCreate', msg => {
    if (msg.author.bot) return;


    // Help command
    if (msg.content === prefix + "help"){
        const embed = new EmbedBuilder()
           .setColor('#B072FF')
           .setTitle("Liste des commandes:")
           .setAuthor({name: "CreeperFarm", iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4", url:"https://github.com/CreeperFarm"})
           .addFields(
                {name: prefix + "help", value: "Affiche la liste des commandes."},
                {name: prefix + "ping", value: "Affiche Pong!"},
                {name: prefix + "twitch", value: "Affiche le lien de la chaîne Twitch."},
                {name: prefix + "youtube ou " + prefix + "yt ou " + prefix, value: "Affiche le lien de la chaîne Youtube."},
                {name: prefix + "twitter ou " + prefix + "x", value: "Affiche le lien du compte Twitter (X)."},
                {name: prefix + "tiktok", value: "Affiche le lien du compte TikTok."},
                {name: prefix + "github", value: "Affiche le lien du compte GitHub."},
                {name: prefix + "instagram", value: "Affiche le lien du compte Instagram."},
                {name: prefix + "kick", value: "Affiche le lien du compte kick."},
                {name: prefix + "réseaux ou " + prefix + "reseaux", value: "Affiche le lien de tous les réseaux."}
        
            )
           .addFields({name: prefix + "", value: "Add soon ..."});
        msg.reply({ embeds: [embed]});
        console.log("Help command sent");
    }

    if (msg.content === prefix + "ping") {
        msg.reply("Pong!");
        console.log("Pong!");
    }

    // Social networks links
    if (msg.content === prefix + "twitch") {
        msg.reply("Le lien de la chaîne Twitch est https://www.twitch.tv/creeperfarm");
        console.log("Twitch link sent");
    }
    if (msg.content === prefix + "youtube" || msg.content === prefix + "yt" || msg.content === prefix + "ytb") {
        msg.reply("Le lien de la chains Youtube est https://www.youtube.com/@creeperfarm");
        console.log("Youtube link sent");
    }
    if (msg.content === prefix + "twitter" || msg.content === prefix + "x") {
        msg.reply("Le lien du compte Twitter (X) est https://twitter.com/FarmCreeper");
        console.log("Twitter link sent");
    }
    if (msg.content === prefix + "tiktok") {
        msg.reply("Le lien du compte TikTok est https://www.tiktok.com/@creeperfarm");
        console.log("TikTok link sent");
    }
    if (msg.content === prefix + "github") {
        msg.reply("Le lien du compte GitHub est https://github.com/creeperfarm")
        console.log("GitHub link sent");
    }
    if (msg.content === prefix + "instagram") {
        msg.reply("Le lien du compte Instagram est https://www.instagram.com/creeperfarm/")
        console.log("Instagram link sent");
    }
    if (msg.content === prefix + "kick") {
        msg.reply("Le lien duu compte kick est https://www.kick.com/creeperfarm")
        console.log("Kick link sent");
    }
    if (msg.content === prefix + "réseaux" || msg.content === prefix + "reseaux") {
        msg.reply("Le lien de tous les réseaux est https://linktr.ee/creeperfarm")
        console.log("All links sent");
    }
});

// Send a message every minute
minutes = 0;
hours = 0;
days = 0;
years = 0;
setInterval(() => {
    minutes++;
    if (minutes >= 60) {
        minutes -= 60;
        hours++;
    } else if (hours >= 24) {
        hours -= 24;
        days++;
    } else if (days >= 365) {
        days -= 365;
        years++;
    }
    if (years === 0 && days === 0 && hours === 0) {
        console.log(`The bot is online since ${minutes} minute(s).`);
    } else if (years === 0 && days === 0) {
        console.log(`The bot is online since ${hours} hour(s) and ${minutes} minute(s).`)
    } else if (years === 0) {
        console.log(`The bot is online since ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
    } else {
        console.log(`The bot is online since ${years} year(s) , ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
    }
}, 60000);

client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    if (msg.content === prefix + "uptime" || msg.content === prefix + "up") {
        if (years === 0 && days === 0 && hours === 0) {
            msg.reply(`The bot is online since ${minutes} minute(s).`);
        } else if (years === 0 && days === 0) {
            msg.reply(`The bot is online since ${hours} hour(s) and ${minutes} minute(s).`)
        } else if (years === 0) {
            msg.reply(`The bot is online since ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
        } else {
            msg.reply(`The bot is online since ${years} year(s) , ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
        }
        console.log("Up time send");
    }
});

client.login(TOKEN)