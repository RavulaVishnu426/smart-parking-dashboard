// ── STATE ──
const slotNames  = ['Slot 1','Slot 2','Slot 3','Slot 4'];
const sensorPins = ['D2/D3','D4/D5','D6/D7','D8/D9'];
let slotStatus   = [0, 1, 0, 1]; // 0 = empty, 1 = occupied
let countdown    = 3;
 
// ── CLOCK ──
function updateClock() {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();
 
// ── RENDER SLOTS ──
function renderSlots() {
  const grid   = document.getElementById('slot-grid');
  const simRow = document.getElementById('sim-row');
  grid.innerHTML   = '';
  simRow.innerHTML = '';
 
  slotStatus.forEach((status, i) => {
    const isEmpty = status === 0;
 
    const card = document.createElement('div');
    card.className = `slot-card ${isEmpty ? 'empty' : 'occupied'}`;
    card.innerHTML = `
      <div class="slot-top">
        <div class="slot-number">Slot ${i + 1}</div>
        <div class="slot-badge ${isEmpty ? 'empty' : 'occupied'}">
          <div class="badge-dot"></div>
          ${isEmpty ? 'Available' : 'Occupied'}
        </div>
      </div>
      <div class="slot-icon">${isEmpty ? '🟢' : '🔴'}</div>
      <div class="slot-bottom">
        <div>
          <div class="slot-status-text">${isEmpty ? 'Free' : 'Taken'}</div>
          <div class="slot-sensor-label">Ultrasonic sensor</div>
        </div>
        <div class="sensor-chip">${sensorPins[i]}</div>
      </div>
    `;
    grid.appendChild(card);
 
    const btn = document.createElement('button');
    btn.className = `sim-btn ${!isEmpty ? 'active-toggle' : ''}`;
    btn.textContent = `Toggle S${i + 1}`;
    btn.onclick = () => toggleSlot(i);
    simRow.appendChild(btn);
  });
 
  updateStats();
}
 
// ── STATS ──
function updateStats() {
  const occupied  = slotStatus.filter(s => s === 1).length;
  const available = 4 - occupied;
  const pct       = Math.round((occupied / 4) * 100);
 
  document.getElementById('stat-available').textContent = available;
  document.getElementById('stat-occupied').textContent  = occupied;
  document.getElementById('stat-pct').textContent       = pct + '%';
 
  const fill = document.getElementById('cap-fill');
  fill.style.width = pct + '%';
 
  if (pct >= 75) {
    fill.style.background = 'linear-gradient(90deg,#ef4444,#f87171)';
  } else if (pct >= 50) {
    fill.style.background = 'linear-gradient(90deg,#f59e0b,#fbbf24)';
  } else {
    fill.style.background = 'linear-gradient(90deg,#22c55e,#4ade80)';
  }
}
 
// ── TOGGLE SLOT ──
function toggleSlot(i) {
  slotStatus[i] = slotStatus[i] === 0 ? 1 : 0;
  const occupied = slotStatus[i] === 1;
  addActivity(
    `Slot ${i + 1} is now ${occupied ? 'occupied' : 'available'}`,
    occupied ? 'red' : 'green'
  );
  renderSlots();
}
 
// ── ACTIVITY FEED ──
function addActivity(text, color) {
  const list = document.getElementById('activity-list');
  const time = new Date().toLocaleTimeString();
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = `
    <div class="activity-dot ${color}"></div>
    <div class="activity-text">${text}</div>
    <div class="activity-time">${time}</div>
  `;
  list.insertBefore(item, list.firstChild);
  while (list.children.length > 5) list.removeChild(list.lastChild);
}
 
// ── FETCH FROM REAL SERVER (uncomment when backend is ready) ──
// function fetchFromServer() {
//   fetch("http://yourserver.com/status")
//     .then(r => r.json())
//     .then(data => {
//       slotStatus = [+data.slot1, +data.slot2, +data.slot3, +data.slot4];
//       addActivity('Data refreshed from Arduino sensor', 'green');
//       renderSlots();
//     })
//     .catch(() => addActivity('Server connection failed — retrying...', 'red'));
// }
 
// ── SIMULATE FETCH (demo mode) ──
function simulateFetch() {
  addActivity('Polling sensor data from Arduino...', 'green');
  setTimeout(() => {
    const r = Math.floor(Math.random() * 4);
    const prev = slotStatus[r];
    slotStatus[r] = slotStatus[r] === 0 ? 1 : 0;
    if (prev !== slotStatus[r]) {
      addActivity(
        `Sensor update: Slot ${r + 1} → ${slotStatus[r] === 1 ? 'occupied' : 'available'}`,
        slotStatus[r] === 1 ? 'red' : 'green'
      );
    }
    renderSlots();
  }, 600);
}
 
// ── COUNTDOWN TIMER ──
setInterval(() => {
  countdown--;
  if (countdown <= 0) {
    countdown = 3;
    simulateFetch();
  }
  document.getElementById('countdown').textContent = countdown + 's';
}, 1000);
 
// ── INIT ──
renderSlots();
 
