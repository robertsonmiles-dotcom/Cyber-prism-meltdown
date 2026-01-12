# 🧪 TESTING CHECKLIST

## Before You Deploy

Use this checklist to verify everything works correctly.

---

## ✅ Local Setup Testing

### Backend Installation
- [ ] `npm install` completes without errors
- [ ] `package.json` has express & cors
- [ ] `npm start` outputs "Server running on port 3000"
- [ ] No ENOENT or dependency errors

### API Health Check
```bash
curl http://localhost:3000/api/health
```
- [ ] Returns `{ "status": "online", ... }`
- [ ] Response time < 100ms
- [ ] No CORS errors in console

---

## ✅ Daily Challenges Testing

### 1. First Request
```bash
curl http://localhost:3000/api/daily-challenges
```
- [ ] Returns today's date (UTC format)
- [ ] Returns 4 challenges with: id, name, desc, reward, progress, completed
- [ ] Rewards range 400-1000 bits
- [ ] All challenges have unique IDs

### 2. Same Day Request
Make another request within seconds:
- [ ] Returns same 4 challenges (cached)
- [ ] No regeneration until UTC midnight

### 3. Update Progress
```bash
curl -X POST http://localhost:3000/api/daily-challenges/update \
  -H "Content-Type: application/json" \
  -d '{"challengeId":"wave5","progress":10,"completed":false}'
```
- [ ] Returns updated challenge
- [ ] progress=10 is reflected
- [ ] completed=false persists

### 4. Game Integration
In game menu:
- [ ] Open "DAILY CHALLENGES"
- [ ] See 4 random challenges
- [ ] Each has name, description, reward
- [ ] Reward amounts visible (e.g., "+500 BITS")

### 5. Challenge Tracking
During gameplay:
- [ ] Progress indicators update
- [ ] Completed challenges show ✅
- [ ] Bits added after game ends

---

## ✅ Leaderboard Testing

### 1. Submit Entry
```bash
curl -X POST http://localhost:3000/api/leaderboard/submit \
  -H "Content-Type: application/json" \
  -d '{"playerName":"TestPlayer","wave":15,"kills":50,"bits":5000,"prestigeLevel":0}'
```
- [ ] Returns `{ "success": true, "rank": 1, "message": "..." }`
- [ ] rank is >= 1
- [ ] Message says rank or "TOP 10" or similar

### 2. View Leaderboard
```bash
curl http://localhost:3000/api/leaderboard
```
- [ ] Returns array of entries
- [ ] Each entry has: rank, playerName, wave, kills, bits, timestamp
- [ ] Top 50 entries only
- [ ] Sorted correctly (by wave DESC, then kills DESC, then bits DESC)

### 3. Submit Multiple Entries
Submit 5 different runs:
- [ ] Each updates the leaderboard
- [ ] Player appears with best run only (old entries replaced)
- [ ] Rankings adjust dynamically
- [ ] Still shows only top 50

### 4. Get Player Stats
```bash
curl http://localhost:3000/api/leaderboard/player/TestPlayer
```
- [ ] Returns personalBest (best run)
- [ ] Returns totalRuns count
- [ ] Shows all historical entries
- [ ] PlayerName matches query

### 5. Game Integration
In game menu:
- [ ] Open "LEADERBOARD"
- [ ] See top 50 players
- [ ] Ranking numbers visible
- [ ] Sorted by wave, kills, bits
- [ ] Your run appears if submitted

### 6. Auto-Upload on Game End
During gameplay:
- [ ] Play a game run
- [ ] When game ends, score auto-uploads
- [ ] No manual submission needed
- [ ] Leaderboard updates in real-time

---

## ✅ Server Time Testing

```bash
curl http://localhost:3000/api/server-time
```
- [ ] Returns correct UTC timestamp
- [ ] Returns utcDate (YYYY-MM-DD format)
- [ ] secondsUntilReset is positive number
- [ ] Uses UTC, not local timezone

---

## ✅ CORS Testing

### From Browser Console
```javascript
fetch('http://localhost:3000/api/leaderboard')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```
- [ ] No CORS errors in console
- [ ] Data loads successfully
- [ ] Credentials not required

---

## ✅ Game Integration Testing

### Main Menu
- [ ] "DAILY CHALLENGES" button visible
- [ ] "LEADERBOARD" button visible
- [ ] Both buttons play audio on click
- [ ] Buttons are colored distinctly

### Daily Challenges Screen
- [ ] Loads within 2 seconds
- [ ] Shows 4 challenges
- [ ] Each challenge displays:
  - [ ] Name
  - [ ] Description
  - [ ] Reward amount
  - [ ] Progress bar (if started)
  - [ ] Completion status

### Leaderboard Screen
- [ ] Loads within 2 seconds
- [ ] Shows ranked table
- [ ] Each entry displays:
  - [ ] Rank (#1, #2, etc)
  - [ ] Player name
  - [ ] Wave reached
  - [ ] Enemies killed
  - [ ] Bits earned
  - [ ] Prestige level
- [ ] Scrollable if >10 entries
- [ ] Your entry highlighted

### Game Run
- [ ] Play a full game
- [ ] Game ends normally
- [ ] Score auto-uploads
- [ ] No "API Error" messages
- [ ] Game Over screen shows normal stats

### After Leaderboard Submit
- [ ] Player can view leaderboard again
- [ ] Their run appears with correct rank
- [ ] Rank is calculated correctly

---

## ✅ Offline Fallback Testing

### 1. Backend Running (Control Test)
- [ ] Leaderboard loads from API
- [ ] Daily challenges load from API
- [ ] Data is current

### 2. Stop Backend
```bash
# Press Ctrl+C in backend terminal
```

### 3. Test Offline Mode
- [ ] Refresh game page
- [ ] "LEADERBOARD" button still works
- [ ] Shows cached data from localStorage
- [ ] "DAILY CHALLENGES" still works
- [ ] Shows local challenges

### 4. Restart Backend
```bash
npm start
```
- [ ] Game reconnects automatically
- [ ] Leaderboard updates with latest
- [ ] No manual refresh needed

---

## ✅ iPad Testing

### Prerequisites
- [ ] Computer running backend: `npm start`
- [ ] iPad on same WiFi network
- [ ] Computer IP address: `ifconfig` or `ipconfig`

### Setup
On iPad Safari console:
```javascript
localStorage.setItem('API_URL', 'http://192.168.1.100:3000');
location.reload();
```

### Testing
- [ ] Game loads on iPad
- [ ] Daily challenges load
- [ ] Leaderboard loads
- [ ] Submit a run from iPad
- [ ] Run appears on leaderboard
- [ ] Desktop sees iPad's run

### Performance
- [ ] API calls complete within 2 seconds
- [ ] No lag in UI
- [ ] Particles render smoothly
- [ ] Touch controls responsive

---

## ✅ Edge Cases

### 1. Rapid Submissions
Submit 10 runs in quick succession:
- [ ] All process without error
- [ ] Rankings stay consistent
- [ ] No duplicate entries
- [ ] Only best run kept per player

### 2. Large Leaderboard
Insert 100 entries:
```bash
for i in {1..100}; do
  curl -X POST http://localhost:3000/api/leaderboard/submit \
    -H "Content-Type: application/json" \
    -d "{\"playerName\":\"Player$i\",\"wave\":$((RANDOM%50)),\"kills\":$((RANDOM%250)),\"bits\":$((RANDOM*50))}"
done
```
- [ ] API returns top 50 only
- [ ] Sorting correct
- [ ] No performance degradation
- [ ] Response time still <100ms

### 3. Special Characters in Name
Submit with name: `Player!@#$%^&*()`
- [ ] Stores without error
- [ ] Displays correctly
- [ ] No SQL injection issues
- [ ] Retrieve works correctly

### 4. Zero Values
Submit with wave=0, kills=0, bits=0:
- [ ] Accepts submission
- [ ] Ranks at bottom
- [ ] Displays as 0

### 5. Very Large Numbers
Submit with wave=999999, kills=999999, bits=999999:
- [ ] Accepts without error
- [ ] Displays correctly
- [ ] Sorts correctly
- [ ] No integer overflow

---

## ✅ Performance Testing

### Response Times
```bash
time curl http://localhost:3000/api/leaderboard
```
- [ ] GET leaderboard: <100ms
- [ ] GET daily-challenges: <100ms
- [ ] POST leaderboard/submit: <200ms
- [ ] GET server-time: <50ms

### Concurrent Requests
```bash
# Multiple requests simultaneously
for i in {1..10}; do curl http://localhost:3000/api/leaderboard &; done
wait
```
- [ ] All requests succeed
- [ ] No timeout errors
- [ ] No connection limit errors
- [ ] Data consistency maintained

---

## ✅ Error Handling

### Invalid Request
```bash
curl -X POST http://localhost:3000/api/leaderboard/submit \
  -H "Content-Type: application/json" \
  -d '{"playerName":"Test"}'  # Missing fields
```
- [ ] Returns 400 error
- [ ] Provides error message
- [ ] Game doesn't crash

### Non-Existent Player
```bash
curl http://localhost:3000/api/leaderboard/player/NonExistentPlayer
```
- [ ] Returns 404
- [ ] Provides error message
- [ ] Game handles gracefully

### Server Error Simulation
```bash
# Restart server during request
```
- [ ] Game detects connection failure
- [ ] Uses localStorage fallback
- [ ] Shows appropriate message
- [ ] Retries when server comes back

---

## ✅ Browser DevTools Testing

### Network Tab
- [ ] Monitor all API calls
- [ ] Verify GET/POST methods
- [ ] Check response headers (CORS, Content-Type)
- [ ] Verify response bodies (JSON)

### Console Tab
- [ ] No JavaScript errors
- [ ] No CORS warnings
- [ ] No 404s on resources
- [ ] Network requests logged (optional)

### Storage Tab
- [ ] localStorage shows API_URL
- [ ] localStorage shows leaderboard backup
- [ ] localStorage shows daily challenges backup
- [ ] No unnecessary data stored

---

## ✅ Documentation Testing

### README.md
- [ ] Instructions are clear
- [ ] Commands work as written
- [ ] Links are correct
- [ ] No broken references

### BACKEND_SETUP.md
- [ ] Deployment steps accurate
- [ ] API endpoints documented correctly
- [ ] Troubleshooting helps solve real issues

### QUICK_START.md
- [ ] Quick start works in <5 minutes
- [ ] Screenshots/diagrams accurate
- [ ] No missing prerequisites

---

## ✅ Final Verification

Before deploying to production:

- [ ] All tests above pass
- [ ] No console errors in game
- [ ] No errors in backend terminal
- [ ] Leaderboard displays correctly
- [ ] Daily challenges work
- [ ] iPad connection verified
- [ ] Offline fallback tested
- [ ] Documentation complete

---

## 🚀 Ready to Deploy!

If all ✅ boxes are checked:

```bash
# Deploy backend
railway login
railway init
railway up

# Get production URL from Railway

# Update game
localStorage.setItem('API_URL', 'https://your-production-url.com');

# Test on production
curl https://your-production-url.com/api/health
```

---

**Record your test results below:**

```
Backend: ✅ / ⚠️ / ❌
Daily Challenges: ✅ / ⚠️ / ❌
Leaderboard: ✅ / ⚠️ / ❌
iPad Testing: ✅ / ⚠️ / ❌
Documentation: ✅ / ⚠️ / ❌

Issues Found:
- 

Ready to Deploy: YES / NO
```

Good luck! 🎮
