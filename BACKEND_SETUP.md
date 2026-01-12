# CYBER PRISM - Backend Setup Guide

## Overview

Your game now connects to a backend server for:
- **Global Leaderboard**: See top 50 players worldwide
- **Daily Challenges**: Server-validated challenges that reset at UTC midnight (can't cheat!)
- **Player Ranking**: Compete globally in real-time

## Local Development Setup

### 1. Install Dependencies

```bash
cd /workspaces/Cyber-prism-meltdown
npm install
```

### 2. Start the Backend Server

```bash
npm start
```

Output:
```
🎮 CYBER PRISM Backend Server running on port 3000
📊 Leaderboard API: http://localhost:3000/api/leaderboard
⏰ Daily Challenges: http://localhost:3000/api/daily-challenges
```

### 3. Start the Game

In another terminal:
```bash
python3 -m http.server 8000
```

Open: `http://localhost:8000`

### 4. Test the Connection

The game will automatically connect to the backend. Check:
- **Leaderboard Screen**: Shows global top 50 players
- **Daily Challenges**: 4 random challenges reset at UTC midnight
- **Game Over**: Your score auto-uploads to leaderboard

---

## Deployment (Production)

### Option 1: Deploy to Railway (Recommended)

1. Install Railway CLI: https://docs.railway.app/getting-started
2. Login: `railway login`
3. Create project:
   ```bash
   railway init
   ```
4. Deploy backend:
   ```bash
   railway up
   ```
5. Get your backend URL from Railway dashboard
6. In game, localStorage will store the API URL

### Option 2: Deploy to Heroku (Free tier deprecated, use Render)

1. Sign up: https://render.com
2. Create new Web Service
3. Connect your GitHub repo
4. Set Environment: Node.js
5. Add to game: `localStorage.setItem('API_URL', 'https://your-backend.onrender.com')`

### Option 3: Deploy to Fly.io

1. Install: `curl -L https://fly.io/install.sh | sh`
2. Login: `flyctl auth login`
3. Launch: `flyctl launch`
4. Deploy: `flyctl deploy`

---

## API Endpoints Reference

### Daily Challenges
```
GET /api/daily-challenges
Response: { date, challenges: [ { id, name, desc, reward, progress, completed } ] }
```

```
POST /api/daily-challenges/update
Body: { challengeId, progress, completed }
```

### Leaderboard
```
GET /api/leaderboard?limit=50
Response: { timestamp, entries: [ { rank, playerName, wave, kills, bits, prestigeLevel } ] }
```

```
POST /api/leaderboard/submit
Body: { playerName, wave, kills, bits, prestigeLevel }
```

```
GET /api/leaderboard/player/:name
Response: { playerName, personalBest, totalRuns, entries }
```

### Utilities
```
GET /api/server-time
Response: { timestamp, utcDate, secondsUntilReset }

GET /api/health
Response: { status, timestamp, leaderboardSize, serverVersion }
```

---

## Client-Side Integration

The game automatically calls these APIs:

### On Game Start
```javascript
await API.getDailyChallenges();
```

### On Game Over
```javascript
await API.submitLeaderboardEntry(playerName, wave, kills, bits, prestigeLevel);
```

### View Leaderboard Menu
```javascript
const data = await API.getLeaderboard(50);
```

### Daily Challenge Progress
```javascript
await API.updateDailyChallenge(challengeId, progress, completed);
```

---

## Configuration

### Change API URL (for local vs production)

**Local Development:**
```javascript
// Automatic - defaults to http://localhost:3000
```

**Production:**
```javascript
// In browser console:
localStorage.setItem('API_URL', 'https://your-backend-url.com');
```

### Set Player Name

Currently defaults to "Player". To customize:
1. Edit game code or
2. Prompt player on game start

---

## Database Persistence (Optional)

Current setup stores in-memory (resets on server restart). For production:

### Add MongoDB

```bash
npm install mongoose
```

Update `server.js` to use MongoDB instead of in-memory arrays.

### Connection String
```
mongodb+srv://user:pass@cluster.mongodb.net/cyber-prism
```

### Services
- MongoDB Atlas (free tier): https://www.mongodb.com/cloud/atlas
- Supabase (PostgreSQL): https://supabase.com
- Firebase: https://firebase.google.com

---

## Testing

### Test Leaderboard API
```bash
curl http://localhost:3000/api/leaderboard
```

### Test Daily Challenges
```bash
curl http://localhost:3000/api/daily-challenges
```

### Submit Test Entry
```bash
curl -X POST http://localhost:3000/api/leaderboard/submit \
  -H "Content-Type: application/json" \
  -d '{"playerName":"TestPlayer","wave":15,"kills":50,"bits":5000,"prestigeLevel":1}'
```

---

## Troubleshooting

**Error: "Cannot connect to API"**
- Ensure backend is running: `npm start`
- Check API URL: `localStorage.getItem('API_URL')`
- Verify CORS is enabled (it is by default)

**Leaderboard empty**
- Backend was restarted (in-memory cleared)
- Add database persistence (see above)

**Daily challenges not resetting**
- Check server time: `curl http://localhost:3000/api/server-time`
- Uses UTC, not local time

**iPad connection issues**
- Get your computer's IP: `ifconfig` (look for inet)
- Set API URL: `localStorage.setItem('API_URL', 'http://YOUR_IP:3000')`

---

## Next Steps

1. Deploy backend to Railway/Render
2. Update game API_URL to production URL
3. Share your leaderboard link with players
4. Monitor player engagement on dashboard

Enjoy! 🎮
