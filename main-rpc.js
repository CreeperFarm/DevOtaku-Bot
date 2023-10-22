const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({transport: 'ipc'});

const config = require('./config.js');

clientId = config.clientId;

DiscordRPC.register(clientId);

async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: "Developing a bot",
        state: "Developing DevOtaku bot",
        startTimestamp: new Date(),
        largeImageKey: 'pxfuel',
        largeImageText: `Bot developed by CreeperFarm`,
        //smallImageKey: 'pxfuel',
        //smallImageText: `Bot developed by CreeperFarm`,
        instance: false,
        buttons: [
            {
                label: "GitHub",
                url: "https://github.com/CreeperFarm"
            },
            {
                label: "GitHub's bot repo",
                url: "https://github.com/CreeperFarm/DevOtaku-Bot"
            }
        ],
    });
}
// When the bot is ready

RPC.on('ready', async () => {
    console.log('RPC is ready.');
    setActivity();
    setInterval(() => {
        setActivity();
    }, 15e3);
});

// Send a log every minute
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
}, 60e3);

// Bot login

RPC.login({clientId}).catch(console.error());