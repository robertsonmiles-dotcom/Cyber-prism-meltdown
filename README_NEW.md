# CYBER PRISM - V10.4 ULTIMATE EDITION

A hyper-polished cyberpunk arcade shooter with **100x visual juice**, **Web Audio synthesis**, **particles & effects**, and **online multiplayer features**.

## ✨ Features

### Gameplay
- Fast-paced arcade action with dual joystick controls
- Dynamic enemy waves with 6 enemy tiers
- Prestige/ascension meta-progression system
- Chassis customization & module synergies
- Ultimate ability system

### Polish & Effects
- **Web Audio API**: Real-time synthesized sound effects (zero latency, no file loading)
- **Particle System**: Multi-layer rendering with glow, directional physics, type-based decay
- **Screen Shake**: Dynamic camera feedback coordinated with events
- **Damage Numbers**: Critical hit styling with glow effects
- **Animations**: Smooth transitions, glitch effects, level-up sequences

### Long-Term Engagement
- ✅ **Daily Challenges**: 4 unique objectives reset at UTC midnight (server-validated)
- ✅ **Quest System**: 6 progressive missions with rewards
- ✅ **Prestige System**: Permanent bit multipliers (1.05x → 2.00x)
- ✅ **Global Leaderboard**: Top 50 players worldwide
- ✅ **Seasonal Events**: Rotating seasonal bonuses
- ✅ **Cosmetic Skins**: 8 purchasable ship skins
- ✅ **Achievements**: 20+ unlockable achievements

### Online Features
- 🌐 **Global Leaderboard**: Real-time ranking system
- 🌐 **Server-Validated Daily Challenges**: Anti-cheat protection (UTC sync)
- 🌐 **Player Ranking**: Compete against top players worldwide

## 🚀 Quick Start

### Local Development

**1. Install backend dependencies:**
```bash
npm install
```

**2. Start the backend server:**
```bash
npm start
# Server runs on http://localhost:3000
```

**3. In another terminal, start the game:**
```bash
python3 -m http.server 8000
# Game runs on http://localhost:8000
```

**4. Open browser and play:**
Visit `http://localhost:8000` and enjoy!

## 🌍 Deployment

### Deploy Backend (Choose One)

#### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Option 2: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Deploy automatically

#### Option 3: Heroku (via Docker)
```bash
heroku login
heroku create cyber-prism-backend
git push heroku main
```

### Update Game Configuration

Once backend is deployed, add to game startup:
```javascript
localStorage.setItem('API_URL', 'https://your-backend-url.com');
```

Or from browser console:
```javascript
localStorage.setItem('API_URL', 'https://cyber-prism-backend.onrender.com');
location.reload();
```

## 📱 Mobile / iPad

Works perfectly on iPad with optimized touch controls:
- Left joystick: Move ship
- Right joystick: Aim & shoot
- ULT button: Trigger ultimate ability
- Pause button: Pause/menu access

**Note for local network play on iPad:**
```javascript
// In browser console:
localStorage.setItem('API_URL', 'http://YOUR_COMPUTER_IP:3000');
```

## 🎮 Controls

### Keyboard
- **WASD / Arrow Keys**: Move
- **Mouse/Touch**: Aim & shoot
- **SPACE**: Trigger ultimate
- **P**: Pause
- **H**: Toggle hangar menu

### Touch (iPad/Mobile)
- **Left Zone**: Movement joystick
- **Right Zone**: Aim & shoot joystick
- **ULT Button**: Trigger ultimate ability

## 📊 Game Systems

### Daily Challenges (UTC Midnight Reset)
- Earn bonus bits for completing daily objectives
- 4 random challenges per day
- Rewards: 400-1000 bits
- Can't cheat - validated server-side!

### Quests
- 6 progressive missions
- Long-term goals for consistent engagement
- Rewards: 250-2000 bits

### Prestige System
- Reset game but keep permanent bit multiplier
- Unlock up to 5 prestige levels
- Multiplier progression: 1.05x → 1.10x → 1.20x → 1.50x → 2.00x
- Compete on prestige leaderboard

### Leaderboard
- Top 50 players tracked globally
- Ranked by: Wave → Kills → Bits
- Personal best tracking
- Historical run data

## 🔧 API Reference

### Endpoints

**Daily Challenges**
```
GET /api/daily-challenges
GET /api/daily-challenges/update (POST)
```

**Leaderboard**
```
GET /api/leaderboard?limit=50
POST /api/leaderboard/submit
GET /api/leaderboard/player/:name
```

**Utilities**
```
GET /api/server-time (UTC sync)
GET /api/health (health check)
```

See [BACKEND_SETUP.md](BACKEND_SETUP.md) for detailed API documentation.

## 🛠️ Tech Stack

- **Frontend**: HTML5 Canvas, Web Audio API, CSS3
- **Backend**: Node.js, Express.js, CORS
- **Storage**: In-memory (+ localStorage fallback)
- **Deployment**: Railway, Render, or Heroku

## 📦 Project Structure

```
Cyber-prism-meltdown/
├── index.html           # Game (all-in-one)
├── server.js            # Backend server
├── package.json         # Dependencies
├── README.md            # Documentation
├── BACKEND_SETUP.md     # Deployment guide
└── .git/               # Version control
```

## 🎯 Performance

- Optimized particle rendering with "lighter" composite mode
- Smart particle decay system prevents memory leaks
- 60 FPS gameplay on desktop and iPad
- Zero-latency Web Audio synthesis
- Efficient canvas rendering with culling

## 🐛 Troubleshooting

**"Cannot connect to API"**
- Ensure backend is running: `npm start`
- Check API URL in localStorage
- Verify CORS is enabled

**"Daily challenges not updating"**
- Check server time vs UTC
- Clear localStorage and refresh: `localStorage.clear()`

**"Leaderboard shows old data"**
- Backend uses in-memory storage (resets on restart)
- Deploy with database for persistence (see BACKEND_SETUP.md)

## 📈 Future Enhancements

- [ ] Persistent database (MongoDB/PostgreSQL)
- [ ] User authentication & accounts
- [ ] Friend rankings
- [ ] Clan/guild system
- [ ] In-game cosmetics shop
- [ ] Seasonal battle pass
- [ ] PvP tournaments
- [ ] Video replay system

## 🎨 Customization

### Change colors
Edit `:root` CSS variables:
```css
--cyan: #00f3ff;
--pink: #ff00ff;
--gold: #ffd700;
```

### Modify enemy stats
Edit `ENEMY_TIERS` array for difficulty balancing

### Adjust rewards
Edit `DAILY_CHALLENGES`, `QUESTS`, `PRESTIGE_REWARDS`

## 📝 License

MIT - Use and modify freely!

## 🙏 Credits

Created with ❤️ for arcade game lovers.

---

**Play Now**: [https://robertsonmiles-dotcom.github.io/Cyber-prism-meltdown/](https://robertsonmiles-dotcom.github.io/Cyber-prism-meltdown/)
