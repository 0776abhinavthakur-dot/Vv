const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = {
    name: 'profile',
    async execute(message, args) {
        const structuralTarget = message.mentions.users.first() || message.author;
        const databaseRecord = db.getProfile(structuralTarget.id);

        if (!databaseRecord.hasDebuted) {
            return message.reply(`❌ Registry Failure: The target account account (${structuralTarget.username}) lacks structural data templates. Initialize with \`vvdebut\`.`);
        }

        // Calculate accurate squad averages based on active slots inside the lineup array
        let totalOvrCalculatedValue = 0;
        let structuralActiveSlotsCount = 0;

        databaseRecord.xi.forEach(slotKey => {
            if (slotKey && CARD_MARKET[slotKey]) {
                totalOvrCalculatedValue += CARD_MARKET[slotKey].ovr;
                structuralActiveSlotsCount++;
            }
        });

        const formattedTeamOvrValue = structuralActiveSlotsCount > 0 ? Math.round(totalOvrCalculatedValue / structuralActiveSlotsCount) : 0;
        const overallWins = databaseRecord.wins || 0;
        const overallLosses = databaseRecord.losses || 0;
        const calculatedWinRatio = (overallWins + overallLosses) > 0 ? ((overallWins / (overallWins + overallLosses)) * 100).toFixed(1) : "0.0";

        const statsDashboardEmbed = new EmbedBuilder()
            .setTitle(`🏐 Club HQ Operations Dashboard: ${structuralTarget.username}`)
            .setDescription(`System Authority: ${databaseRecord.isPremium ? "🟢 Tier-1 Premium Admin Partner" : "⚪ Standard Public Cluster User"}`)
            .addFields(
                { name: "🪙 Liquid Coins Banked", value: `\`${databaseRecord.coins.toLocaleString()} coins\``, inline: true },
                { name: "🎴 Total Inventory Assets", value: `\`${databaseRecord.cards.length} Cards Owned\``, inline: true },
                { name: "⭐ Squad Power Tier (OVR)", value: `💥 \`${formattedTeamOvrValue} Average OVR\``, inline: true },
                { name: "📈 Match Win/Loss Ledger", value: `🏆 Wins: \`${overallWins}\` | ❌ Losses: \`${overallLosses}\``, inline: true },
                { name: "📊 Operational Efficiency", value: `\`Win Rate: ${calculatedWinRatio}%\``, inline: true },
                { name: "🎯 Daily Achievements", value: `\`Completed Quests: ${databaseRecord.questsCompleted}\``, inline: true }
            )
            .setThumbnail(structuralTarget.displayAvatarURL({ dynamic: true }))
            .setColor("#1abc9c")
            .setFooter({ text: "Volleyball Engine v2.0 • Data Sync Status: Verified Secure" })
            .setTimestamp();

        message.channel.send({ embeds: [statsDashboardEmbed] });
    }
};
