```
╔════════════════════════════════════════════════════════════════════════════╗
║                    CYBER PRISM ONLINE ARCHITECTURE                         ║
║                         (You Have This Now!)                              ║
╚════════════════════════════════════════════════════════════════════════════╝


                              ┌─ PLAYER ─┐
                              │  (iPad)  │
                              └────┬────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                │         HTTP/JSON │ Requests        │
                │                  ▼                  │
          ┌─────────────────────────────────────┐
          │   GAME CLIENT (index.html)          │
          │   ├─ Canvas (Gameplay)              │
          │   ├─ Web Audio API (Sound)          │
          │   ├─ Particle System (Effects)      │
          │   └─ API Client (Fetch Wrapper)     │
          └────────────┬────────────────────────┘
                       │ GET/POST
                       │ Leaderboard
                       │ Daily Challenges
                       │
                   ┌───┴────┐
                   │Internet │
                   │  (WiFi) │
                   └───┬────┘
                       │
          ┌────────────▼────────────┐
          │    EXPRESS.JS SERVER    │
          │    (Node.js Backend)    │
          │                         │
          │  Routes:                │
          │  ├─ GET /daily-challs   │
          │  ├─ POST /daily-update  │
          │  ├─ GET /leaderboard    │
          │  ├─ POST /leaderboard   │
          │  ├─ GET /player/:name   │
          │  ├─ GET /server-time    │
          │  └─ GET /health         │
          │                         │
          │  Storage: In-Memory     │
          │  (Optional: MongoDB)    │
          └────────────┬────────────┘
                       │
              ┌────────┴────────┐
              │   Features      │
              │                 │
    ┌─────────▼─────────┐  ┌───▼──────────────┐
    │ DAILY CHALLENGES  │  │ LEADERBOARD      │
    │                   │  │                  │
    │ ✓ UTC Validated   │  │ ✓ Top 50 Players │
    │ ✓ Anti-Cheat      │  │ ✓ Ranked by:     │
    │ ✓ 4/day Random    │  │   - Wave         │
    │ ✓ 400-1000 Rewards│  │   - Kills        │
    │                   │  │   - Bits         │
    └───────────────────┘  │ ✓ Real-time      │
                           │ ✓ History Tracked│
                           └──────────────────┘


╔════════════════════════════════════════════════════════════════════════════╗
║                         DATA FLOW EXAMPLES                                  ║
╚════════════════════════════════════════════════════════════════════════════╝


1️⃣  DAILY CHALLENGE FLOW
────────────────────────────

Player:  "Open Daily Challenges menu"
   ↓
Game:    GET /api/daily-challenges
   ↓
Server:  Check UTC date
         If new day: Pick 4 random from 8 possible
         If same day: Return cached challenges
   ↓
Response: {
  "date": "2026-01-12",
  "challenges": [
    { id: "wave5", name: "Wave Warrior", desc: "Reach Wave 5", reward: 500 },
    { id: "kills50", name: "Exterminator", desc: "Kill 50 enemies", reward: 600 },
    { id: "bits1k", name: "Rich Collector", desc: "Earn 1000 bits", reward: 700 },
    { id: "boss", name: "Boss Slayer", desc: "Defeat boss", reward: 1000 }
  ]
}
   ↓
Player completes challenges in game
   ↓
Game: POST /api/daily-challenges/update
      { challengeId: "wave5", progress: 100, completed: true }
   ↓
Server: Updates challenge status
   ↓
Player: Sees ✅ checkmarks and total rewards


2️⃣  LEADERBOARD SUBMISSION FLOW
────────────────────────────────

Player finishes game run:
- Wave reached: 15
- Enemies killed: 50
- Bits earned: 5000
- Prestige level: 2
   ↓
Game: POST /api/leaderboard/submit
      {
        "playerName": "PlayerName",
        "wave": 15,
        "kills": 50,
        "bits": 5000,
        "prestigeLevel": 2
      }
   ↓
Server: Stores entry with timestamp
        Removes old entries from same player
        Sorts all entries: wave → kills → bits
        Keeps only top 50
   ↓
Response: {
  "success": true,
  "rank": 5,
  "message": "🔥 TOP 10 PLAYER!"
}
   ↓
Game displays: "You are Rank #5! 🔥"


3️⃣  LEADERBOARD VIEW FLOW
──────────────────────────

Player: "Open Leaderboard menu"
   ↓
Game: GET /api/leaderboard?limit=50
   ↓
Server: Returns top 50 entries sorted
   ↓
Response: {
  "timestamp": "2026-01-12T14:22:33Z",
  "entries": [
    { rank: 1, playerName: "ProPlayer", wave: 50, kills: 250, bits: 25000, prestigeLevel: 5 },
    { rank: 2, playerName: "WaveKing", wave: 48, kills: 240, bits: 24000, prestigeLevel: 4 },
    { rank: 3, playerName: "YOUR_NAME", wave: 15, kills: 50, bits: 5000, prestigeLevel: 2 },
    ...
  ]
}
   ↓
Game displays table with rankings


╔════════════════════════════════════════════════════════════════════════════╗
║                    DEPLOYMENT ARCHITECTURE                                 ║
╚════════════════════════════════════════════════════════════════════════════╝


LOCAL DEVELOPMENT
─────────────────
Your Computer            iPad on Same WiFi
└─ npm start             
   Port: 3000            
   http://192.168.1.100:3000
          ▲
          │ HTTP Request
          │
   localStorage.setItem('API_URL', 'http://192.168.1.100:3000')


PRODUCTION DEPLOYMENT
─────────────────────
GitHub Repository
      ↓
   Railway / Render / Heroku
      ↓
backend-url.onrender.com
      ↓
   Available Worldwide!
      ↓
Players download game from GitHub Pages
Set localStorage API_URL to production backend
      ↓
✅ Live Global Leaderboard!


╔════════════════════════════════════════════════════════════════════════════╗
║                    FALLBACK (OFFLINE) SYSTEM                                ║
╚════════════════════════════════════════════════════════════════════════════╝


Normal Flow:
─────────────
Try API ──── Success ──► Use Server Data
   │
   ├─ Failure ──► Check localStorage
                    │
                    ├─ Found ──► Use Local Backup ✅
                    │
                    └─ Not Found ──► Generate Default ✅
                                      (Game still playable!)


Result: Game ALWAYS works, even if:
  • Internet goes down
  • Backend server crashes
  • Network timeout


╔════════════════════════════════════════════════════════════════════════════╗
║                    YOUR TECH STACK                                          ║
╚════════════════════════════════════════════════════════════════════════════╝

Frontend:
├─ HTML5 Canvas (Game Rendering)
├─ Web Audio API (Sound Synthesis)
├─ CSS3 (UI Styling)
├─ Vanilla JavaScript (No frameworks!)
└─ Fetch API (HTTP Requests)

Backend:
├─ Node.js (Runtime)
├─ Express.js (HTTP Server)
├─ CORS Middleware (Cross-origin)
└─ In-Memory Storage (Optional: MongoDB)

Infrastructure:
├─ Local: http://localhost:3000 & :8000
├─ Production: Railway / Render / Heroku
├─ Games hosted: GitHub Pages
└─ Leaderboard: Cloud Backend

Deployment:
├─ Git (Version Control)
├─ npm (Package Manager)
└─ Docker (Optional for Heroku)


╔════════════════════════════════════════════════════════════════════════════╗
║                    QUICK COMMANDS                                           ║
╚════════════════════════════════════════════════════════════════════════════╝

# Start Backend
npm install
npm start

# Test Leaderboard API
curl http://localhost:3000/api/leaderboard | jq '.'

# Test Daily Challenges
curl http://localhost:3000/api/daily-challenges | jq '.'

# Check Server Health
curl http://localhost:3000/api/health | jq '.'

# Deploy to Railway
railway login
railway init
railway up

# Deploy to Render
# Go to render.com, connect repo, auto-deploys on push


╔════════════════════════════════════════════════════════════════════════════╗
║                    YOU ARE NOW READY FOR:                                   ║
╚════════════════════════════════════════════════════════════════════════════╝

✅ Local testing with backend
✅ iPad testing on same WiFi
✅ Production deployment
✅ Global player competition
✅ Real-time leaderboard
✅ Anti-cheat daily challenges
✅ Player stat tracking
✅ Offline fallback mode

Next: Deploy to production and share with players! 🚀

```
