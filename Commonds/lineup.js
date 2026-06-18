const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = [
    {
        name: 'xi',
        async execute(message, args) {
            const systemProfile = db.getProfile(message.author.id);
            if (!systemProfile.hasDebuted) return message.reply("❌ Profile inactive. Run `vvdebut` first.");

            const specifiedIndexArg = parseInt(args[0]) - 1;
            const searchTargetString = args.slice(1).join(' ').toLowerCase().trim();

            if (!isNaN(specifiedIndexArg) && specifiedIndexArg >= 0 && specifiedIndexArg < 6 && searchTargetString) {
                const verifiedKeyMatch = systemProfile.cards.find(key => 
                    CARD_MARKET[key] && CARD_MARKET[key].name.toLowerCase() === searchTargetString
                );

                if (!verifiedKeyMatch) {
                    return message.reply(`❌ Match Error: No player named "${args.slice(1).join(' ')}" found inside your owned assets list.`);
                }

                // Check for double positioning collisions inside the starting lineup slots array
                const structuralCollisionIndex = systemProfile.xi.indexOf(verifiedKeyMatch);
                if (structuralCollisionIndex !== -1) {
                    systemProfile.xi[structuralCollisionIndex] = null; // Clean up old slot references automatically
                }

                systemProfile.xi[specifiedIndexArg] = verifiedKeyMatch;
                db.save();
                return message.reply(`✅ Position Lock: Assigned **${CARD_MARKET[verifiedKeyMatch].name}** to active Court Slot #${specifiedIndexArg + 1}.`);
            }

            const visualLineupEmbed = new EmbedBuilder()
                .setTitle(`📋 Active Starting 6 Line-up Grid: ${message.author.username}`)
                .setDescription("Configure layout parameters using syntax: `vvxi [Slot 1-6] [Player Name]`\nExample: `vvxi 1 Yuji Nishida`")
                .setColor("#34495e");

            for (let positionIndex = 0; positionIndex < 6; positionIndex++) {
                const slotKeyToken = systemProfile.xi[positionIndex];
                const resolvedPlayerNode = CARD_MARKET[slotKeyToken];

                if (resolvedPlayerNode) {
                    visualLineupEmbed.addFields({
                        name: `Court Position Slot #${positionIndex + 1}`,
                        value: `${resolvedPlayerNode.nation} **${resolvedPlayerNode.name}**\nRole: \`${resolvedPlayerNode.pos}\` | Rating: \`${resolvedPlayerNode.ovr} OVR\``,
                        inline: true
                    });
                } else {
                    visualLineupEmbed.addFields({
                        name: `Court Position Slot #${positionIndex + 1}`,
                        value: "*Empty Roster Space (AI Automated Dummy Filler Assigned)*",
                        inline: true
                    });
                }
            }

            message.channel.send({ embeds: [visualLineupEmbed] });
        }
    },
    {
        name: 'swap',
        async execute(message, args) {
            const structureProfileRef = db.getProfile(message.author.id);
            if (!structureProfileRef.hasDebuted) return message.reply("❌ Profile context missing.");

            const indexAlpha = parseInt(args[0]) - 1;
            const indexBeta = parseInt(args[1]) - 1;

            if (isNaN(indexAlpha) || isNaN(indexBeta) || indexAlpha < 0 || indexAlpha >= 6 || indexBeta < 0 || indexBeta >= 6) {
                return message.reply("⚠️ Syntax Violation: Range validation failure. Format required: `vvswap [Slot 1-6] [Slot 1-6]`.");
            }

            // Standard storage swap operation logic
            const temporaryHoldingToken = structureProfileRef.xi[indexAlpha];
            structureProfileRef.xi[indexAlpha] = structureProfileRef.xi[indexBeta];
            structureProfileRef.xi[indexBeta] = temporaryHoldingToken;
            
            db.save();
            message.reply(`🔄 Layout Shift Completed: Court structural positions [#${indexAlpha + 1}] and [#${indexBeta + 1}] have swapped rotational tracking fields.`);
        }
    }
];
