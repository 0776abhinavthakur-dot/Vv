const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

const PREFIX = "vv";
client.commands = new Collection();

// Error logging handler to prevent process crashes on server host
process.on('unhandledRejection', (reason, promise) => {
    console.error(' [CRITICAL EXCEPTION] Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
    console.error(' [CRITICAL EXCEPTION] Uncaught Exception thrown:', error);
});

const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) fs.mkdirSync(commandsPath);

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log('🔄 Initializing system command pipeline matrices...');
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
        const commandModule = require(filePath);
        if (Array.isArray(commandModule)) {
            for (const cmd of commandModule) {
                if (cmd.name && typeof cmd.execute === 'function') {
                    client.commands.set(cmd.name, cmd);
                    console.log(` ✅ Loaded Compound Command Block: ${PREFIX}${cmd.name}`);
                }
            }
        } else if (commandModule && commandModule.name && typeof commandModule.execute === 'function') {
            client.commands.set(commandModule.name, commandModule);
            console.log(` ✅ Loaded Standalone Command File: ${PREFIX}${commandModule.name}`);
        }
    } catch (err) {
        console.error(` ❌ Failed to register command file target: ${file}`, err);
    }
}

client.once('ready', () => {
    console.log(`================================================================`);
    console.log(` 🏐 VOLLEYBALL ENGINE ONLINE: Registered as ${client.user.tag}`);
    console.log(` 🚀 Production Environment Loaded: 15-File Cluster Synchronized`);
    console.log(`================================================================`);
    
    client.user.setPresence({
        activities: [{ name: 'FIVB World Tour | vvhelp', type: ActivityType.Competing }],
        status: 'online'
    });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.toLowerCase().startsWith(PREFIX.toLowerCase())) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        console.log(` 📊 Execution Log: [User: ${message.author.tag}] triggered structural command [${commandName}]`);
        await command.execute(message, args);
    } catch (error) {
        console.error(` ❌ Execution Fallback Error on command [${commandName}]:`, error);
        if (message.replied || message.deferred) {
            await message.followUp({ content: '⚠️ Internal processing error detected inside the core command loop.', ephemeral: true });
        } else {
            await message.reply('⚠️ Critical error processing this script operation. Please notify server infrastructure engineers.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
