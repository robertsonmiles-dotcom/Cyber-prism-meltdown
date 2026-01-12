const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (use database in production)
let leaderboard = [];
let dailyChallengesSeed = {};

// === DAILY CHALLENGES ===
const DAILY_CHALLENGES = [
    { id: 'wave5', name: 'Wave Warrior', desc: 'Reach Wave 5', reward: 500, type: 'wave' },
    { id: 'kills50', name: 'Exterminator', desc: 'Kill 50 enemies', reward: 600, type: 'kills' },
    { id: 'bits1k', name: 'Rich Collector', desc: 'Earn 1000 bits', reward: 700, type: 'bits' },
    { id: 'nomiss', name: 'Untouchable', desc: 'Take 0 damage', reward: 800, type: 'damage' },
    { id: 'ult5', name: 'Ultimate Master', desc: 'Use ultimate 5 times', reward: 550, type: 'ult' },
    { id: 'level3', name: 'Upgrader', desc: 'Reach Level 3', reward: 650, type: 'level' },
    { id: 'boss', name: 'Boss Slayer', desc: 'Defeat a boss', reward: 750, type: 'boss' },
    { id: 'survive', name: 'Survivor', desc: 'Survive 5 minutes', reward: 600, type: time' }
];

// Generate daily seed for challenge selection (resets at UTC midnight)
function getDailySeed() {
    const now = new Date();
    const utcDate = now.toISOString().split('T')[0]; // YYYY-MM-DD UTC
    
    if (dailyChallengesSeed.date !== utcDate) {
        // New day - regenerate challenges
        const shuffled = [...DAILY_CHALLENGES].sort(() => Math.random() - 0.5);
        dailyChallengesSeed = {
            date: utcDate,
            challenges: shuffled.slice(0, 4).map(c => ({
                id: c.id,
                name: c.name,
                desc: c.desc,
                reward: c.reward,
                progress: 0,
                completed: false
            }))
        };
    }
    
    return dailyChallengesSeed.challenges;
}

// === LEADERBOARD ===
function saveLeaderboardEntry(player) {
    // Remove duplicate entries for this player
    leaderboard = leaderboard.filter(e => e.playerName !== player.playerName);
    
    // Add new entry
    leaderboard.push({
        playerName: player.playerName || 'Anonymous',
        wave: player.wave || 1,
        kills: player.kills || 0,
        bits: player.bits || 0,
        prestigeLevel: player.prestigeLevel || 0,
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0]
    });
    
    // Keep only top 50
    leaderboard.sort((a, b) => {
        if (b.wave !== a.wave) return b.wave - a.wave;
        if (b.kills !== a.kills) return b.kills - a.kills;
        return b.bits - a.bits;
    });
    leaderboard = leaderboard.slice(0, 50);
}

function getLeaderboard(limit = 50) {
    return leaderboard.slice(0, limit).map((entry, index) => ({
        rank: index + 1,
        ...entry
    }));
}

// === API ENDPOINTS ===

// GET daily challenges
app.get('/api/daily-challenges', (req, res) => {
    const challenges = getDailySeed();
    res.json({
        date: new Date().toISOString().split('T')[0],
        challenges: challenges
    });
});

// POST update daily challenge progress
app.post('/api/daily-challenges/update', (req, res) => {
    const { challengeId, progress, completed } = req.body;
    const challenges = getDailySeed();
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (challenge) {
        challenge.progress = progress;
        challenge.completed = completed;
        res.json({ success: true, challenge });
    } else {
        res.status(404).json({ error: 'Challenge not found' });
    }
});

// GET global leaderboard
app.get('/api/leaderboard', (req, res) => {
    const limit = req.query.limit || 50;
    res.json({
        timestamp: new Date().toISOString(),
        entries: getLeaderboard(parseInt(limit))
    });
});

// POST new leaderboard entry
app.post('/api/leaderboard/submit', (req, res) => {
    const { playerName, wave, kills, bits, prestigeLevel } = req.body;
    
    if (!playerName || wave === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    saveLeaderboardEntry({ playerName, wave, kills, bits, prestigeLevel });
    
    // Get player's current rank
    const entries = getLeaderboard();
    const rank = entries.findIndex(e => e.playerName === playerName) + 1;
    
    res.json({
        success: true,
        rank: rank,
        message: rank <= 10 ? '🔥 TOP 10 PLAYER!' : `Rank: #${rank}`
    });
});

// GET player's personal best
app.get('/api/leaderboard/player/:name', (req, res) => {
    const entries = getLeaderboard();
    const playerEntries = entries.filter(e => e.playerName === req.params.name);
    
    if (playerEntries.length === 0) {
        return res.status(404).json({ error: 'Player not found' });
    }
    
    const bestRun = playerEntries[0];
    res.json({
        playerName: req.params.name,
        personalBest: bestRun,
        totalRuns: playerEntries.length,
        entries: playerEntries
    });
});

// GET server time (for syncing daily challenges)
app.get('/api/server-time', (req, res) => {
    res.json({
        timestamp: new Date().toISOString(),
        utcDate: new Date().toISOString().split('T')[0],
        secondsUntilReset: 86400 - (Date.now() % 86400000) / 1000
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        leaderboardSize: leaderboard.length,
        serverVersion: '1.0.0'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🎮 CYBER PRISM Backend Server running on port ${PORT}`);
    console.log(`📊 Leaderboard API: http://localhost:${PORT}/api/leaderboard`);
    console.log(`⏰ Daily Challenges: http://localhost:${PORT}/api/daily-challenges`);
});
