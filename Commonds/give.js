const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = {
    name: 'give',
    async execute(message, args) {
        const senderProfile = db.getProfile(message.author.id);
        if (!senderProfile.hasDebuted) return message.reply("❌ Run `vvdebut` to unlock access.");

        const structuralRecipientUser = message.mentions.users.first();
        if (!structuralRecipientUser) {
            return message.reply("⚠️ Syntax Deficiency: Correct pattern requires targeting syntax: `vvgive [Player Name] @User`.");
        }

        if (structuralRecipientUser.id === message.author.id) {
            return message.reply("❌ Error Context: Transfer loops targeting self are structural deadlocks.");
        }

        const structuralRecipientProfile = db.getProfile(structuralRecipientUser.id);
        if (!structuralRecipientProfile.hasDebuted) {
            return message.reply(`❌ Target Profile Inactive: ${structuralRecipientUser.username} must issue \`vvdebut\` first.`);
        }

        // Parse out the player query from the mention text blocks
        const clearedInputQuery = args.filter(token => !token.startsWith('<@')).join(' ').toLowerCase().trim();
        if (!clearedInputQuery) return message.reply("⚠️ Error: Missing player name value argument parsing block.");

        const matchedRegistryKey = senderProfile.cards.find(key => 
            CARD_MARKET[key] && (CARD_MARKET[key].name.toLowerCase() === clearedInputQuery || key === clearedInputQuery.replace(/\s+/g, '_'))
        );

        if (!matchedRegistryKey) {
            return message.reply(`❌ Asset Mismatch: No player matching "${clearedInputQuery}" found within your inventory array.`);
        }

        if (senderProfile.cards.length <= 1) {
            return message.reply("❌ Safeguard Triggered: Operational regulations enforce a minimum of 1 card on the active club bench.");
        }

        const structuralStorageIndex = senderProfile.cards.indexOf(matchedRegistryKey);
        
        // Execute structural state modifications
        senderProfile.cards.splice(structuralStorageIndex, 1);
        structuralRecipientProfile.cards.push(matchedRegistryKey);
        db.save();

        const giftTransmissionEmbed = new EmbedBuilder()
            .setTitle("🎁 Asset Contract Transmitted Successfully")
            .setDescription(`Club manager **${message.author.username}** has gifted a player asset card over to **${structuralRecipientUser.username}**'s core vault.`)
            .addFields(
                { name: "🎴 Card Transferred", value: `\`${CARD_MARKET[matchedRegistryKey].name}\``, inline: true },
                { name: "📊 Rating Strength", value: `\`${CARD_MARKET[matchedRegistryKey].ovr} OVR\``, inline: true }
            )
            .setImage(CARD_MARKET[matchedRegistryKey].image)
            .setColor("#9b59b6")
            .setTimestamp();

        message.channel.send({ embeds: [giftTransmissionEmbed] });
    }
};
