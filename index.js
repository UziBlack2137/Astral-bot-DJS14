const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { loadSlashCommands } = require("./handlers/slashCommand")
const chalk = require('chalk')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildPresences, 
        GatewayIntentBits.GuildMessageReactions, 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ], 
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});


const config = require('./config.json');
require('dotenv').config()

client.commands = new Collection()
client.aliases = new Collection()
client.buttonCooldown = new Collection()
client.prefix = config.prefix

client.slash = new Collection();
loadSlashCommands(client);

module.exports = client;


['command', 'events'].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});



client.login('MTExMjI3MTUyMDY1MjM0MTMyMQ.GGee3I.ePbrgFJYbAix7ITSXp-hLh5dJiuY9TdM1STZHs')