    const Discord = require('discord.js')
const client = new Discord.Client()


const prefix = "!"

client.on("ready", () => {
    console.log("Logged in as ${client.user.tag}!");
});

client.on("message", msg => {
    if (msg.content === prefix + "ping") {
        msg.reply("Pong!");
    }
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur mon serveur ' + member.displayName)
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})

client.login('')