(() => {
  const games = {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, props = {}, kids = []) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "style") Object.assign(node.style, v);
      else if (k.startsWith("on")) node.addEventListener(k.slice(2).toLowerCase(), v);
      else node.setAttribute(k, v);
    });
    kids.forEach((kid) => node.append(kid));
    return node;
  };
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function injectStyles() {
    if ($("#lp-lab-style")) return;
    document.head.append(el("style", { id: "lp-lab-style", html: `
      :root{--lab-bg:#f7fbff;--lab-card:#fff;--lab-ink:#172033;--lab-muted:#5d6980;--lab-accent:#5b6cff;--lab-good:#16a34a;--lab-bad:#e11d48;--lab-line:#dce5f6;--lab-shadow:0 14px 34px rgba(39,51,91,.14)}
      [data-theme="dark"]{--lab-bg:#0f1123;--lab-card:#181b36;--lab-ink:#f4f3fd;--lab-muted:#b9b4d9;--lab-line:#353a67;--lab-shadow:0 16px 38px rgba(0,0,0,.36)}
      *{box-sizing:border-box} body{margin:0;min-height:100vh;background:linear-gradient(135deg,var(--lab-bg),#eef7ff);color:var(--lab-ink);font-family:"Plus Jakarta Sans",system-ui,-apple-system,sans-serif} [data-theme="dark"] body{background:#0f1123!important}
      .lab-app{width:min(1120px,94vw);margin:0 auto;padding:28px 0 54px}.lab-hero{display:grid;gap:10px;text-align:center;margin:0 auto 18px}.lab-kicker{font-weight:900;color:var(--lab-accent);letter-spacing:.04em;text-transform:uppercase;font-size:.8rem}.lab-hero h1{margin:0;font-size:clamp(2rem,6vw,3.5rem);line-height:1;font-family:Fredoka,system-ui,sans-serif}.lab-hero p{margin:0 auto;color:var(--lab-muted);font-weight:700;max-width:680px;line-height:1.55}
      .lab-shell{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(260px,.75fr);gap:18px;align-items:start}.lab-card{background:var(--lab-card);border:1px solid var(--lab-line);border-radius:18px;box-shadow:var(--lab-shadow);padding:18px}.lab-card h2,.lab-card h3{margin:0 0 10px;font-family:Fredoka,system-ui,sans-serif}.lab-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.lab-stat{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--lab-line);background:rgba(91,108,255,.08);padding:8px 12px;border-radius:999px;font-weight:900}.lab-btn{border:0;border-radius:999px;background:var(--lab-accent);color:#fff;font:900 1rem/1 system-ui,sans-serif;padding:11px 16px;cursor:pointer;box-shadow:0 5px 0 rgba(0,0,0,.16)}.lab-btn:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.18)}.lab-btn.secondary{background:#14b8a6}.lab-btn.warn{background:#f59e0b;color:#2f1f00}.lab-btn.ghost{background:#edf1ff;color:#3340a0}[data-theme="dark"] .lab-btn.ghost{background:#252a55;color:#f4f3fd}.lab-msg{min-height:1.5em;font-weight:900;color:var(--lab-muted)}.lab-msg.good{color:var(--lab-good)}.lab-msg.bad{color:var(--lab-bad)}.lab-grid{display:grid;gap:6px;touch-action:manipulation}.lab-cell{border:1px solid var(--lab-line);border-radius:10px;background:#f8fbff;min-height:54px;display:grid;place-items:center;font-size:1.55rem;font-weight:900;cursor:pointer;user-select:none;position:relative;overflow:hidden}.lab-cell.on{outline:3px solid #ffd23f}.lab-cell.beam{background:#fff6bf}.lab-cell.block{background:#334155;color:#fff}.lab-cell.target{background:#dcfce7}.lab-cell.source{background:#dbeafe}.lab-cell.path::after{content:"";position:absolute;inset:45% 4px auto;height:5px;border-radius:999px;background:#ffd23f;box-shadow:0 0 16px #ffd23f}.lab-palette{display:grid;grid-template-columns:repeat(auto-fit,minmax(74px,1fr));gap:10px}.lab-swatch{border:0;border-radius:16px;min-height:76px;cursor:pointer;font-weight:900;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.45);box-shadow:0 5px 0 rgba(0,0,0,.16)}.lab-color-sample{height:130px;border-radius:18px;border:1px solid var(--lab-line);box-shadow:inset 0 0 0 5px rgba(255,255,255,.4)}.lab-scene{position:relative;min-height:260px;border:1px solid var(--lab-line);border-radius:18px;background:linear-gradient(#dff7ff 0 58%,#a7f3d0 58%);overflow:hidden}.lab-scene.space{background:radial-gradient(circle at 15% 18%,#fff 0 2px,transparent 3px),radial-gradient(circle at 74% 30%,#fff 0 2px,transparent 3px),linear-gradient(#24325f,#10162e 62%,#25304b 62%)}.lab-scene svg{position:absolute;inset:0;width:100%;height:100%}.lab-meter{height:10px;border-radius:999px;background:rgba(91,108,255,.14);border:1px solid var(--lab-line);overflow:hidden}.lab-meter span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#14b8a6,#f59e0b,#ec4899)}.lab-slider{width:100%;accent-color:var(--lab-accent)}.lab-control{display:grid;gap:6px;min-width:150px;flex:1}.lab-control label{font-weight:900;color:var(--lab-muted)}.rhythm-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.rhythm-pad{min-height:108px;border:0;border-radius:18px;color:white;font:900 1.05rem/1.1 system-ui,sans-serif;cursor:pointer;box-shadow:0 7px 0 rgba(0,0,0,.18);transition:transform .12s ease,filter .12s ease}.rhythm-pad.active,.rhythm-pad:active{transform:translateY(5px) scale(.98);filter:saturate(1.3) brightness(1.12);box-shadow:0 2px 0 rgba(0,0,0,.2)}.pendulum-art{width:100%;min-height:260px;border:1px solid var(--lab-line);border-radius:18px;background:radial-gradient(circle at 50% 0,rgba(255,255,255,.7),transparent 18%),var(--lab-card)}.scale{display:grid;grid-template-columns:1fr 80px 1fr;gap:10px;align-items:end}.pan{min-height:128px;border:3px dashed var(--lab-line);border-radius:18px;background:rgba(91,108,255,.06);display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px}.beam-center{height:10px;background:#64748b;border-radius:999px;margin-bottom:34px}.treasure{border:1px solid var(--lab-line);background:#fff8dc;border-radius:16px;padding:10px 12px;font-size:1.65rem;cursor:pointer}.treasure.sel{outline:3px solid #ffd23f}.map-grid{grid-template-columns:repeat(var(--size),1fr)}.map-grid .lab-cell{aspect-ratio:1;min-height:auto}.build-grid{grid-template-columns:repeat(7,1fr);background:#dbeafe;padding:8px;border-radius:18px}.build-grid .lab-cell{aspect-ratio:1;min-height:auto;background:#eef6ff}.build-grid .solid{background:#64748b;color:#fff}.build-grid .wood{background:#c08448}.build-grid .stone{background:#94a3b8}.build-grid .glass{background:#7dd3fc}.build-grid .roof{background:#ef4444}.material{border:1px solid var(--lab-line);background:var(--lab-card);border-radius:14px;padding:10px;cursor:pointer;font-weight:900}.material.on{outline:3px solid #ffd23f}.stars{font-size:1.25rem;letter-spacing:2px;color:#f59e0b}@media(max-width:820px){.lab-shell{grid-template-columns:1fr}.lab-card{padding:14px}.lab-cell{min-height:46px}.scale{grid-template-columns:1fr}.beam-center{display:none}.rhythm-pad{min-height:88px}}` }));
  }

  function layout(meta, render) {
    injectStyles();
    const root = $("#gameRoot") || document.body.appendChild(el("div", { id: "gameRoot" }));
    root.className = "lab-app";
    root.innerHTML = `<section class="lab-hero"><div class="lab-kicker">${meta.kicker}</div><h1>${meta.icon} ${meta.title}</h1><p>${meta.desc}</p></section><section class="lab-shell"><div class="lab-card" id="play"></div><aside class="lab-card" id="side"></aside></section>`;
    render($("#play", root), $("#side", root));
  }

  games.mirrorMaze = () => {
    const levels = [
      {s:[0,2,"E"],t:[4,0],m:[[2,2,"/"],[2,0,"/"]],b:[]},
      {s:[0,4,"E"],t:[5,1],m:[[2,4,"/"],[2,1,"\\"],[5,1,"/"]],b:[[3,3]]},
      {s:[5,5,"W"],t:[0,1],m:[[3,5,"\\"],[3,1,"/"],[0,1,"/"]],b:[[2,3],[4,2]]},
      {s:[0,0,"E"],t:[5,5],m:[[4,0,"/"],[4,5,"\\"]],b:[[2,0],[2,1],[2,2],[2,3]]},
      {s:[1,5,"N"],t:[5,2],m:[[1,1,"\\"],[4,1,"/"],[4,2,"\\"]],b:[[3,3],[5,4]]}
    ];
    let level=0,moves=0,msg="Rotate mirrors until the light reaches the crystal.";
    layout({kicker:"Logic & Strategy",icon:"🪞",title:"Mirror Maze",desc:"Tap mirrors to bend the light beam through each puzzle."}, (play, side) => {
      function trace(L){const dirs={E:[1,0],W:[-1,0],N:[0,-1],S:[0,1]};const refl={"/":{E:"N",N:"E",W:"S",S:"W"},"\\":{E:"S",S:"E",W:"N",N:"W"}};let [x,y,d]=L.s,seen=[],win=false;for(let i=0;i<60;i++){x+=dirs[d][0];y+=dirs[d][1];if(x<0||y<0||x>5||y>5)break;if(L.b.some(([bx,by])=>bx===x&&by===y))break;seen.push([x,y,d]);if(x===L.t[0]&&y===L.t[1]){win=true;break}const mir=L.m.find(a=>a[0]===x&&a[1]===y);if(mir)d=refl[mir[2]][d];}return{seen,win}}
      function paint(){const L=levels[level],tr=trace(L);play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Level ${level+1}/${levels.length}</span><span class="lab-stat">Moves ${moves}</span></div><div class="lab-grid" style="grid-template-columns:repeat(6,1fr)"></div><p class="lab-msg ${tr.win?'good':''}">${tr.win?'Crystal lit! Move to the next maze.':msg}</p><div class="lab-row"><button class="lab-btn secondary" id="next">Next</button><button class="lab-btn ghost" id="reset">Reset level</button></div>`;const grid=$('.lab-grid',play);for(let y=0;y<6;y++)for(let x=0;x<6;x++){const mir=L.m.find(a=>a[0]===x&&a[1]===y);const c=el('button',{class:'lab-cell',type:'button'});if(L.s[0]===x&&L.s[1]===y){c.classList.add('source');c.textContent={E:'▶',W:'◀',N:'▲',S:'▼'}[L.s[2]]}else if(L.t[0]===x&&L.t[1]===y){c.classList.add('target');c.textContent='💎'}else if(L.b.some(([bx,by])=>bx===x&&by===y)){c.classList.add('block');c.textContent='■'}else if(mir){c.textContent=mir[2];c.onclick=()=>{mir[2]=mir[2]==='/'?'\\':'/';moves++;msg='Nice turn. Watch the beam path update.';paint()}}if(tr.seen.some(([px,py])=>px===x&&py===y))c.classList.add('beam','path');grid.append(c)}$('#next',play).onclick=()=>{level=(level+1)%levels.length;moves=0;msg='New maze ready.';paint()};$('#reset',play).onclick=()=>{moves=0;msg='Level reset.';paint()};side.innerHTML=`<h2>How to play</h2><p>Light travels in straight lines. A / or \\ mirror turns it 90 degrees.</p><p class="stars">${tr.win?'★★★':'☆☆☆'}</p><p>Try solving each maze with fewer mirror turns.</p>`}
      paint();
    });
  };

  games.colorChemistry = () => {
    const pigments = {
      Red: { rgb: [239, 68, 68], note: "warmer", weight: 1 },
      Yellow: { rgb: [245, 158, 11], note: "brighter", weight: 1 },
      Blue: { rgb: [37, 99, 235], note: "cooler", weight: 1 },
      White: { rgb: [255, 255, 255], note: "lighter", weight: .9 },
      Black: { rgb: [15, 23, 42], note: "deeper", weight: .75 }
    };
    const base = [248, 250, 252];
    const mixColor = (drops) => {
      const total = base.map((v) => v * 1.2);
      let weight = 1.2;
      drops.forEach((name) => {
        const p = pigments[name];
        weight += p.weight;
        p.rgb.forEach((v, i) => total[i] += v * p.weight);
      });
      return total.map((v) => clamp(Math.round(v / weight), 0, 255));
    };
    const recipes = [
      { name: "Sunset Orange", solution: ["Red", "Yellow", "Yellow"], budget: 5, lesson: "Orange is a warm blend. More yellow keeps it sunny." },
      { name: "Leaf Green", solution: ["Yellow", "Blue", "Yellow"], budget: 5, lesson: "Green begins with blue and yellow, then shifts warmer with extra yellow." },
      { name: "Grape Purple", solution: ["Red", "Blue", "Blue"], budget: 5, lesson: "Purple needs red and blue. Extra blue makes it calmer and deeper." },
      { name: "Rose Milk", solution: ["Red", "White", "White"], budget: 5, lesson: "White creates a tint, softening strong colors into pastels." },
      { name: "Sea Glass", solution: ["Blue", "Yellow", "White", "White"], budget: 6, lesson: "A cool green-blue gets softer when you add white." },
      { name: "Cocoa Shade", solution: ["Red", "Yellow", "Black"], budget: 5, lesson: "A tiny dark drop turns warm colors into rich shades." },
      { name: "Storm Cloud", solution: ["Blue", "Black", "White"], budget: 5, lesson: "Black lowers brightness; white brings the shade back into balance." },
      { name: "Festival Pink", solution: ["Red", "Red", "White", "Yellow"], budget: 6, lesson: "A little yellow warms pink so it feels bright and festive." }
    ].map((r) => ({ ...r, target: mixColor(r.solution) }));
    let round = 0;
    let drops = [];
    let medals = Array(recipes.length).fill(0);
    let msg = "Add drops, compare the beakers, then test your potion.";
    const dist = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
    const countDrops = (list) => list.reduce((map, name) => (map[name] = (map[name] || 0) + 1, map), {});
    const scoreFor = (mix, target) => Math.max(0, 100 - Math.round(dist(mix, target) / 1.8));
    const medalFor = (score, used, budget) => score >= 96 && used <= budget ? 3 : score >= 88 ? 2 : score >= 76 ? 1 : 0;
    const medalText = (n) => n === 3 ? "★★★" : n === 2 ? "★★☆" : n === 1 ? "★☆☆" : "☆☆☆";

    layout({kicker:'Creative Science',icon:'🧪',title:'Color Chemistry',desc:'Mix color drops, tints, and shades to match each potion target.'},(play,side)=>{
      function add(name) {
        const recipe = recipes[round];
        if (drops.length >= recipe.budget + 3) {
          msg = "This beaker is crowded. Undo a drop or clean it before adding more.";
          paint();
          return;
        }
        drops.push(name);
        msg = `${name} added. The potion became ${pigments[name].note}.`;
        paint();
      }
      function hint(recipe) {
        const have = countDrops(drops);
        const need = countDrops(recipe.solution);
        const missing = Object.keys(need).find((name) => (have[name] || 0) < need[name]);
        const extra = Object.keys(have).find((name) => (have[name] || 0) > (need[name] || 0));
        if (missing) return `Try one more ${missing.toLowerCase()} drop.`;
        if (extra) return `${extra} may be pulling the color away. Undo can help.`;
        return "You have the right ingredients. Test the potion.";
      }
      function finish() {
        const recipe = recipes[round];
        const score = scoreFor(mixColor(drops), recipe.target);
        const medal = medalFor(score, drops.length, recipe.budget);
        medals[round] = Math.max(medals[round], medal);
        msg = medal >= 2 ? `Great lab work: ${score}/100. Recipe unlocked.` : `Score ${score}/100. ${hint(recipe)}`;
        paint();
      }
      function nextRound(index = (round + 1) % recipes.length) {
        round = index;
        drops = [];
        msg = `New challenge: ${recipes[round].name}.`;
        paint();
      }
      function paint() {
        const recipe = recipes[round];
        const mix = mixColor(drops);
        const score = scoreFor(mix, recipe.target);
        const currentMedal = medalFor(score, drops.length, recipe.budget);
        const progress = Math.min(100, Math.max(4, score));
        play.innerHTML = `<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Recipe ${round+1}/${recipes.length}</span><span class="lab-stat">Drops ${drops.length}/${recipe.budget}</span><span class="lab-stat">Match ${score}%</span></div><div class="lab-row" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px"><div><b>Target: ${recipe.name}</b><div class="lab-color-sample" style="background:rgb(${recipe.target.join(",")});position:relative;overflow:hidden"></div></div><div><b>Your beaker</b><div class="lab-color-sample" style="background:radial-gradient(circle at 30% 18%,rgba(255,255,255,.75),transparent 18%),linear-gradient(160deg,rgba(255,255,255,.32),transparent 45%),rgb(${mix.join(",")});position:relative;overflow:hidden;transform:${drops.length?'scale(1.01)':'none'}"><span style="position:absolute;left:18%;bottom:14px;width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.58);box-shadow:34px -20px 0 rgba(255,255,255,.36),72px 4px 0 rgba(255,255,255,.28)"></span></div></div></div><div style="height:12px;background:rgba(91,108,255,.14);border-radius:999px;overflow:hidden;margin:14px 0"><span style="display:block;height:100%;width:${progress}%;background:linear-gradient(90deg,#ef4444,#f59e0b,#22c55e);border-radius:999px"></span></div><div class="lab-palette"></div><div class="lab-row" style="min-height:36px;margin-top:12px">${drops.length ? drops.map((name,i)=>`<span class="lab-stat" style="padding:6px 9px">${i+1}. ${name}</span>`).join("") : '<span class="lab-stat">Clean beaker</span>'}</div><p class="lab-msg ${score>=88?'good':drops.length>recipe.budget?'bad':''}">${msg}</p><div class="lab-row"><button class="lab-btn" id="check">Test potion</button><button class="lab-btn warn" id="hint">Hint</button><button class="lab-btn ghost" id="undo">Undo</button><button class="lab-btn ghost" id="reset">Clean</button><button class="lab-btn secondary" id="next">Next recipe</button></div>`;
        const pal = $('.lab-palette', play);
        Object.entries(pigments).forEach(([name, p]) => pal.append(el('button', { class:'lab-swatch', type:'button', style:{ background:`rgb(${p.rgb.join(",")})` }, title:`Add ${name}: makes the mix ${p.note}`, onclick:()=>add(name) }, [document.createTextNode(name)])));
        $('#check',play).onclick = finish;
        $('#hint',play).onclick = () => { msg = hint(recipe); paint(); };
        $('#undo',play).onclick = () => { drops.pop(); msg = "Last drop removed."; paint(); };
        $('#reset',play).onclick = () => { drops = []; msg = "Fresh beaker."; paint(); };
        $('#next',play).onclick = () => nextRound();
        side.innerHTML = `<h2>Lab journey</h2><p class="stars">${medalText(Math.max(medals[round], currentMedal))}</p><p>${recipe.lesson}</p><div class="lab-row" id="recipeTrail"></div><h3>Notebook</h3><p>Red, yellow and blue build new hues. White makes tints. Black makes shades. Fewer drops earn cleaner medals.</p>`;
        const trail = $('#recipeTrail', side);
        recipes.forEach((r, i) => trail.append(el('button', { class:'material '+(i===round?'on':''), type:'button', onclick:()=>nextRound(i) }, [document.createTextNode(`${i+1}. ${medalText(medals[i])}`)])));
      }
      paint();
    });
  };

  games.treasureWeighIn = () => {
    let round=1,count=5,odd=Math.floor(Math.random()*5),heavy=Math.random()>.5,left=[],right=[],msg='Put treasures on the pans, weigh them, then guess the odd one.';
    const weights=()=>Array.from({length:count},(_,i)=>10+(i===odd?(heavy?2:-2):0));
    const reset=()=>{count=clamp(4+round,5,7);odd=Math.floor(Math.random()*count);heavy=Math.random()>.5;left=[];right=[];msg='New treasure set. Find the odd weight.'};
    layout({kicker:'Brain & Numbers',icon:'⚖️',title:'Treasure Weigh-In',desc:'Use a balance scale to discover which treasure has a different weight.'},(play,side)=>{
      function toggle(i,pan){left=left.filter(x=>x!==i);right=right.filter(x=>x!==i);if(pan==='L')left.push(i);if(pan==='R')right.push(i);paint()}
      function sum(arr){const w=weights();return arr.reduce((s,i)=>s+w[i],0)}
      function paint(){play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Round ${round}</span><span class="lab-stat">${count} treasures</span></div><div class="scale"><div class="pan" id="leftPan"></div><div class="beam-center"></div><div class="pan" id="rightPan"></div></div><h3>Choose a treasure, then choose its pan</h3><div class="lab-row" id="treasures"></div><p class="lab-msg">${msg}</p><div class="lab-row"><button class="lab-btn" id="weigh">Weigh pans</button><button class="lab-btn secondary" id="new">New round</button></div>`;const icons=['💰','💎','🏺','👑','🪙','🔔','🗝️'];const renderPan=(id,arr)=>{$(id,play).innerHTML=arr.map(i=>`<span class="treasure">${icons[i]}</span>`).join('')||'<b>Empty</b>'};renderPan('#leftPan',left);renderPan('#rightPan',right);const tray=$('#treasures',play);for(let i=0;i<count;i++){const b=el('button',{class:'treasure',type:'button'},[document.createTextNode(icons[i])]);if(left.includes(i)||right.includes(i))b.classList.add('sel');b.onclick=()=>{const choice=prompt('Type L for left pan, R for right pan, G to guess this is odd, or X to remove.');const c=(choice||'').toUpperCase();if(c==='G'){if(i===odd){msg=`Correct! This treasure was ${heavy?'heavier':'lighter'}.`;round++;reset()}else msg='Not that one. Weigh again before guessing.';paint()}else toggle(i,c==='L'?'L':c==='R'?'R':'X')};tray.append(b)}$('#weigh',play).onclick=()=>{const a=sum(left),b=sum(right);msg=a===b?'The pans balance exactly.':'The '+(a>b?'left':'right')+' pan is heavier.';paint()};$('#new',play).onclick=()=>{reset();paint()};side.innerHTML='<h2>Strategy</h2><p>Balanced pans mean all treasures on both pans behave the same. An uneven pan tells you where the odd weight might be.</p><p>Use fewer weighs for a cleaner solve.</p>'}
      paint();
    });
  };

  games.starMapNavigator = () => {
    const levels=[{size:5,start:[0,4],goal:[4,0],rocks:[[2,4],[2,3],[2,2]],stars:[[1,3],[3,1]]},{size:6,start:[0,0],goal:[5,5],rocks:[[1,2],[2,2],[3,2],[4,3]],stars:[[0,3],[3,4]]},{size:6,start:[5,0],goal:[0,5],rocks:[[4,1],[3,1],[2,3],[1,3]],stars:[[5,3],[2,5],[0,2]]}];
    let level=0,pos=[...levels[0].start],got=new Set(),moves=0,msg='Collect constellation stars, then land on the glowing goal.';
    layout({kicker:'Explore the World',icon:'🧭',title:'Star Map Navigator',desc:'Steer by compass directions and coordinates across a constellation map.'},(play,side)=>{
      function key(x,y){return x+','+y}function move(dx,dy){const L=levels[level],nx=pos[0]+dx,ny=pos[1]+dy;if(nx<0||ny<0||nx>=L.size||ny>=L.size){msg='That leaves the map.';paint();return}if(L.rocks.some(([x,y])=>x===nx&&y===ny)){msg='Asteroid ahead. Plot another route.';paint();return}pos=[nx,ny];moves++;if(L.stars.some(([x,y])=>x===nx&&y===ny))got.add(key(nx,ny));if(nx===L.goal[0]&&ny===L.goal[1]&&got.size===L.stars.length){msg='Mission complete!';level=(level+1)%levels.length;pos=[...levels[level].start];got=new Set();moves=0}else msg='Position updated.';paint()}
      function paint(){const L=levels[level];play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Map ${level+1}/${levels.length}</span><span class="lab-stat">Coordinate (${pos[0]}, ${pos[1]})</span><span class="lab-stat">Moves ${moves}</span></div><div class="lab-grid map-grid" style="--size:${L.size}"></div><p class="lab-msg">${msg}</p><div class="lab-row"><button class="lab-btn" id="n">N</button><button class="lab-btn" id="w">W</button><button class="lab-btn" id="e">E</button><button class="lab-btn" id="s">S</button><button class="lab-btn ghost" id="reset">Reset</button></div>`;const grid=$('.map-grid',play);for(let y=0;y<L.size;y++)for(let x=0;x<L.size;x++){let txt='';if(pos[0]===x&&pos[1]===y)txt='🚀';else if(L.goal[0]===x&&L.goal[1]===y)txt='🌟';else if(L.rocks.some(([rx,ry])=>rx===x&&ry===y))txt='☄️';else if(L.stars.some(([sx,sy])=>sx===x&&sy===y))txt=got.has(key(x,y))?'✨':'⭐';grid.append(el('div',{class:'lab-cell'},[document.createTextNode(txt)]))}$('#n',play).onclick=()=>move(0,-1);$('#s',play).onclick=()=>move(0,1);$('#e',play).onclick=()=>move(1,0);$('#w',play).onclick=()=>move(-1,0);$('#reset',play).onclick=()=>{pos=[...L.start];got=new Set();moves=0;msg='Route reset.';paint()};side.innerHTML='<h2>Navigator notes</h2><p>X grows as you fly east. Y grows as you fly south. Use the current coordinate to plan the route.</p>'}
      document.addEventListener('keydown',e=>{if(e.key==='ArrowUp')move(0,-1);if(e.key==='ArrowDown')move(0,1);if(e.key==='ArrowRight')move(1,0);if(e.key==='ArrowLeft')move(-1,0)});paint();
    });
  };

  games.miniArchitect = () => {
    const mats={wood:{emoji:'🟫',weight:1},stone:{emoji:'⬛',weight:2},glass:{emoji:'🟦',weight:1},roof:{emoji:'🔺',weight:1}};
    let grid=Array.from({length:6},()=>Array(7).fill('')),tool='wood',goal=5,msg='Build a stable tower at least 5 blocks high.';
    layout({kicker:'STEM & Code',icon:'🏗️',title:'Mini Architect',desc:'Place materials, test stability, and learn why strong structures need support.'},(play,side)=>{
      function height(){let h=0;for(let y=0;y<6;y++)if(grid[y].some(Boolean))h=6-y;return h}function stable(){for(let y=0;y<5;y++)for(let x=0;x<7;x++)if(grid[y][x]&&!grid[y+1][x]&&!grid[y+1][x-1]&&!grid[y+1][x+1])return false;for(let y=0;y<6;y++)for(let x=0;x<7;x++)if(grid[y][x]==='stone'&&y<5&&!grid[y+1][x])return false;return true}
      function paint(){const ok=stable(),tall=height()>=goal;play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Height ${height()}/${goal}</span><span class="lab-stat">${ok?'Stable':'Needs support'}</span></div><div class="lab-grid build-grid"></div><p class="lab-msg ${ok&&tall?'good':ok?'':'bad'}">${ok&&tall?'Great build! Try a different design.':msg}</p><div class="lab-row" id="materials"></div><div class="lab-row"><button class="lab-btn" id="test">Test build</button><button class="lab-btn ghost" id="clear">Clear</button></div>`;const board=$('.build-grid',play);for(let y=0;y<6;y++)for(let x=0;x<7;x++){const m=grid[y][x];const c=el('button',{class:'lab-cell '+(m||''),type:'button'},[document.createTextNode(m?mats[m].emoji:(y===5?'▁':''))]);c.onclick=()=>{grid[y][x]=grid[y][x]?'' : tool;msg='Material placed. Test when ready.';paint()};board.append(c)}const bar=$('#materials',play);Object.keys(mats).forEach(k=>{const b=el('button',{class:'material '+(tool===k?'on':''),type:'button',onclick:()=>{tool=k;paint()}},[document.createTextNode(`${mats[k].emoji} ${k}`)]);bar.append(b)});$('#test',play).onclick=()=>{msg=stable()?`Strong support! ${height()>=goal?'Goal reached.':'Build a little taller.'}`:'Some blocks are floating or too heavy without support.';paint()};$('#clear',play).onclick=()=>{grid=Array.from({length:6},()=>Array(7).fill(''));msg='Fresh building site.';paint()};side.innerHTML='<h2>Architect tips</h2><p>Every block needs support from the block below or a nearby brace. Heavy stone should sit directly on support.</p><p>Use glass and wood for lighter upper floors, then finish with a roof.</p>'}
      paint();
    });
  };

  games.rocketLaunchLab = () => {
    const stages = [
      { name: "Moon Hop", gravity: 1.6, wind: 0, target: [300, 178], lesson: "Low gravity keeps rockets floating longer." },
      { name: "Breezy Meadow", gravity: 4.2, wind: .35, target: [330, 178], lesson: "Wind nudges the flight path, so aim a little against it." },
      { name: "Red Planet", gravity: 3.7, wind: -.3, target: [260, 178], lesson: "Mars-like gravity needs a patient arc and steady thrust." },
      { name: "Jupiter Drill", gravity: 8.4, wind: .15, target: [345, 178], lesson: "Strong gravity pulls hard. More thrust helps the rocket travel." },
      { name: "Orbit Gate", gravity: 2.4, wind: .55, target: [355, 118], lesson: "Higher targets need lift before distance." },
      { name: "Comet Port", gravity: 5.4, wind: -.45, target: [285, 132], lesson: "Balance angle and power when wind pushes backward." }
    ];
    let level = 0, angle = 46, thrust = 62, fuel = 66, msg = "Tune the rocket, launch, and land near the glowing pad.", medals = Array(stages.length).fill(0), last = [];
    const simulate = (s) => {
      const rad = angle * Math.PI / 180;
      let x = 32, y = 190, vx = Math.cos(rad) * thrust / 7.8 + s.wind, vy = -Math.sin(rad) * thrust / 7.4 - fuel / 32;
      const pts = [];
      for (let i = 0; i < 90; i++) {
        x += vx; y += vy; vy += s.gravity / 18; pts.push([clamp(x, 8, 408), clamp(y, 20, 214)]);
        if (y >= 190 && i > 10) break;
      }
      return pts;
    };
    const score = (pts, target) => {
      const p = pts[pts.length - 1] || [32, 190];
      return Math.max(0, 100 - Math.round(Math.hypot(p[0] - target[0], p[1] - target[1]) / 1.5));
    };
    const medal = (v) => v > 88 ? 3 : v > 72 ? 2 : v > 55 ? 1 : 0;
    const stars = (n) => n === 3 ? "★★★" : n === 2 ? "★★☆" : n === 1 ? "★☆☆" : "☆☆☆";
    layout({kicker:"Physics Lab",icon:"🚀",title:"Rocket Launch Lab",desc:"Adjust angle, thrust and fuel to land rockets across changing gravity worlds."},(play,side)=>{
      function launch(){const s=stages[level];last=simulate(s);const sc=score(last,s.target),m=medal(sc);medals[level]=Math.max(medals[level],m);msg=m>=2?`Clean landing: ${sc}/100. Mission ready for the next stage.`:`Landing score ${sc}/100. Try changing ${angle<42?"angle":thrust<58?"thrust":"fuel"}.`;paint()}
      function next(){level=(level+1)%stages.length;last=[];msg=`New world: ${stages[level].name}.`;paint()}
      function paint(){const s=stages[level],pts=last.length?last:simulate(s),sc=score(pts,s.target),trail=pts.map(p=>p.join(",")).join(" "),end=pts[pts.length-1]||[32,190];play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">World ${level+1}/${stages.length}</span><span class="lab-stat">Gravity ${s.gravity}</span><span class="lab-stat">Wind ${s.wind>0?"→":"←"} ${Math.abs(s.wind).toFixed(2)}</span></div><div class="lab-scene space"><svg viewBox="0 0 420 230" aria-label="Rocket flight path"><line x1="0" y1="194" x2="420" y2="194" stroke="#7dd3fc" stroke-width="3"/><circle cx="${s.target[0]}" cy="${s.target[1]}" r="17" fill="#22c55e" opacity=".9"/><circle cx="${s.target[0]}" cy="${s.target[1]}" r="28" fill="none" stroke="#86efac" stroke-width="3" stroke-dasharray="5 6"/><polyline points="${trail}" fill="none" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/><text x="22" y="196" font-size="26">🚀</text><text x="${end[0]-10}" y="${end[1]+8}" font-size="22">✨</text></svg></div><div class="lab-row" style="margin-top:14px"><span class="lab-control"><label>Angle ${angle}°</label><input class="lab-slider" id="angle" type="range" min="20" max="75" value="${angle}"></span><span class="lab-control"><label>Thrust ${thrust}</label><input class="lab-slider" id="thrust" type="range" min="30" max="95" value="${thrust}"></span><span class="lab-control"><label>Fuel ${fuel}</label><input class="lab-slider" id="fuel" type="range" min="25" max="95" value="${fuel}"></span></div><p class="lab-msg ${sc>88?'good':''}">${msg}</p><div class="lab-row"><button class="lab-btn" id="launch">Launch</button><button class="lab-btn secondary" id="next">Next world</button><button class="lab-btn ghost" id="reset">Reset trail</button></div>`;['angle','thrust','fuel'].forEach(id=>{$('#'+id,play).oninput=e=>{if(id==='angle')angle=+e.target.value;if(id==='thrust')thrust=+e.target.value;if(id==='fuel')fuel=+e.target.value;last=[];paint()}});$('#launch',play).onclick=launch;$('#next',play).onclick=next;$('#reset',play).onclick=()=>{last=[];msg='Trail reset. Tune and launch again.';paint()};side.innerHTML=`<h2>Mission log</h2><p class="stars">${stars(Math.max(medals[level],medal(sc)))}</p><p>${s.lesson}</p><p>Higher angle adds lift. More thrust adds speed. More fuel stretches the climb.</p>`}
      paint();
    });
  };

  games.pendulumPainter = () => {
    const stages = [
      { name: "Gentle Swing", length: 120, arc: 26, twist: 24 },
      { name: "Wide Loop", length: 150, arc: 42, twist: 36 },
      { name: "Tiny Orbit", length: 86, arc: 54, twist: 58 },
      { name: "Calm Ribbon", length: 170, arc: 24, twist: 70 },
      { name: "Festival Spiral", length: 135, arc: 62, twist: 82 },
      { name: "Gallery Finale", length: 160, arc: 48, twist: 96 }
    ];
    let level=0,length=120,arc=32,twist=45,msg="Tune the pendulum, then paint a motion pattern.",medals=Array(stages.length).fill(0);
    const path = () => {
      const pts=[];
      for(let i=0;i<240;i++){const t=i/18,fade=1-i/310,a=Math.sin(t)*arc*fade*Math.PI/180,x=210+Math.sin(a)*length+Math.sin(t*twist/38)*34,y=24+Math.cos(a)*length+i*.42;pts.push([clamp(x,18,402),clamp(y,18,222)])}
      return pts.map(p=>p.join(",")).join(" ");
    };
    const score = () => {const s=stages[level];return Math.max(0,100-Math.round((Math.abs(length-s.length)+Math.abs(arc-s.arc)*1.5+Math.abs(twist-s.twist)*.8)/2.1))};
    const medal = (v)=>v>90?3:v>76?2:v>60?1:0, stars=(n)=>n===3?"★★★":n===2?"★★☆":n===1?"★☆☆":"☆☆☆";
    layout({kicker:"Physics Art",icon:"〰️",title:"Pendulum Painter",desc:"Explore swing length, arc and rhythm to make graceful motion art."},(play,side)=>{
      function paint(){const sc=score(),m=medal(sc),s=stages[level];play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Gallery ${level+1}/${stages.length}</span><span class="lab-stat">Match ${sc}%</span><span class="lab-stat">${s.name}</span></div><svg class="pendulum-art" viewBox="0 0 420 240" aria-label="Pendulum painting"><line x1="210" y1="18" x2="${210+Math.sin(arc*Math.PI/180)*length}" y2="${24+Math.cos(arc*Math.PI/180)*length}" stroke="#94a3b8" stroke-width="3"/><circle cx="210" cy="18" r="7" fill="#64748b"/><polyline points="${path()}" fill="none" stroke="#ec4899" stroke-width="4" stroke-linecap="round" opacity=".88"/><circle cx="${210+Math.sin(arc*Math.PI/180)*length}" cy="${24+Math.cos(arc*Math.PI/180)*length}" r="12" fill="#f59e0b"/></svg><div class="lab-row" style="margin-top:14px"><span class="lab-control"><label>String ${length}</label><input class="lab-slider" id="length" type="range" min="70" max="180" value="${length}"></span><span class="lab-control"><label>Arc ${arc}°</label><input class="lab-slider" id="arc" type="range" min="15" max="70" value="${arc}"></span><span class="lab-control"><label>Rhythm ${twist}</label><input class="lab-slider" id="twist" type="range" min="20" max="100" value="${twist}"></span></div><p class="lab-msg ${sc>88?'good':''}">${msg}</p><div class="lab-row"><button class="lab-btn" id="frame">Frame painting</button><button class="lab-btn secondary" id="next">Next gallery</button><button class="lab-btn ghost" id="target">Use target setup</button></div>`;['length','arc','twist'].forEach(id=>{$('#'+id,play).oninput=e=>{if(id==='length')length=+e.target.value;if(id==='arc')arc=+e.target.value;if(id==='twist')twist=+e.target.value;msg='The pattern changed with the motion.';paint()}});$('#frame',play).onclick=()=>{medals[level]=Math.max(medals[level],m);msg=m>=2?`Beautiful physics art: ${sc}/100.`:`Score ${sc}/100. Match the gallery prompt more closely.`;paint()};$('#next',play).onclick=()=>{level=(level+1)%stages.length;msg=`New gallery prompt: ${stages[level].name}.`;paint()};$('#target',play).onclick=()=>{length=s.length;arc=s.arc;twist=s.twist;msg='Target setup loaded. Watch the pattern.';paint()};side.innerHTML=`<h2>Motion notes</h2><p class="stars">${stars(Math.max(medals[level],m))}</p><p>Longer strings swing wider and slower. A bigger arc adds energy. Rhythm changes the layered pattern.</p>`}
      paint();
    });
  };

  games.catapultCastle = () => {
    const stages=[
      {name:"Training Yard",target:[300,172],wall:0,wind:0},
      {name:"Garden Wall",target:[330,150],wall:120,wind:.2},
      {name:"Hill Keep",target:[265,128],wall:170,wind:-.15},
      {name:"Twin Towers",target:[350,116],wall:205,wind:.28},
      {name:"Moon Castle",target:[310,92],wall:235,wind:-.22},
      {name:"Final Gate",target:[360,138],wall:255,wind:.36}
    ];
    let level=0,angle=42,pull=62,stone=2,msg="Set angle and pull, then send the soft practice ball to the target.",medals=Array(stages.length).fill(0),last=[];
    const simulate=(s)=>{let x=36,y=186,rad=angle*Math.PI/180,vx=Math.cos(rad)*(pull/8+stone*.45)+s.wind,vy=-Math.sin(rad)*(pull/7.8+stone*.35),pts=[];for(let i=0;i<90;i++){x+=vx;y+=vy;vy+=.95+stone*.08;pts.push([clamp(x,10,408),clamp(y,22,206)]);if(y>=186&&i>10)break}return pts};
    const score=(pts,t)=>{const p=pts[pts.length-1]||[36,186];return Math.max(0,100-Math.round(Math.hypot(p[0]-t[0],p[1]-t[1])/1.35))};
    const medal=v=>v>88?3:v>72?2:v>58?1:0,stars=n=>n===3?"★★★":n===2?"★★☆":n===1?"★☆☆":"☆☆☆";
    layout({kicker:"Physics Challenge",icon:"🏰",title:"Catapult Castle",desc:"Learn force, angle and mass by landing soft practice shots on castle targets."},(play,side)=>{
      function fire(){const s=stages[level];last=simulate(s);const sc=score(last,s.target),m=medal(sc);medals[level]=Math.max(medals[level],m);msg=m>=2?`Target tagged: ${sc}/100.`:`Score ${sc}/100. Try ${score(simulate({...s,wind:0}),s.target)<sc?'watching the wind':'a new pull strength'}.`;paint()}
      function paint(){const s=stages[level],pts=last.length?last:simulate(s),sc=score(pts,s.target),m=medal(sc),trail=pts.map(p=>p.join(",")).join(" ");play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Castle ${level+1}/${stages.length}</span><span class="lab-stat">Wind ${s.wind>0?"→":"←"} ${Math.abs(s.wind).toFixed(2)}</span><span class="lab-stat">Score ${sc}</span></div><div class="lab-scene"><svg viewBox="0 0 420 225"><rect x="${s.wall}" y="145" width="28" height="48" fill="#94a3b8"/><text x="22" y="194" font-size="32">🛠️</text><circle cx="${s.target[0]}" cy="${s.target[1]}" r="18" fill="#f43f5e" opacity=".9"/><circle cx="${s.target[0]}" cy="${s.target[1]}" r="8" fill="#fff"/><polyline points="${trail}" fill="none" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/><text x="${(pts[pts.length-1]||[0])[0]-10}" y="${(pts[pts.length-1]||[0])[1]+8}" font-size="22">⚪</text></svg></div><div class="lab-row" style="margin-top:14px"><span class="lab-control"><label>Angle ${angle}°</label><input class="lab-slider" id="angle" type="range" min="18" max="72" value="${angle}"></span><span class="lab-control"><label>Pull ${pull}</label><input class="lab-slider" id="pull" type="range" min="30" max="95" value="${pull}"></span><span class="lab-control"><label>Mass ${stone}</label><input class="lab-slider" id="stone" type="range" min="1" max="4" value="${stone}"></span></div><p class="lab-msg ${sc>88?'good':''}">${msg}</p><div class="lab-row"><button class="lab-btn" id="fire">Fire</button><button class="lab-btn secondary" id="next">Next castle</button><button class="lab-btn ghost" id="clear">Clear trail</button></div>`;['angle','pull','stone'].forEach(id=>{$('#'+id,play).oninput=e=>{if(id==='angle')angle=+e.target.value;if(id==='pull')pull=+e.target.value;if(id==='stone')stone=+e.target.value;last=[];paint()}});$('#fire',play).onclick=fire;$('#next',play).onclick=()=>{level=(level+1)%stages.length;last=[];msg=`New target: ${stages[level].name}.`;paint()};$('#clear',play).onclick=()=>{last=[];msg='Trail cleared.';paint()};side.innerHTML=`<h2>Launch notes</h2><p class="stars">${stars(Math.max(medals[level],m))}</p><p>Angle controls the arc. Pull controls force. Heavier balls carry differently and drop faster.</p>`}
      paint();
    });
  };

  games.rhythmGarden = () => {
    const pads={Bloom:{color:"#ec4899",freq:392},Sprout:{color:"#22c55e",freq:494},Rain:{color:"#0ea5e9",freq:330},Sun:{color:"#f59e0b",freq:523}};
    const stages=[
      {name:"Seed Beat",seq:["Bloom","Sprout","Bloom"],tempo:520},
      {name:"Rain Dance",seq:["Rain","Bloom","Sprout","Rain"],tempo:470},
      {name:"Sunny Steps",seq:["Sun","Sun","Bloom","Sprout"],tempo:430},
      {name:"Garden Loop",seq:["Bloom","Rain","Sprout","Sun","Rain"],tempo:390},
      {name:"Night Chorus",seq:["Rain","Sun","Bloom","Bloom","Sprout","Sun"],tempo:360},
      {name:"Festival Bloom",seq:["Sun","Bloom","Rain","Sprout","Sun","Rain","Bloom"],tempo:330}
    ];
    let level=0,input=[],msg="Listen to the garden pattern, then tap it back.",medals=Array(stages.length).fill(0),playing=false,audio=null,active="";
    function sound(name){try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();const osc=audio.createOscillator(),gain=audio.createGain();osc.type="sine";osc.frequency.value=pads[name].freq;gain.gain.setValueAtTime(.001,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.16,audio.currentTime+.02);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.22);osc.connect(gain).connect(audio.destination);osc.start();osc.stop(audio.currentTime+.24)}catch{}}
    const stars=n=>n===3?"★★★":n===2?"★★☆":n===1?"★☆☆":"☆☆☆";
    layout({kicker:"Music Journey",icon:"🎵",title:"Rhythm Garden",desc:"Listen, remember, and tap musical patterns to help the garden bloom."},(play,side)=>{
      function flash(name){active=name;sound(name);paint();setTimeout(()=>{if(active===name){active="";paint()}},220)}
      function playPattern(){if(playing)return;playing=true;input=[];msg="Listen carefully.";paint();stages[level].seq.forEach((name,i)=>setTimeout(()=>flash(name),i*stages[level].tempo));setTimeout(()=>{playing=false;msg="Your turn. Tap the pattern back.";paint()},stages[level].seq.length*stages[level].tempo+260)}
      function tap(name){if(playing)return;const seq=stages[level].seq;flash(name);input.push(name);const ok=input.every((v,i)=>v===seq[i]);if(!ok){msg="Almost. Reset and listen again.";input=[];paint();return}if(input.length===seq.length){const medal=input.length<=seq.length?3:2;medals[level]=Math.max(medals[level],medal);msg="Perfect rhythm. The garden bloomed.";setTimeout(()=>{level=(level+1)%stages.length;input=[];msg=`Next song: ${stages[level].name}.`;paint()},650)}else msg=`Good. ${seq.length-input.length} taps to go.`;paint()}
      function paint(){const s=stages[level],progress=Math.round((input.length/s.seq.length)*100);play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Song ${level+1}/${stages.length}</span><span class="lab-stat">${s.name}</span><span class="lab-stat">${input.length}/${s.seq.length} taps</span></div><div class="rhythm-grid"></div><div class="lab-meter" style="margin:14px 0"><span style="width:${progress}%"></span></div><p class="lab-msg ${input.length===s.seq.length?'good':''}">${msg}</p><div class="lab-row"><button class="lab-btn" id="listen">Play pattern</button><button class="lab-btn ghost" id="reset">Reset taps</button><button class="lab-btn secondary" id="next">Next song</button></div>`;const grid=$('.rhythm-grid',play);Object.entries(pads).forEach(([name,p])=>grid.append(el('button',{class:'rhythm-pad '+(active===name?'active':''),type:'button',style:{background:`linear-gradient(145deg,${p.color},#24164f)`},onclick:()=>tap(name)},[document.createTextNode(name)])));$('#listen',play).onclick=playPattern;$('#reset',play).onclick=()=>{input=[];msg='Taps reset. Listen again when ready.';paint()};$('#next',play).onclick=()=>{level=(level+1)%stages.length;input=[];msg=`Next song: ${stages[level].name}.`;paint()};side.innerHTML=`<h2>Garden stage</h2><p class="stars">${stars(medals[level])}</p><p>Patterns get longer and faster as the journey grows. Use the color names and sounds together to remember the order.</p><div class="lab-row">${s.seq.map((_,i)=>`<span class="lab-stat">${i<input.length?"✓":"•"}</span>`).join("")}</div>`}
      paint();
    });
  };

  games.marbleMazeMakers = () => {
    const parts = {
      rampR: { icon: "╲", label: "Ramp right", team: "Builder A" },
      rampL: { icon: "╱", label: "Ramp left", team: "Builder A" },
      bumper: { icon: "●", label: "Bumper", team: "Builder B" },
      gate: { icon: "▣", label: "Gate", team: "Builder B" },
      boost: { icon: "»", label: "Boost", team: "Builder B" }
    };
    const stages = [
      { name: "First Roll", start: [0,0], goal: [6,6], blocks: [[2,2],[3,2]], budget: 7 },
      { name: "Zigzag Hill", start: [1,0], goal: [5,6], blocks: [[1,3],[2,3],[5,2]], budget: 8 },
      { name: "Gate Garden", start: [0,1], goal: [6,5], blocks: [[3,1],[3,2],[3,4]], budget: 8 },
      { name: "Bumper Bend", start: [6,0], goal: [0,6], blocks: [[4,2],[2,4],[1,2]], budget: 9 },
      { name: "Team Switchback", start: [3,0], goal: [3,6], blocks: [[3,2],[2,4],[4,4]], budget: 10 },
      { name: "Final Run", start: [0,0], goal: [6,6], blocks: [[2,1],[2,2],[4,3],[4,4],[1,5]], budget: 11 }
    ];
    let level = 0, tool = "rampR", turn = 0, board = {}, path = [], msg = "Builders take turns placing parts, then test the marble.", medals = Array(stages.length).fill(0);
    const key = (x,y) => `${x},${y}`;
    const reset = () => { board = {}; path = []; msg = "Fresh maze. Builder A starts."; turn = 0; };
    const simulate = () => {
      const s = stages[level], pts = [[...s.start]];
      let x = s.start[0], y = s.start[1], dx = 0;
      for (let i = 0; i < 30; i++) {
        const p = board[key(x,y)];
        if (p === "rampR") dx = 1;
        if (p === "rampL") dx = -1;
        if (p === "bumper") dx *= -1 || 1;
        if (p === "boost") y++;
        let nx = clamp(x + dx, 0, 6), ny = clamp(y + 1, 0, 6);
        if (s.blocks.some(([bx,by]) => bx === nx && by === ny) || board[key(nx,ny)] === "gate") {
          nx = x;
          dx *= -1;
        }
        x = nx; y = ny; pts.push([x,y]);
        if (x === s.goal[0] && y === s.goal[1]) break;
        if (y === 6 && i > 6) break;
      }
      return pts;
    };
    const score = (pts) => {
      const s = stages[level], end = pts[pts.length - 1], used = Object.keys(board).length;
      const close = Math.max(0, 100 - Math.round(Math.hypot(end[0] - s.goal[0], end[1] - s.goal[1]) * 18));
      const tidy = Math.max(0, 12 - Math.max(0, used - s.budget) * 4);
      return Math.min(100, close + tidy);
    };
    const medal = (v) => v > 88 ? 3 : v > 70 ? 2 : v > 54 ? 1 : 0;
    const stars = (n) => n === 3 ? "★★★" : n === 2 ? "★★☆" : n === 1 ? "★☆☆" : "☆☆☆";
    layout({kicker:"Co-op Physics",icon:"🟣",title:"Marble Maze Makers",desc:"Two builders place ramps, gates and bumpers, then test the marble path together."},(play,side)=>{
      function test(){path=simulate();const sc=score(path),m=medal(sc);medals[level]=Math.max(medals[level],m);msg=m>=2?`Great teamwork: ${sc}/100. The marble found the run.`:`Score ${sc}/100. Add a ramp, bumper or gate to guide the next fall.`;paint()}
      function paint(){const s=stages[level],sc=path.length?score(path):0,m=medal(sc),team=turn%2?"Builder B":"Builder A";play.innerHTML=`<div class="lab-row" style="justify-content:space-between;margin-bottom:12px"><span class="lab-stat">Maze ${level+1}/${stages.length}</span><span class="lab-stat">${team}'s turn</span><span class="lab-stat">Parts ${Object.keys(board).length}/${s.budget}</span></div><div class="lab-grid map-grid" style="--size:7"></div><div class="lab-row" id="parts" style="margin-top:14px"></div><p class="lab-msg ${sc>88?'good':Object.keys(board).length>s.budget?'bad':''}">${msg}</p><div class="lab-row"><button class="lab-btn" id="test">Test marble</button><button class="lab-btn secondary" id="next">Next maze</button><button class="lab-btn ghost" id="clear">Clear</button></div>`;const grid=$('.map-grid',play);for(let y=0;y<7;y++)for(let x=0;x<7;x++){const cellKey=key(x,y),piece=board[cellKey],block=s.blocks.some(([bx,by])=>bx===x&&by===y),onPath=path.some(([px,py])=>px===x&&py===y);let text=piece?parts[piece].icon:"";if(s.start[0]===x&&s.start[1]===y)text="●";if(s.goal[0]===x&&s.goal[1]===y)text="★";if(block)text="■";const c=el('button',{class:`lab-cell ${block?'block':''} ${onPath?'beam':''}`,type:'button'},[document.createTextNode(text)]);c.onclick=()=>{if(block)return; if(s.start[0]===x&&s.start[1]===y||s.goal[0]===x&&s.goal[1]===y)return; board[cellKey]=board[cellKey]===tool?"":tool; path=[]; msg=`${parts[tool].label} placed by ${team}.`; turn++; paint()};grid.append(c)}const tray=$('#parts',play);Object.entries(parts).forEach(([id,p])=>tray.append(el('button',{class:'material '+(tool===id?'on':''),type:'button',onclick:()=>{tool=id;msg=`Selected ${p.label}.`;paint()}},[document.createTextNode(`${p.icon} ${p.label}`)])));$('#test',play).onclick=test;$('#next',play).onclick=()=>{level=(level+1)%stages.length;reset();msg=`New co-op build: ${stages[level].name}.`;paint()};$('#clear',play).onclick=()=>{reset();paint()};side.innerHTML=`<h2>Team plan</h2><p class="stars">${stars(Math.max(medals[level],m))}</p><p>Builder A controls ramps. Builder B controls gates, boosts and bumpers. The marble falls each step, while parts change its sideways motion.</p><p>Goal: reach the star with fewer parts than the budget.</p>`}
      reset();
      paint();
    });
  };

  window.LittleGameLab = { start(name) { const fn = games[name]; if (!fn) throw new Error(`Unknown game: ${name}`); fn(); } };
})();
