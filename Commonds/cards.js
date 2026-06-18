const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = {
    name: 'cards',
    async execute(message, args) {
        const complexProfileInstance = db.getProfile(message.author.id);
        if (!complexProfileInstance.hasDebuted) {
            return message.reply("❌ Error Context: Missing account node data profiles. Execute `vvdebut` configuration scripts first.");
        }

        const explicitTargetSearchString = args.join(' ').toLowerCase().trim();

        // Branching Execution Flow: Rendering standalone high-resolution graphical player asset card frames
        if (explicitTargetSearchString) {
            const inventoryMatchedKey = complexProfileInstance.cards.find(key => 
                CARD_MARKET[key] && CARD_MARKET[key].name.toLowerCase() === explicitTargetSearchString
            );

            if (!inventoryMatchedKey) {
                return message.reply(`❌ Search Failure: The player string lookup "${args.join(' ')}" matches no active card configurations inside your club inventory bench.`);
            }

            const uniqueCardNodeData = CARD_MARKET[inventoryMatchedKey];
            const visualPosterGraphicEmbed = new EmbedBuilder()
                .setTitle(`🎴 Athletic Asset Card Core Visual: ${uniqueCardNodeData.name}`)
                .setDescription(`This card file is safely preserved inside vault storage containers belonging to club manager: **${message.author.username}**.`)
                .addFields(
                    { name: "🌍 Origin Country", value: `${uniqueCardNodeData.nation}`, inline: true },
                    { name: "⚡ Power Rating Matrix", value: `\`${uniqueCardNodeData.ovr} OVR Base Level\``, inline: true },
                    { name: "🎯 Field Position Role", value: `\`${uniqueCardNodeData.pos}\``, inline: true }
                )
                .setImage(uniqueCardNodeData.image) // Visual rendering of sports graphic cards
                .setColor("#f1c40f")
                .setFooter({ text: "FIVB Trading Interface Secured • Vault Code Verification Checked" });

            return message.channel.send({ embeds: [visualPosterGraphicEmbed] });
        }

        if (complexProfileInstance.cards.length === 0) {
            return message.reply("📋 Inventory Empty: Your auxiliary team bench registers zero card items.");
        }

        // Branching Execution Flow: Standard alphanumeric roster listing layout configuration
        const indexRosterSummaryEmbed = new EmbedBuilder()
            .setTitle(`🎴 Club Storage Vault: ${message.author.username}`)
            .setDescription("Render standalone authentic graphical photo sports cards using structural query: `vvcards [Player Full Name]`\n*Example: `vvcards Yuji Nishida`*")
            .setColor("#2980b9")
            .setTimestamp();

        complexProfileInstance.cards.forEach((tokenKey, itemIndex) => {
            const assetReferenceNode = CARD_MARKET[tokenKey];
            if (assetReferenceNode) {
                indexRosterSummaryEmbed.addFields({
                    name: `${itemIndex + 1}. ${assetReferenceNode.name} ${assetReferenceNode.nation}`,
                    value: `Role: \`${assetReferenceNode.pos}\` | Rating Value: \`${assetReferenceNode.ovr} OVR\``,
                    inline: true
                });
            }
        });

        message.channel.send({ embeds: [indexRosterSummaryEmbed] });
    }
};
