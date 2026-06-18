const { EmbedBuilder } = require('discord.js');
const db = require('../db');

module.exports = {
    name: 'debut',
    async execute(message, args) {
        const structuralId = message.author.id;
        const internalProfile = db.getProfile(structuralId);

        if (internalProfile.hasDebuted) {
            return message.reply("❌ System Rejection: Multiple profile registration triggers detected on current Snowflake token.");
        }

        // Initialize core state values
        internalProfile.hasDebuted = true;
        internalProfile.coins = 15000; // Starter fund bonus allocation
        internalProfile.cards = ["yuji_nishida", "paweł_zatorski"];
        internalProfile.xi[0] = "yuji_nishida";
        internalProfile.xi[5] = "paweł_zatorski";
        db.save();

        const welcomeKitEmbed = new EmbedBuilder()
            .setTitle("🏐 Welcome to the Elite Professional Volleyball Association")
            .setDescription(`Club Registry successfully authenticated for manager: **${message.author.username}**`)
            .addFields(
                { name: "💰 Starter Venture Funds", value: "`15,000` coins credited.", inline: true },
                { name: "🎴 Starter Base Assets", value: "Signed **Yuji Nishida** (OPPOSITE) and **Paweł Zatorski** (LIBERO)!", inline: false }
            )
            .setColor("#1abc9c")
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter({ text: "Issue command 'vvhelp' to inspect tactical gameplay procedures." });

        message.channel.send({ embeds: [welcomeKitEmbed] });
    }
};
