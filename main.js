const {Client, Intents} = require('discord.js');
const fs = require('fs');
const client = new Client({intents: []});

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const TOKEN = config.botToken;
prefix = "!";
//const prefix = config.prefix;

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "! The prefix is " + prefix + " .");
});

client.on('messageCreate', msg => {

    if (msg.author.bot) return

    if (msg.content === prefix + "ping") {
        msg.reply("Pong!");
    }
});

client.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur mon serveur ' + member.displayName)
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
});

client.login(TOKEN)