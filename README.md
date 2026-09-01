# Bench
Track your seat time.
<div align="center">

# 🎧 votethevibe

### *the aux cord, but it's a tournament*

![status](https://img.shields.io/badge/status-in%20development-EEAAB3?style=for-the-badge)
![python](https://img.shields.io/badge/python-3.10+-1D52B4?style=for-the-badge&logo=python&logoColor=white)
![websockets](https://img.shields.io/badge/realtime-websockets-F5F2EC?style=for-the-badge&labelColor=1D52B4)
![vanilla js](https://img.shields.io/badge/frontend-vanilla%20js-EEAAB3?style=for-the-badge&logo=javascript&logoColor=white)
![license](https://img.shields.io/badge/license-MIT-C8B1B2?style=for-the-badge)

**scan · submit · showdown · crown the aux champion**

</div>

---

## 🪩 // WHAT IS THIS

**VoteTheVibe** is a real-time, party-game web app for crowning the best song in the room. Everyone scans a QR code, drops a track anonymously into the lobby, and the app builds a live single-elimination **bracket**. Songs go head-to-head in 15–30 second showdowns, players vote and spam reactions from their phones, and one track walks away as the **AUX CHAMPION** 👑

No app installs. No accounts. Just a TV, a WiFi network, and questionable music taste.

---

## ✨ // FEATURES

| | |
|---|---|
| 📱 | **QR-code join** — players hop in from their phone in seconds |
| 🎵 | **Anonymous submissions** — no judgment, just vibes |
| 🏆 | **Live tournament bracket** — single-elimination, auto-generated |
| ⚡ | **Real-time voting** — 15-second showdown rounds |
| 🔥 | **Live emoji reactions** — 🔥 🎺 🗑️ fly across the big screen |
| 📊 | **Live vote bars** — watch the crowd turn in real time |
| 👑 | **Confetti crowning ceremony** — because the winner deserves it |
| 🧠 | **Zero database** — fully in-memory, zero setup friction |

---

## 🎨 // THE LOOK

A high-end **retro-editorial indie magazine** aesthetic — think warm eggshell paper, dusty rose ink, and bold cobalt-blue headlines.

<div align="center">

| Token | Swatch | Hex | Use |
|---|---|---|---|
| `--bg-eggshell` | 🟨 | `#F5F2EC` | canvas / page background |
| `--accent-pink` | 🌸 | `#EEAAB3` | giant type, `//` slashes, accents |
| `--accent-blue` | 🟦 | `#1D52B4` | body text, buttons, active states |
| `--border-taupe` | 🟫 | `#C8B1B2` | card frames, dividers |
| `--pure-white` | ⬜ | `#FFFFFF` | cutout cards, badges |

</div>

**Type:** oversized lowercase `Syne` headlines that overlap the layout, set against clean `Space Grotesk` body copy.
**Shape language:** asymmetric cards (`28px 28px 8px 28px`) + fully pill-shaped buttons (`9999px`) 💊

---

## 🕹️ // HOW A GAME PLAYS OUT

```
  LOBBY  ──▶  SHOWDOWN  ──▶  RESULTS  ──▶  CROWN
   🎵           ⚔️             📊           👑
```

1. **`// LOBBY`** — host spins up a room, big QR code hits the screen, players join + submit one song each
2. **`// SHOWDOWN`** — tracks face off in pairs, phones light up with `[ VOTE TRACK A ]` vs `[ VOTE TRACK B ]`
3. **`// RESULTS`** — the clock hits zero, votes tally live, the winner advances
4. **`// CROWN`** — one track remains, confetti drops, the **Aux Champion** is revealed 🎉

---

## 🛠️ // TECH STACK

<div align="center">

![Python](https://img.shields.io/badge/-Python%203.10+-1D52B4?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/-FastAPI-EEAAB3?style=flat-square&logo=fastapi&logoColor=white)
![Socket.IO](https://img.shields.io/badge/-python--socketio-C8B1B2?style=flat-square&logo=socket.io&logoColor=white)
![HTML5](https://img.shields.io/badge/-HTML5-F5F2EC?style=flat-square&logo=html5&logoColor=1D52B4)
![CSS3](https://img.shields.io/badge/-CSS3-EEAAB3?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-Vanilla%20JS-1D52B4?style=flat-square&logo=javascript&logoColor=white)

</div>

- **Backend:** Python 3.10+ · FastAPI · `python-socketio`
- **Frontend:** pure Vanilla JS (ES6+), HTML5, CSS3 — **no React, no build step**
- **Realtime:** WebSockets for votes, room state, and floating reaction overlays
- **Storage:** in-memory only — no database required 🧠

---

## 📁 // PROJECT STRUCTURE

```text
votethevibe/
├── server/
│   ├── main.py              # FastAPI server + WebSocket event handlers
│   └── game_engine.py       # in-memory session, bracket, & voting logic
└── public/
    ├── css/
    │   └── style.css        # editorial design system styles
    ├── js/
    │   ├── host.js          # main-screen socket & audio logic
    │   └── player.js        # mobile controller logic
    ├── host.html             # main display UI (TV / laptop)
    └── player.html           # mobile controller UI (phone)
```

---

## 📡 // WEBSOCKET EVENT CONTRACT

| Event | Direction | Payload | What Happens |
|---|---|---|---|
| `create_room` | host → server | `{}` | generates a 4-letter room code |
| `join_room` | player → server | `{code, name}` | validates room, registers player |
| `submit_track` | player → server | `{code, track}` | adds track to the lobby |
| `start_game` | host → server | `{code}` | builds the bracket, starts `SHOWDOWN` |
| `cast_vote` | player → server | `{code, choice}` | validates + tallies a vote |
| `send_reaction` | player → server | `{code, emoji}` | broadcasts 🔥🎺🗑️ to the host screen |
| `state_update` | server → all | `{state, data}` | syncs every client instantly |

---

## 🚀 // GETTING STARTED

```bash
# clone it
git clone https://github.com/your-username/votethevibe.git
cd votethevibe

# install backend deps
pip install fastapi uvicorn python-socketio

# run the server
uvicorn server.main:app --reload --host 0.0.0.0 --port 8000
```

Then:
1. Open `http://<your-ip>:8000/host.html` on the big screen 🖥️
2. Everyone else scans the QR code with their phone 📱
3. Submit songs, vote, and vibe 🎶

---

## 🗺️ // ROADMAP

- [ ] Spotify / Apple Music search integration
- [ ] Custom bracket sizes (4 / 8 / 16 tracks)
- [ ] Persistent leaderboards across game nights
- [ ] Themeable color packs beyond the editorial default

---

<div align="center">

### 👑 may the best track win 👑

made for parties that take their playlists *very* seriously

</div>

