const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = {
    name: 'buy',
    async execute(message, args) {
        const structuralProfile = db.getProfile(message.author.id);
        if (!structuralProfile.hasDebuted) {
            return message.reply("❌ Operational Warning: Access denied. Please issue `vvdebut` first.");
        }

        const explicitTargetInput = args.join(' ').toLowerCase().trim();
        if (!explicitTargetInput) {
            return message.reply("⚠️ Argument Deficit: Please pass down a real player name. Example: `vvbuy Yuji Nishida`.");
        }

        const discoveredKey = Object.keys(CARD_MARKET).find(key => 
            CARD_MARKET[key].name.toLowerCase() === explicitTargetInput || key === explicitTargetInput.replace(/\s+/g, '_')
        );

        if (!discoveredKey) {
            return message.reply(`❌ Search Failure: No player named "${args.join(' ')}" found inside standard market registries.`);
        }

        const staticAssetData = CARD_MARKET[discoveredKey];

        if (structuralProfile.cards.includes(discoveredKey)) {
            const dynamicDisplay = new EmbedBuilder()
                .setTitle(`🎴 Asset Double-Ownership Vector: ${staticAssetData.name}`)
                .setDescription(`Position Block: \`${staticAssetData.pos}\` \nOrigin Culture: ${staticAssetData.nation}`)
                .addFields(
                    { name: "⚡ Core Overall (OVR)", value: `\`${staticAssetData.ovr}\``, inline: true },
                    { name: "💰 Estimated Liquidation Value", value: `\`${Math.floor(staticAssetData.price * 0.5)} coins\``, inline: true }
                )
                .setImage(staticAssetData.image)
                .setColor("#2980b9")
                .setFooter({ text: "Status: Locked inside inventory array." });
            return message.channel.send({ embeds: [dynamicDisplay] });
        }

        if (structuralProfile.coins < staticAssetData.price) {
            return message.reply(`❌ Ledger Deficit: Purchase operation blocked. Asset requires **${staticAssetData.price.toLocaleString()}** coins. Balance: \`${structuralProfile.coins.toLocaleString()}\`.`);
        }

        db.deductCoins(message.author.id, staticAssetData.price);
        structuralProfile.cards.push(discoveredKey);
        db.save();

        const tradeReceiptEmbed = new EmbedBuilder()
            .setTitle("🎉 Transfer Agreement Formalized")
            .setDescription(`Successfully acquired pro card **${staticAssetData.name}** for your structural court squad roster!`)
            .addFields(
                { name: "💳 Commercial Payout debited", value: `\`-${staticAssetData.price.toLocaleString()} coins\``, inline: true },
                { name: "🛡️ Roster Space Status", value: `\`Total Inventory Count: ${structuralProfile.cards.length}\``, inline: true }
            )
            .setImage(staticAssetData.image)
            .setColor("#2ecc71")
            .setTimestamp();

        message.channel.send({ embeds: [tradeReceiptEmbed] });
    }
};
const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = {
    name: 'buy',
    async execute(message, args) {
        const structuralProfile = db.getProfile(message.author.id);
        if (!structuralProfile.hasDebuted) {
            return message.reply("❌ Operational Warning: Access denied. Please issue `vvdebut` first.");
        }

        const explicitTargetInput = args.join(' ').toLowerCase().trim();
        if (!explicitTargetInput) {
            return message.reply("⚠️ Argument Deficit: Please pass down a real player name. Example: `vvbuy Yuji Nishida`.");
        }

        const discoveredKey = Object.keys(CARD_MARKET).find(key => 
            CARD_MARKET[key].name.toLowerCase() === explicitTargetInput || key === explicitTargetInput.replace(/\s+/g, '_')
        );

        if (!discoveredKey) {
            return message.reply(`❌ Search Failure: No player named "${args.join(' ')}" found inside standard market registries.`);
        }

        const staticAssetData = CARD_MARKET[discoveredKey];

        if (structuralProfile.cards.includes(discoveredKey)) {
            const dynamicDisplay = new EmbedBuilder()
                .setTitle(`🎴 Asset Double-Ownership Vector: ${staticAssetData.name}`)
                .setDescription(`Position Block: \`${staticAssetData.pos}\` \nOrigin Culture: ${staticAssetData.nation}`)
                .addFields(
                    { name: "⚡ Core Overall (OVR)", value: `\`${staticAssetData.ovr}\``, inline: true },
                    { name: "💰 Estimated Liquidation Value", value: `\`${Math.floor(staticAssetData.price * 0.5)} coins\``, inline: true }
                )
                .setImage(staticAssetData.image)
                .setColor("#2980b9")
                .setFooter({ text: "Status: Locked inside inventory array." });
            return message.channel.send({ embeds: [dynamicDisplay] });
        }

        if (structuralProfile.coins < staticAssetData.price) {
            return message.reply(`❌ Ledger Deficit: Purchase operation blocked. Asset requires **${staticAssetData.price.toLocaleString()}** coins. Balance: \`${structuralProfile.coins.toLocaleString()}\`.`);
        }

        db.deductCoins(message.author.id, staticAssetData.price);
        structuralProfile.cards.push(discoveredKey);
        db.save();

        const tradeReceiptEmbed = new EmbedBuilder()
            .setTitle("🎉 Transfer Agreement Formalized")
            .setDescription(`Successfully acquired pro card **${staticAssetData.name}** for your structural court squad roster!`)
            .addFields(
                { name: "💳 Commercial Payout debited", value: `\`-${staticAssetData.price.toLocaleString()} coins\``, inline: true },
                { name: "🛡️ Roster Space Status", value: `\`Total Inventory Count: ${structuralProfile.cards.length}\``, inline: true }
            )
            .setImage(staticAssetData.image)
            .setColor("#2ecc71")
            .setTimestamp();

        message.channel.send({ embeds: [tradeReceiptEmbed] });
    }
};
