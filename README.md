# SmartPark — Smart Parking Dashboard
 
A real-time parking slot monitoring web dashboard built for an Arduino Nano + HC-SR04 + SIM900 GSM IoT system.
 
## Live Demo
🔗 https://YOUR-USERNAME.github.io/smart-parking-dashboard
 
## Features
- Live slot status (Available / Occupied)
- Auto-refresh every 3 seconds
- Occupancy stats & capacity bar
- Activity feed with timestamps
- Fully responsive (mobile + desktop)
 
## Hardware Used
- Arduino Nano
- HC-SR04 Ultrasonic Sensors (×4)
- SIM900 GSM/GPRS Module
 
## Files
| File | Purpose |
|------|---------|
| `index.html` | Dashboard structure |
| `style.css` | Dark theme UI styles |
| `script.js` | Live data logic & simulation |
 
## Connect to Real Backend
In `script.js`, uncomment `fetchFromServer()` and replace `yourserver.com` with your actual API URL.
 
## Deployed via GitHub Pages
Settings → Pages → Deploy from branch → main
 
