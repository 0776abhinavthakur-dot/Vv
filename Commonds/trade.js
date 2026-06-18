const { EmbedBuilder } = require('discord.js');
const db = require('../db');
const { CARD_MARKET } = require('../market');

module.exports = [
    {
        name: 'trade',
        async execute(message, args) {
            const primarySenderProfile = db.getProfile(message.author.id);
            if (!primarySenderProfile.hasDebuted) return message.reply("❌ Profile tracking error.");

            const absoluteRecipientTarget = message.mentions.users.first();
            const parsingFilterInput = args.slice(1).join(' ').toLowerCase().trim();

            if (!absoluteRecipientTarget || !parsingFilterInput) {
                return message.reply("⚠️ Syntax Exception: Strict execution format required: `vvtrade @User [Player Name]`");
            }

            const targetReceiverProfile = db.getProfile(absoluteRecipientTarget.id);
            if (!targetReceiverProfile.hasDebuted) {
                return message.reply("❌ Target node data context uninitialized.");
            }

            const targetedRegistryKey = primarySenderProfile.cards.find(key => 
                CARD_MARKET[key] && CARD_MARKET[key].name.toLowerCase() === parsingFilterInput
            );

            if (!targetedRegistryKey) {
                return message.reply(`❌ Validation Mismatch: Core asset matching design "${parsingFilterInput}" missing from storage banks.`);
            }

            if (primarySenderProfile.cards.length <= 1) {
                return message.reply("❌ Counterweight Error: Security rules prohibit clearing final remaining assets from data tables.");
            }

            const runtimeStorageIndex = primarySenderProfile.cards.indexOf(targetedRegistryKey);
            
            // Re-allocate values inside array variables
            primarySenderProfile.cards.splice(runtimeStorageIndex, 1);
            targetReceiverProfile.cards.push(targetedRegistryKey);
            db.save();

            message.reply(`🤝 **Trade Transaction Certified:** Successfully signed **${CARD_MARKET[targetedRegistryKey].name}** away to ${absoluteRecipientTarget.username}'s active organizational team control.`);
        }
    },
    {
        name: 'sell',
        async execute(message, args) {
            const userInventoryProfile = db.getProfile(message.author.id);
            if (!userInventoryProfile.hasDebuted) return message.reply("❌ Context validation missing.");

            const standardInputString = args.join(' ').toLowerCase().trim();
            if (!standardInputString) return message.reply("⚠️ Argument Deficit: Pass player item name. Example: `vvsell Wilfredo Leon`.");

            const isolatedCardKey = userInventoryProfile.cards.find(key => 
                CARD_MARKET[key] && CARD_MARKET[key].name.toLowerCase() === standardInputString
            );

            if (!isolatedCardKey) {
                return message.reply(`❌ Item Missing: "${args.join(' ')}" matches no indexed files inside your warehouse vectors.`);
            }

            if (userInventoryProfile.cards.length <= 1) {
                return message.reply("❌ Operational System Boundary: Total asset allocation cannot equal zero parameters.");
            }

            const processingIndex = userInventoryProfile.cards.indexOf(isolatedCardKey);
            const playerReferenceNode = CARD_MARKET[isolatedCardKey];
            const operationalRefundPayoutValue = Math.floor(playerReferenceNode.price * 0.50);

            userInventoryProfile.cards.splice(processingIndex, 1);
            db.addCoins(message.author.id, operationalRefundPayoutValue);
            db.save();

            message.reply(`♻️ **Asset Liquidation Processing Order Finished:** Released **${playerReferenceNode.name}** back to market pools. Payout processed: **+${operationalRefundPayoutValue.toLocaleString()} coins** (50% value standard).`);
        }
    },
    {
        name: 'multisell',
        async execute(message, args) {
            const coreVaultProfileRef = db.getProfile(message.author.id);
            if (!coreVaultProfileRef.hasDebuted) return message.reply("❌ Operational token mapping error.");

            if (coreVaultProfileRef.cards.length <= 1) {
                return message.reply("❌ Core Asset Warning: Your secondary reserve inventory storage bank contains zero surplus assets.");
            }

            let accruedFinancialProfits = 0;
            let calculatedLiquidationCount = 0;

            // Retain absolute item structure node baseline inside index location [0]
            while (coreVaultProfileRef.cards.length > 1) {
                const targetTokenPopped = coreVaultProfileRef.cards.pop();
                const staticValueRecord = CARD_MARKET[targetTokenPopped];
                if (staticValueRecord) {
                    accruedFinancialProfits += Math.floor(staticValueRecord.price * 0.50);
                    calculatedLiquidationCount++;
                }
            }

            db.addCoins(message.author.id, accruedFinancialProfits);
            db.save();

            message.reply(`♻️ **Bulk Liquidation Macro Subroutine Finished:** Disposed of **${calculatedLiquidationCount} auxiliary cards** from system storage tables. Financial returns credited: **+${accruedFinancialProfits.toLocaleString()} coins**.`);
        }
    }
];
