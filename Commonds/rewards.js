const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = [
    {
        name: 'claim',
        async execute(message, args) {
            const activeProfileObj = db.getProfile(message.author.id);
            if (!activeProfileObj.hasDebuted) return message.reply("❌ Please initialize profile vectors using `vvdebut` command script.");

            const COOLDOWN_LIMIT_MS = 10800000; // Strict 3-Hour Validation Benchmark
            const runtimeDelta = Date.now() - activeProfileObj.lastClaim;

            if (runtimeDelta < COOLDOWN_LIMIT_MS) {
                const structuralRemainingTime = COOLDOWN_LIMIT_MS - runtimeDelta;
                const minutesCount = Math.floor((structuralRemainingTime / 1000 / 60) % 60);
                const hoursCount = Math.floor((structuralRemainingTime / 1000 / 60 / 60) % 24);
                return message.reply(`⏰ Verification Lockout: Free Agent Draft algorithms reset in exactly **${hoursCount}h ${minutesCount}m**.`);
            }

            const structuralRosterKeys = Object.keys(CARD_MARKET);
            const randomizedCardToken = structuralRosterKeys[Math.floor(Math.random() * structuralRosterKeys.length)];
            const chosenPlayerNode = CARD_MARKET[randomizedCardToken];

            activeProfileObj.cards.push(randomizedCardToken);
            activeProfileObj.lastClaim = Date.now();
            db.save();

            const draftRosterEmbed = new EmbedBuilder()
                .setTitle("🎲 Free Agent Draft Pool Allocation")
                .setDescription(`Congratulations Manager! **${chosenPlayerNode.name}** signed an allocation contract with your squad bench.`)
                .addFields(
                    { name: "🏐 Position Group", value: `\`${chosenPlayerNode.pos}\``, inline: true },
                    { name: "✨ Card Rating Scale", value: `\`${chosenPlayerNode.ovr} OVR\``, inline: true },
                    { name: "🌍 International Nationality", value: `${chosenPlayerNode.nation}`, inline: true }
                )
                .setImage(chosenPlayerNode.image)
                .setColor("#f1c40f")
                .setFooter({ text: "Draft sequence terminated. Cooldown matrix reloaded successfully." });

            message.channel.send({ embeds: [draftRosterEmbed] });
        }
    },
    {
        name: 'daily',
        async execute(message, args) {
            const targetProfile = db.getProfile(message.author.id);
            if (!targetProfile.hasDebuted) return message.reply("❌ Profile registration error tracking matrix.");

            const DAILY_TIMECAP_MS = 86400000; // Strict 24-Hour Calculation Boundary
            const calculatedTimePassed = Date.now() - targetProfile.lastDaily;

            if (calculatedTimePassed < DAILY_TIMECAP_MS) {
                const operationalRemainingTime = DAILY_TIMECAP_MS - calculatedTimePassed;
                const hoursRemaining = Math.floor(operationalRemainingTime / 1000 / 60 / 60);
                return message.reply(`⏰ Check-in Limit: Daily allowance lock resets in **${hoursRemaining} hours**.`);
            }

            db.addCoins(message.author.id, 5000);
            targetProfile.lastDaily = Date.now();
            db.save();

            message.reply("☀️ **Daily Financial Injection Confirmed:** Credited **+5,000 coins** to your standard operational corporate accounting vault!");
        }
    },
    {
        name: 'spin',
        async execute(message, args) {
            const spinCostValue = 500;
            if (!db.deductCoins(message.author.id, spinCostValue)) {
                return message.reply(`❌ Transaction Declined: Casino interaction vectors require a fee of **${spinCostValue}** coins.`);
            }

            const mathematicalOutcomes = [0, 150, 500, 1200, 3500, 7500];
            const computationalLuckRoll = mathematicalOutcomes[Math.floor(Math.random() * mathematicalOutcomes.length)];
            
            if (computationalLuckRoll > 0) {
                db.addCoins(message.author.id, computationalLuckRoll);
            }

            if (computationalLuckRoll > spinCostValue) {
                message.reply(`🎰 **Jackpot Hit!** Rulette wheel spat out a profit of **+${computationalLuckRoll} coins** 🪙!`);
            } else if (computationalLuckRoll === spinCostValue) {
                message.reply(`🎰 **Break Even:** Investment normalized. Returned exactly **${computationalLuckRoll} coins** back to vault accounts.`);
            } else {
                message.reply(`📉 **Net Loss:** Wheel rolled down to zero parameters. Consumed input entry tokens entirely. Returned **${computationalLuckRoll} coins**.`);
            }
        }
    },
    {
        name: 'cooldown',
        async execute(message, args) {
            const currentProfileInstance = db.getProfile(message.author.id);
            if (!currentProfileInstance.hasDebuted) return message.reply("❌ Profile non-existent.");

            const checkTimeMetricState = (lastExecutionTime, limits) => {
                const structuralDiff = Date.now() - lastExecutionTime;
                if (structuralDiff >= limits) return "🟢 Routine State Available Now";
                const totalCalculatedDifference = limits - structuralDiff;
                const parsedHours = Math.floor(totalCalculatedDifference / 1000 / 60 / 60);
                const parsedMinutes = Math.floor((totalCalculatedDifference / 1000 / 60) % 60);
                return `⏳ Locked for another [${parsedHours}h ${parsedMinutes}m]`;
            };

            const operationalReportString = `⏰ **Corporate Synchronization Time Registers:**\n\n` +
                `• **Draft Claims Loop (3hr):** ${checkTimeMetricState(currentProfileInstance.lastClaim, 10800000)}\n` +
                `• **Daily Coin Package (24hr):** ${checkTimeMetricState(currentProfileInstance.lastDaily, 86400000)}`;

            message.reply({ content: operationalReportString });
        }
    }
];
