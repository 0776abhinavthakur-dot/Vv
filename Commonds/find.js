const { EmbedBuilder } = require('discord.js');
const { CARD_MARKET } = require('../market');

module.exports = {
    name: 'find',
    async execute(message, args) {
        const standardSearchStringInput = args[0]?.toUpperCase().trim();
        if (!standardSearchStringInput) {
            return message.reply("⚠️ Input Null Exception: Please deliver an explicit positioning role target. Available filters: `SETTER`, `OUTSIDE`, `MIDDLE`, `OPPOSITE`, `LIBERO`.");
        }

        // Filter out records from global database registry matching the designated parameters
        const discoveredMatchKeyTokens = Object.keys(CARD_MARKET).filter(keyItem => 
            CARD_MARKET[keyItem].pos === standardSearchStringInput
        ).slice(0, 9); // Pull out maximum 9 matches to fit perfectly in 3x3 embed grid boundaries safely

        if (discoveredMatchKeyTokens.length === 0) {
            return message.reply(`❌ Index Missing: No player asset files located containing positioning structure category matching "${args[0]}".`);
        }

        const dynamicQueryEmbed = new EmbedBuilder()
            .setTitle(`🔍 Professional Market Index Registry Lookup: [Role: ${standardSearchStringInput}]`)
            .setDescription("Displaying the top authenticated athletic data node profiles extracted from market caches.")
            .setColor("#3498db");

        discoveredMatchKeyTokens.forEach(token => {
            const staticNodeData = CARD_MARKET[token];
            dynamicQueryEmbed.addFields({
                name: `${staticNodeData.nation} ${staticNodeData.name}`,
                value: `• Value: \`${staticNodeData.price.toLocaleString()} coins\`\n• Power: \`${staticNodeData.ovr} OVR Rating\``,
                inline: true
            });
        });

        message.channel.send({ embeds: [dynamicQueryEmbed] });
    }
};
