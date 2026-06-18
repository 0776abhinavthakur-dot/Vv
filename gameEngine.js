const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const db = require('./db');
const { CARD_MARKET } = require('./market');

// Significantly expanded tactical matrix mapping real volleyball plays to defensive button mechanics
const GAME_MOVES = {
    "Spike Blast": { defensiveCounters: ["block", "dig"], graphicSign: "💥" },
    "Power Jump Serve": { defensiveCounters: ["dig", "slide"], graphicSign: "🫵" },
    "Setter Dump Deception": { defensiveCounters: ["pancake", "roll"], graphicSign: "🤫" },
    "Quick Middle Slide": { defensiveCounters: ["block", "slide"], graphicSign: "⚡" },
    "Back-Row Pipe Attack": { defensiveCounters: ["dig", "roll"], graphicSign: "✈️" },
    "Off-Speed Soft Tip": { defensiveCounters: ["pancake", "slide"], graphicSign: "🪶" },
    "Sharp Cross-Court Hammer": { defensiveCounters: ["block", "roll"], graphicSign: "🔨" },
    "Tactical Float Serve": { defensiveCounters: ["dig", "pancake"], graphicSign: "🍃" },
    "Block-Wipe Line Shot": { defensiveCounters: ["roll", "slide"], graphicSign: "🧼" },
    "Overpass Net Joust": { defensiveCounters: ["block", "pancake"], graphicSign: "🤺" },
    "Deep Corner Push": { defensiveCounters: ["slide", "dig"], graphicSign: "🎯" },
    "Monster Block Rebound": { defensiveCounters: ["roll", "pancake"], graphicSign: "🧱" }
};

async function runMatchSimulation(message, lobbyData) {
    let scoreTracker = { blue: 0, red: 0 };
    let sequenceNumber = 1;

    const controlMessage = await message.channel.send({ content: "⏳ Allocating server threads... Loading tactical profiles..." });

    // Mathematical weight calculations using structural player assets
    const evaluateTeamPower = (userId) => {
        if (!userId) return 70; // Fallback balance variable for AI bots
        const profile = db.getProfile(userId);
        let numericSum = 0, assignedCount = 0;
        profile.xi.forEach(slot => {
            if (slot && CARD_MARKET[slot]) {
                numericSum += CARD_MARKET[slot].ovr;
                assignedCount++;
            }
        });
        return assignedCount > 0 ? Math.floor(numericSum / assignedCount) : 75;
    };

    const powerBlue = evaluateTeamPower(lobbyData.blue_player?.id);
    const powerRed = evaluateTeamPower(lobbyData.red_player?.id);

    while (scoreTracker.blue < 3 && scoreTracker.red < 3) {
        const moves = Object.keys(GAME_MOVES);
        const activeMove = moves[Math.floor(Math.random() * moves.length)];
        const strategyData = GAME_MOVES[activeMove];

        const isBlueAttacking = sequenceNumber % 2 === 1;
        const offensiveSide = isBlueAttacking ? "Blue" : "Red";
        const defensiveSide = isBlueAttacking ? "Red" : "Blue";

        const defenseController = isBlueAttacking ? lobbyData.red_player : lobbyData.blue_player;
        const displayLabel = defenseController ? defenseController.username : "AI DeepMind Engine";

        const dynamicStatusEmbed = new EmbedBuilder()
            .setTitle(`🏐 Match Sequence #${sequenceNumber} — Team ${offensiveSide} Attacking`)
            .setDescription(`**Team ${offensiveSide}** deploys a **${strategyData.graphicSign} ${activeMove}**!\n🛡️ Target Controller **${displayLabel}**, choose your defensive response!`)
            .addFields(
                { name: "🔵 Blue Team OVR / Score", value: `Rating: \`${powerBlue}\` | **Score: ${scoreTracker.blue}**`, inline: true },
                { name: "🔴 Red Team OVR / Score", value: `Rating: \`${powerRed}\` | **Score: ${scoreTracker.red}**`, inline: true }
            )
            .setColor(isBlueAttacking ? "#3498db" : "#e74c3c")
            .setFooter({ text: "Action timeout: 12 seconds max response constraint." });

        const componentActionRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('dig').setLabel('Forearm Dig').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('block').setLabel('Spread Block').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('pancake').setLabel('Floor Pancake').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('roll').setLabel('Diving Roll').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('slide').setLabel('Slide Save').setStyle(ButtonStyle.Danger)
        );

        await controlMessage.edit({ content: " ", embeds: [dynamicStatusEmbed], components: [componentActionRow] });

        const interactionFilter = interact => {
            if (!defenseController) return !interact.user.bot;
            return interact.user.id === defenseController.id;
        };

        try {
            const outputCapture = await controlMessage.awaitMessageComponent({
                filter: interactionFilter,
                componentType: ComponentType.Button,
                time: 12000
            });

            await outputCapture.reply({ content: "🔄 Defensive interception registered on main loop.", ephemeral: true });

            // Core match logic evaluation
            const choice = outputCapture.customId;
            const successProbability = strategyData.defensiveCounters.includes(choice) ? 0.75 : 0.25;
            const operationalPowerModifier = (isBlueAttacking ? (powerRed / powerBlue) : (powerBlue / powerRed)) * 0.5;

            if (Math.random() + operationalPowerModifier >= successProbability) {
                if (defensiveSide === "Blue") scoreTracker.blue++; else scoreTracker.red++;
            } else {
                if (offensiveSide === "Blue") scoreTracker.blue++; else scoreTracker.red++;
            }
        } catch (timeoutError) {
            // Default point processing to the offensive team if timeout occurs
            if (offensiveSide === "Blue") scoreTracker.blue++; else scoreTracker.red++;
        }

        sequenceNumber++;
        await new Promise(resolve => setTimeout(resolve, 2500));
    }

    const isBlueVictor = scoreTracker.blue >= 3;
    const finalWinningSide = isBlueVictor ? "Blue Team" : "Red Team";

    const distributePayouts = (playerObject, identityString) => {
        if (!playerObject || !playerObject.id) return;
        const trackingProfile = db.getProfile(playerObject.id);
        const matchVictoryState = (identityString === "blue" && isBlueVictor) || (identityString === "red" && !isBlueVictor);

        if (matchVictoryState) {
            trackingProfile.wins++;
            db.addCoins(playerObject.id, 2500);
        } else {
            trackingProfile.losses++;
            db.addCoins(playerObject.id, 750);
        }
    };

    distributePayouts(lobbyData.blue_player, "blue");
    distributePayouts(lobbyData.red_player, "red");
    db.save();

    const championshipEmbed = new EmbedBuilder()
        .setTitle("🏁 Tournament Sequence Terminated")
        .setDescription(`🏆 **${finalWinningSide} Wins the Match Set!**\n\nFinal Metric Configuration Score: \`${scoreTracker.blue} - ${scoreTracker.red}\``)
        .addFields(
            { name: "💰 Victory Compensation", value: "+2,500 coins issued to winning clubs.", inline: true },
            { name: "🪙 Loss Allowance", value: "+750 coins issued to losing clubs.", inline: true }
        )
        .setColor("#f1c40f")
        .setTimestamp();

    await controlMessage.edit({ embeds: [championshipEmbed], components: [] });
}

module.exports = { runMatchSimulation };
