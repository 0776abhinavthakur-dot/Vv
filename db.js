const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'db.json');

let database = {};

// Automated persistence safe check
function loadDatabase() {
    if (fs.existsSync(DATA_FILE)) {
        try {
            const fileData = fs.readFileSync(DATA_FILE, 'utf8');
            database = JSON.parse(fileData);
            console.log(` 💾 Local Database Registry mounted securely. Profile Records: ${Object.keys(database).length}`);
        } catch (e) {
            console.error(' ❌ Core Database Corrupted! Re-initializing backup clear state framework.', e);
            database = {};
            save();
        }
    } else {
        console.log(' ⚠️ Database file absent. Creating pristine db.json file array instantly...');
        database = {};
        save();
    }
}

function save() {
    try {
        const tempPath = `${DATA_FILE}.tmp`;
        fs.writeFileSync(tempPath, JSON.stringify(database, null, 4), 'utf8');
        fs.renameSync(tempPath, DATA_FILE);
    } catch (err) {
        console.error(' [SYSTEM EXCEPTION] Write execution blocked on JSON layer filesystem:', err);
    }
}

function getProfile(userId) {
    if (!database[userId]) {
        database[userId] = {
            coins: 10000,
            hasDebuted: false,
            wins: 0,
            losses: 0,
            cards: [],
            xi: [null, null, null, null, null, null],
            isPremium: false,
            lastClaim: 0,
            lastDaily: 0,
            questsCompleted: 0
        };
        save();
    }
    return database[userId];
}

loadDatabase();

module.exports = {
    getProfile,
    addCoins: (userId, amt) => {
        if (typeof amt !== 'number' || isNaN(amt) || amt < 0) return false;
        const profile = getProfile(userId);
        profile.coins += Math.floor(amt);
        save();
        return true;
    },
    deductCoins: (userId, amt) => {
        if (typeof amt !== 'number' || isNaN(amt) || amt < 0) return false;
        const profile = getProfile(userId);
        if (profile.coins < amt) return false;
        profile.coins -= Math.floor(amt);
        save();
        return true;
    },
    save
};
