import React, { useState, useMemo, useEffect, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


/* Single-file FoodprintDetective with fixes:
   - PlayerMarker uses forwardRef so ref points to absolutely-positioned wrapper
   - AisleColumn computes player position relative to .game-scene and clamps it
   - shelf image path = /assets/shelf.png (put that file in public/assets)
*/

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Beef Steak', aisle: 'Meat & Dairy', score: 20, co2: 60, water: 24000, deforest: 80, img: null, emoji: '🥩' },
  { id: 2, name: 'Local Apples', aisle: 'Fruits & Veg', score: 8, co2: 3, water: 822, deforest: 2, img: null, emoji: '🍎' },
  { id: 3, name: 'Imported Avocado', aisle: 'Fruits & Veg', score: 15, co2: 12, water: 1700, deforest: 45, img: null, emoji: '🥑' },
  { id: 4, name: 'Packaged Chips', aisle: 'Packaged Goods', score: 12, co2: 9, water: 300, deforest: 5, img: null, emoji: '🥔' },
  { id: 5, name: 'Tofu', aisle: 'Fruits & Veg', score: 4, co2: 2, water: 300, deforest: 1, img: null, emoji: '🧈' },
  { id: 6, name: 'Orange Juice', aisle: 'Beverages', score: 10, co2: 8, water: 1200, deforest: 6, img: null, emoji: '🧃' },
  { id: 7, name: 'Milk Carton', aisle: 'Meat & Dairy', score: 14, co2: 10, water: 1000, deforest: 5, img: null, emoji: '🥛' },
  { id: 8, name: 'Canned Beans', aisle: 'Packaged Goods', score: 5, co2: 2, water: 100, deforest: 0, img: null, emoji: '🥫' },
  { id: 9, name: 'Cheese Block', aisle: 'Meat & Dairy', score: 18, co2: 15, water: 5000, deforest: 10, img: null, emoji: '🧀' },
  { id: 10, name: 'Bananas', aisle: 'Fruits & Veg', score: 7, co2: 4, water: 700, deforest: 3, img: null, emoji: '🍌' },
];

function buildAisles(data) {
  const map = {};
  data.forEach(p => { map[p.aisle] = map[p.aisle] || []; map[p.aisle].push(p); });
  const sorted = ['Fruits & Veg', 'Packaged Goods', 'Meat & Dairy', 'Beverages'].filter(n => map[n]);
  return sorted.map(name => ({ name, items: map[name] }));
}

function usePlayerControls(aislesData, onScan) {
  const aisles = useMemo(() => buildAisles(aislesData), [aislesData]);
  const [aisleIndex, setAisleIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);

  useEffect(() => {
    setAisleIndex(ai => Math.max(0, Math.min(ai, aisles.length - 1)));
    setItemIndex(ii => Math.max(0, Math.min(ii, (aisles[aisleIndex]?.items?.length || 1) - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aisles.length]);

  useEffect(() => {
    function handleKey(e) {
      const key = e.key;
      if (['ArrowLeft', 'a', 'A'].includes(key)) {
        e.preventDefault();
        setItemIndex(i => {
          const len = aisles[aisleIndex]?.items?.length || 1;
          return (i - 1 + len) % len;
        });
      } else if (['ArrowRight', 'd', 'D'].includes(key)) {
        e.preventDefault();
        setItemIndex(i => {
          const len = aisles[aisleIndex]?.items?.length || 1;
          return (i + 1) % len;
        });
      } else if (['ArrowUp', 'w', 'W'].includes(key)) {
        e.preventDefault();
        setAisleIndex(ai => {
          const next = Math.max(0, ai - 1);
          setItemIndex(idx => Math.min(idx, (aisles[next]?.items?.length || 1) - 1));
          return next;
        });
      } else if (['ArrowDown', 's', 'S'].includes(key)) {
        e.preventDefault();
        setAisleIndex(ai => {
          const next = Math.min(aisles.length - 1, ai + 1);
          setItemIndex(idx => Math.min(idx, (aisles[next]?.items?.length || 1) - 1));
          return next;
        });
      } else if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        const product = aisles[aisleIndex]?.items?.[itemIndex];
        if (product && typeof onScan === 'function') onScan(product);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [aisles, aisleIndex, itemIndex, onScan]);

  return { aisles, aisleIndex, itemIndex, setAisleIndex, setItemIndex };
}

// forwardRef so parent can control absolute wrapper directly
const PlayerMarker = forwardRef(function PlayerMarker(_, ref) {
  // try a few common filenames as subtle fallback (developer should ensure file exists)
  const src = '/assets/detective.png'; // recommended name
  return (
    <div ref={ref} className="player-marker-wrapper" aria-hidden>
      <img src={src} alt="" className="player-sprite"  />
    </div>
  );
});

function AisleColumn({ aisle, aisleIdx, selectedAisleIdx, selectedItemIdx, onClick, playerPositionRef }) {
  const aisleRef = useRef(null);

  useEffect(() => {
    // position player marker when the selected item is in this aisle
    if (aisleIdx !== selectedAisleIdx) return;
    const selectedItemElement = aisleRef.current?.querySelector('.product-card.selected');
    const scene = document.querySelector('.game-scene');
    const playerEl = playerPositionRef?.current;
    if (!selectedItemElement || !scene || !playerEl) return;

    const itemRect = selectedItemElement.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();

    // compute center X relative to scene left & bottom coordinate for Y
    let rawX = itemRect.left + itemRect.width / 2 - sceneRect.left;
    let rawY = itemRect.bottom - sceneRect.top + 6;

    // clamp within visible scene bounds (leave 20px padding)
    const padding = 16;
    const minX = padding;
    const maxX = Math.max(padding, sceneRect.width - padding);
    const minY = 40; // player shouldn't go above this within scene
    const maxY = Math.max(60, sceneRect.height - 10);

    const clampedX = Math.max(minX, Math.min(rawX, maxX));
    const clampedY = Math.max(minY, Math.min(rawY, maxY));

    // translate so sprite centers horizontally (sprite width ~50)
    playerEl.style.transform = `translate(${clampedX - 25}px, ${clampedY - 100}px)`;
    // ensure visible
    playerEl.style.visibility = 'visible';
  }, [aisleIdx, selectedAisleIdx, selectedItemIdx, playerPositionRef, aisle.items]);

  return (
    <div ref={aisleRef} className="aisle-column">
      <div className="aisle-header">{aisle.name}</div>
      <div className="aisle-shelf-bg" />
      <div className="aisle-items-grid">
        {aisle.items.map((item, idx) => {
          const selected = aisleIdx === selectedAisleIdx && idx === selectedItemIdx;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onClick(item)}
              className={`product-card ${selected ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
            >
              {item.img ? (
                <img src={item.img} alt={item.name} className="product-image" />
              ) : (
                <div className="product-emoji">{item.emoji || '🍏'}</div>
              )}
              <div className="product-name">{item.name}</div>
              <div className="product-score">Eco {item.score}</div>

              {selected && (
                <motion.div
                  className="product-highlight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function FoodprintDetective() {
  const [scanned, setScanned] = useState([]);
  const [active, setActive] = useState(null);
  const [badges, setBadges] = useState([]);
  const playerPositionRef = useRef(null);

  const scanAudio = useRef(typeof Audio !== 'undefined' ? new Audio('/assets/sound-scan.mp3') : null);
  const stepAudio = useRef(typeof Audio !== 'undefined' ? new Audio('/assets/sound-step.mp3') : null);

  function handleScan(product) {
    setActive(product);
    if (scanAudio.current) { scanAudio.current.currentTime = 0; scanAudio.current.play().catch(()=>{}); }
    setScanned(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      const next = [...prev, product];
      const newAvg = Math.round(next.reduce((s, x) => s + x.score, 0) / next.length);
      if (newAvg <= 7 && !badges.includes('Green Shopper')) setBadges(b => [...b, 'Green Shopper']);
      if (next.length >= 4 && !badges.includes('Eco Researcher')) setBadges(b => [...b, 'Eco Researcher']);
      return next;
    });
  }

  const aislesData = useMemo(() => SAMPLE_PRODUCTS, []);
  const { aisles, aisleIndex, itemIndex } = usePlayerControls(aislesData, (p) => handleScan(p));

  const avgScore = scanned.length ? Math.round(scanned.reduce((s, x) => s + x.score, 0) / scanned.length) : 0;
  const gameScore = Math.max(0, 100 - avgScore);

  // setup initial visibility/position of player marker once
  useEffect(() => {
    const el = playerPositionRef.current;
    if (!el) return;
    // ensure it is absolutely positioned inside the scene and initially hidden
    el.style.position = 'absolute';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.transform = 'translate(-9999px,-9999px)'; // offscreen until first compute
    el.style.visibility = 'hidden';
  }, []);

  // small step sound when selection moves
  useEffect(() => {
    if (stepAudio.current) { stepAudio.current.currentTime = 0; stepAudio.current.play().catch(()=>{}); }
  }, [aisleIndex, itemIndex]);

  // inject minimal styles if not present (keeps same styling as before)
  useEffect(() => {
    const id = 'fp-styles';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.innerHTML = `
      /* only core styles needed to run and position player */
      .foodprint-detective-wrapper{display:flex;justify-content:center;gap:20px;width:100%;padding:20px;box-sizing:border-box}
      .game-main-content{flex:1;min-width:640px}
      .game-container{position:relative;border:4px solid #333;border-radius:12px;padding:18px;background:linear-gradient(180deg,#e8f7ff,#fff);min-height:520px}
      .game-scene{position:relative;display:flex;justify-content:center;align-items:flex-end;padding-bottom:60px;min-height:420px}
      .aisles-wrapper{display:flex;gap:40px;position:relative;padding:18px 0}
      .aisle-column{width:180px;display:flex;flex-direction:column;align-items:center;min-height:250px;position:relative}
      .aisle-shelf-bg{position:absolute;top:0;left:0;width:100%;height:100%;background-image:url('/assets/shelf.png');background-size:cover;background-repeat:no-repeat;z-index:0;opacity:0.95;pointer-events:none;border-radius:6px}
      .aisle-header{background:#4a5568;color:#fff;padding:6px 10px;border-radius:4px;font-size:11px;margin-bottom:12px;z-index:2;transform:translateY(-10px)}
      .aisle-items-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 12px;padding:10px;z-index:2;margin-top:-10px;align-content:flex-start}
      .product-card{width:64px;height:76px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;background:#f0f0f0;border:2px solid #a0a0a0;border-radius:6px;padding:6px;font-size:10px;cursor:pointer;position:relative;transition: transform .12s}
      .product-image{width:32px;height:32px;object-fit:contain}
      .product-emoji{font-size:22px}
      .product-name{font-size:9px;font-weight:600;text-align:center;line-height:1}
      .product-score{font-size:8px;color:#555}
      .product-card.selected{background:#fff6d5;border-color:#ffd700;transform:translateY(-6px);box-shadow:4px 4px 0 #caa000;z-index:4}
      .product-highlight{position:absolute;top:-8px;left:-8px;right:-8px;bottom:-8px;border:2px dashed rgba(0,191,255,0.7);border-radius:8px;box-shadow:0 0 10px rgba(0,191,255,0.25);pointer-events:none;z-index:5}
      .player-marker-wrapper{position:absolute;width:50px;height:100px;pointer-events:none;display:flex;justify-content:center;align-items:flex-end;z-index:10;transition:transform .15s ease-out}
      .player-sprite{width:100%;height:100%;object-fit:contain}
      .right-panel{width:350px;padding:15px;background:#2c3e50;border:3px solid #1a242f;border-radius:8px;color:#ecf0f1;display:flex;flex-direction:column;gap:12px}
      .scanner-display{background:#34495e;border:2px solid #5fa2dd;border-radius:6px;padding:12px;min-height:120px;color:#a0dfff;font-size:12px}
      .badge{padding:6px 10px;background:#27ae60;border-radius:999px;font-size:11px;color:#fff}
    `;
    document.head.appendChild(s);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="foodprint-detective-wrapper">
      <div className="game-main-content">
        <div className="game-container">
          <div className={`game-scene`}>
            <div className="aisles-wrapper">
              {aisles.map((aisle, idx) => (
                <AisleColumn
                  key={aisle.name}
                  aisle={aisle}
                  aisleIdx={idx}
                  selectedAisleIdx={aisleIndex}
                  selectedItemIdx={itemIndex}
                  onClick={handleScan}
                  playerPositionRef={playerPositionRef}
                />
              ))}
            </div>

            {/* mounted marker element - absolutely positioned inside .game-scene */}
            <PlayerMarker ref={playerPositionRef} />
          </div>
        </div>

        <div style={{display:'flex',gap:12,marginTop:12}}>
          <div style={{padding:8, background:'#34495e', borderRadius:6, color:'#fff'}}>Eco Score: {gameScore}</div>
          <div style={{padding:8, background:'#34495e', borderRadius:6, color:'#fff'}}>Scanned: {scanned.length}</div>
        </div>
      </div>

      <div className="right-panel">
        <div>
          <div style={{fontWeight:700, marginBottom:8}}>Scanner Output</div>
          <div className="scanner-display">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div key={active.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    {active.img ? <img src={active.img} alt={active.name} style={{width:40,height:40}}/> : <div style={{width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',background:'#22303f',borderRadius:6}}>{active.emoji}</div>}
                    <div style={{fontWeight:700,color:'#fff'}}>{active.name}</div>
                  </div>
                  <div style={{fontSize:12,color:'#a0dfff'}}>Eco: {active.score} · CO₂: {active.co2} kg · Water: {active.water} L · Deforest: {active.deforest}</div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>Scan an item (Arrow/WASD + Enter)</motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <div style={{fontWeight:700, marginBottom:8}}>Badges</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {badges.length ? badges.map(b => <div key={b} className="badge">{b}</div>) : <div style={{color:'#c0c0c0'}}>No badges yet</div>}
          </div>
        </div>

        <div>
          <div style={{fontWeight:700, marginBottom:8}}>Scanned Items</div>
          <div style={{maxHeight:160,overflowY:'auto'}}>
            {scanned.length ? scanned.map(s => <div key={s.id} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}><div>{s.name}</div><div>{s.score}</div></div>) : <div style={{color:'#999'}}>— none</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
