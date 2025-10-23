import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import './index.css'

// Cyber City animation function
const createCyberCity = () => {
  const container = document.createElement('div');
  container.className = 'cyber-city-bg';
  document.querySelector('.chat-room').appendChild(container);

  // Create city skyline
  const skyline = document.createElement('div');
  skyline.className = 'city-skyline';
  container.appendChild(skyline);

  // Create buildings
  const buildingPositions = [5, 15, 25, 40, 55, 70, 85];
  buildingPositions.forEach(pos => {
    const building = document.createElement('div');
    const heightType = Math.random();
    if (heightType > 0.7) {
      building.className = 'building building-tall';
    } else if (heightType > 0.4) {
      building.className = 'building building-medium';
    } else {
      building.className = 'building building-short';
    }
    building.style.left = `${pos}%`;
    skyline.appendChild(building);

    // Add windows to building
    for (let i = 0; i < 8; i++) {
      const window = document.createElement('div');
      window.className = `building-window ${Math.random() > 0.7 ? (Math.random() > 0.5 ? 'blue' : 'purple') : ''}`;
      window.style.left = `${10 + Math.random() * 60}%`;
      window.style.top = `${10 + Math.random() * 80}%`;
      window.style.animationDelay = `${Math.random() * 3}s`;
      building.appendChild(window);
    }
  });

  // Create flying cars
  for (let i = 0; i < 6; i++) {
    const car = document.createElement('div');
    car.className = 'flying-car';
    car.style.top = `${20 + Math.random() * 50}%`;
    car.style.animationDelay = `${Math.random() * 10}s`;
    car.style.animationDuration = `${15 + Math.random() * 10}s`;
    container.appendChild(car);
  }

  // Create neon signs
  const neonTexts = ['NEKOTRON', 'CYBERDINE', 'OMNI-CORP', 'SYNAPSE', 'NEXUS', 'VOID'];
  for (let i = 0; i < 4; i++) {
    const sign = document.createElement('div');
    sign.className = `neon-sign ${Math.random() > 0.5 ? (Math.random() > 0.5 ? 'blue' : 'green') : ''}`;
    sign.textContent = neonTexts[Math.floor(Math.random() * neonTexts.length)];
    sign.style.left = `${10 + Math.random() * 80}%`;
    sign.style.top = `${60 + Math.random() * 20}%`;
    sign.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(sign);
  }

  // Create rain
  for (let i = 0; i < 40; i++) {
    const rain = document.createElement('div');
    rain.className = 'rain-drop';
    rain.style.left = `${Math.random() * 100}%`;
    rain.style.animationDelay = `${Math.random() * 5}s`;
    rain.style.animationDuration = `${1 + Math.random() * 2}s`;
    container.appendChild(rain);
  }

  // Create hologram ads
  const adTexts = ['BUY NOW', 'SYNTH NET', 'UPGRADE', 'DATA FLOW', 'CONNECT'];
  for (let i = 0; i < 5; i++) {
    const ad = document.createElement('div');
    ad.className = 'hologram-ad';
    ad.textContent = adTexts[Math.floor(Math.random() * adTexts.length)];
    ad.style.left = `${15 + Math.random() * 70}%`;
    ad.style.top = `${30 + Math.random() * 40}%`;
    ad.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(ad);
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Add cyber city after render
setTimeout(() => {
  if (document.querySelector('.chat-room')) {
    createCyberCity();
  }
}, 100);