const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');
const db = require('../db');
const { runMatchSimulation } = require('../gameEngine');

module.exports = {
    name: 'play',
    async execute(message, args) {
        const executionAuthorProfile = db.getProfile(message.author.id);
        if (!executionAuthorProfile.hasDebuted) {
            return message.reply("❌ Access Blocked: You must run `vvdebut` before entering professional arenas.");
        }

        const runtimeLobbyManifest = {
            blue_player: { id: message.author.id, username: message.author.username },
            red_player: null,
            hostId: message.author.id
        };

        const registrationRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('register_blue').setLabel('Take Blue Court').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('register_red').setLabel('Take Red Court').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('launch_simulation').setLabel('Launch Match Engine').setStyle(ButtonStyle.Success)
        );

        const arenaLobbyEmbed = new EmbedBuilder()
            .setTitle("🏐 Professional Arena Lobby Open")
            .setDescription(`Hosted by Manager **${message.author.username}**.\nSelect court rotations below to coordinate match threads.`)
            .addFields(
                { name: "🔵 Blue Rotation Core Slot", value: `\`${runtimeLobbyManifest.blue_player.username}\``, inline: true },
                { name: "🔴 Red Rotation Core Slot", value: runtimeLobbyManifest.red_player ? `\`${runtimeLobbyManifest.red_player.username}\`` : "*Empty (Awaiting Opponent or Bot Routing)*", inline: true }
            )
            .setColor("#e67e22")
            .setFooter({ text: "Lobby will auto-expire in 45 seconds if structural launch is unexecuted." });

        const workspaceMessage = await message.channel.send({ embeds: [arenaLobbyEmbed], components: [registrationRow] });
        const interactiveCollector = workspaceMessage.createMessageComponentCollector({ componentType: ComponentType.Button, time: 45000 });

        interactiveCollector.on('collect', async (interaction) => {
            const activeProfile = db.getProfile(interaction.user.id);
            if (!activeProfile.hasDebuted) {
                return interaction.reply({ content: "❌ Operation Denied: Target profile unregistered. Use `vvdebut`.", ephemeral: true });
            }

            if (interaction.customId === 'register_blue') {
                if (runtimeLobbyManifest.red_player?.id === interaction.user.id) runtimeLobbyManifest.red_player = null;
                runtimeLobbyManifest.blue_player = { id: interaction.user.id, username: interaction.user.username };
                await interaction.reply({ content: "🔄 Court assignment shifted to Blue Team.", ephemeral: true });
            } 
            else if (interaction.customId === 'register_red') {
                if (runtimeLobbyManifest.blue_player?.id === interaction.user.id) runtimeLobbyManifest.blue_player = null;
                runtimeLobbyManifest.red_player = { id: interaction.user.id, username: interaction.user.username };
                await interaction.reply({ content: "🔄 Court assignment shifted to Red Team.", ephemeral: true });
            } 
            else if (interaction.customId === 'launch_simulation') {
                if (interaction.user.id !== runtimeLobbyManifest.hostId) {
                    return interaction.reply({ content: "❌ Command Hierarchy Error: Only the structural lobby host can run the engine.", ephemeral: true });
                }
                interactiveCollector.stop('validated_execution');
                return;
            }

            // Sync structural render states
            const refreshedEmbed = new EmbedBuilder()
                .setTitle("🏐 Professional Arena Lobby Active Configuration")
                .setDescription("Lobby structural profiles updated successfully in local session memory.")
                .addFields(
                    { name: "🔵 Blue Rotation Core Slot", value: runtimeLobbyManifest.blue_player ? `\`${runtimeLobbyManifest.blue_player.username}\`` : "*Vacant Position*", inline: true },
                    { name: "🔴 Red Rotation Core Slot", value: runtimeLobbyManifest.red_player ? `\`${runtimeLobbyManifest.red_player.username}\`` : "*Vacant Position (AI Route Override)*", inline: true }
                )
                .setColor("#e67e22");
            await workspaceMessage.edit({ embeds: [refreshedEmbed] });
        });

        interactiveCollector.on('end', (collectedItems, terminationReason) => {
            workspaceMessage.edit({ components: [] });
            if (terminationReason === 'validated_execution') {
                runMatchSimulation(message, runtimeLobbyManifest);
            } else {
                message.channel.send("⚠️ Operational Timeout: Lobby expired due to lack of confirmation input.");
            }
        });
    }
};
