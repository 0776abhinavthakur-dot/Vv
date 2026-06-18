const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = [
    {
        name: 'help',
        async execute(message, args) {
            const gridLayoutHelpMenuEmbed = new EmbedBuilder()
                .setTitle("🏐 Volleyball Pro Simulation Engine Help Index Matrix")
                .setDescription("Production Framework Node Active Configuration • Prefix: `vv`")
                .addFields(
                    { name: "🎴 ECONOMY OPERATIONS LAYER", value: "`vvbalance` | `vvbuy [player]` | `vvclaim` | `vvdaily` | `vvquest` | `vvspin`", inline: false },
                    { name: "🏐 COURT GAME ENGINE CONTROLS", value: "`vvdebut` | `vvnews` | `vvplay` | `vvteam` | `vvxi`", inline: false },
                    { name: "⚙️ DIAGNOSTICS & SYSTEM UTILITIES", value: "`vvcooldown` | `vvfind [role]` | `vvhelp` | `vvping`", inline: false },
                    { name: "📦 PLAYER ASSET INFRASTRUCTURE", value: "`vvcards` | `vvgive [player] @user` | `vvmultisell` | `vvprofile` | `vvsell [player]` | `vvswap [s1] [s2]` | `vvtrade @user [player]`", inline: false }
                )
                .setColor("#2c3e50")
                .setFooter({ text: "All commands mirror structural constraints from architectural design photo matrices perfectly." })
                .setTimestamp();

            message.channel.send({ embeds: [gridLayoutHelpMenuEmbed] });
        }
    },
    {
        name: 'balance',
        async execute(message, args) {
            const targetingUserEntity = message.mentions.users.first() || message.author;
            const contextProfile = db.getProfile(targetingUserEntity.id);
            message.reply(`💰 **Financial Registry Balance:** Account holder \`${targetingUserEntity.username}\` currently registers **${contextProfile.coins.toLocaleString()}** standard issue tokens inside cloud banking ledgers.`);
        }
    },
    {
        name: 'ping',
        async execute(message, args) {
            message.reply(`🏓 **Diagnostic Link Latency Framework:** System WebSocket Gateway Heartbeat reads exactly: \`${message.client.ws.ping}ms\`.`);
        }
    },
    {
        name: 'news',
        async execute(message, args) {
            message.reply("📰 **FIVB Professional Patch Notes Update:** Core engine refactored down completely to exactly 15 enterprise files running 175 *fully authenticated real international superstar athletes* simultaneously.");
        }
    },
    {
        name: 'quest',
        async execute(message, args) {
            message.reply("🎯 **Active Club Objectives Panel:** Complete 3 arena simulations using the `vvplay` matchmaking script engine to yield a Tier-1 high-tier bonus coin package instantly!");
        }
    },
    {
        name: 'team',
        async execute(message, args) {
            const registryProfile = db.getProfile(message.author.id);
            let ratingAggregator = 0;
            let validatedSlots = 0;

            registryProfile.xi.forEach(cardTokenKey => {
                if (cardTokenKey && CARD_MARKET[cardTokenKey]) {
                    ratingAggregator += CARD_MARKET[cardTokenKey].ovr;
                    validatedSlots++;
                }
            });

            const trueTeamOvrAverageValue = validatedSlots > 0 ? Math.round(ratingAggregator / validatedSlots) : 60;
            message.reply(`⭐ **Club Roster Matrix Evaluation:** Structural computation calculated your core 6 line-up team rating scale index at exactly: **${trueTeamOvrAverageValue} OVR Power Level**.`);
        }
    }
];
