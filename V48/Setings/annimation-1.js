const board = document.getElementById('board');
const size = 8;

// Création du plateau
for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
        const s = document.createElement('div');
        s.className = 'square ' + ((r+c)%2? 'dark':'light');
        s.dataset.r = r;
        s.dataset.c = c;
        board.appendChild(s);
    }
}

// Stage pour les pièces
const stage = document.createElement('div');
stage.style.position = 'absolute';
stage.style.inset = '0';
stage.style.pointerEvents = 'none';
document.querySelector('.board-wrapper').appendChild(stage);

// Images des pièces Icy Sea
const pieceImages = {
  wk:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/wk.png",
  wq:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/wq.png",
  wr:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/wr.png",
  wb:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/wb.png",
  wn:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/wn.png",
  wp:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/wp.png",
  bk:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/bk.png",
  bq:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/bq.png",
  br:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/br.png",
  bb:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/bb.png",
  bn:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/bn.png",
  bp:"https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/bp.png"
};

// Fonction de création d'une pièce
function makePiece(id, type, cls){
    const el = document.createElement('img');
    el.className = 'piece ' + cls;
    el.dataset.id = id;
    el.src = pieceImages[type];
    el.draggable = false;
    el.style.position = 'absolute';
    stage.appendChild(el);
    return el;
}

// Positions initiales
const piecesPositions = {
    'wk':[7,4],'wq':[7,3],'wr1':[7,0],'wr2':[7,7],'wn1':[7,1],'wn2':[7,6],'wb1':[7,2],'wb2':[7,5],
    'wp1':[6,0],'wp2':[6,1],'wp3':[6,2],'wp4':[6,3],'wp5':[6,4],'wp6':[6,5],'wp7':[6,6],'wp8':[6,7],
    'bk':[0,4],'bq':[0,3],'br1':[0,0],'br2':[0,7],'bn1':[0,1],'bn2':[0,6],'bb1':[0,2],'bb2':[0,5],
    'bp1':[1,0],'bp2':[1,1],'bp3':[1,2],'bp4':[1,3],'bp5':[1,4],'bp6':[1,5],'bp7':[1,6],'bp8':[1,7]
};

// Création des pièces
const pieces = {};
for(const k in piecesPositions){
    const [r,c] = piecesPositions[k];
    const color = k.startsWith('w') ? 'white' : 'black';
    const type = k.replace(/[0-9]/g,'');
    pieces[k] = {el: makePiece(k, type, color), r, c, cls: color};
}

// Placement des pièces sur le plateau
function placePieces(){
    const rect = board.getBoundingClientRect();
    const sq = rect.width / 8;
    for(const k in pieces){
        const p = pieces[k];
        const x = p.c * sq + (sq - (sq-18))/2;
        const y = p.r * sq + (sq - (sq-18))/2;
        p.el.style.width = (sq-18)+'px';
        p.el.style.height = (sq-18)+'px';
        p.el.style.left = x+'px';
        p.el.style.top = y+'px';
        p.el.style.visibility = 'visible'; // s'assurer que toutes les pièces sont visibles
    }
}

window.addEventListener('resize', placePieces);
setTimeout(placePieces, 40);

// Animation de déplacement avec capture
function animMove(key, toR, toC, dur = 600){
    const p = pieces[key]; 
    if(!p) return Promise.resolve();

    // Vérifie si une pièce est capturée
    let captured = null;
    for(const k2 in pieces){
        if(k2 !== key){
            const target = pieces[k2];
            if(target.r === toR && target.c === toC){
                captured = target;
                target.el.style.visibility = 'hidden'; // cache temporairement
                break;
            }
        }
    }

    const el = p.el;
    const rect = board.getBoundingClientRect();
    const sq = rect.width / 8;
    const fromX = parseFloat(el.style.left), fromY = parseFloat(el.style.top);
    const toX = toC * sq + (sq - (sq-18))/2, toY = toR * sq + (sq - (sq-18))/2;
    el.classList.add('glow');

    return new Promise(r=>{
        el.animate([{transform:'translate(0,0)'},{transform:`translate(${toX-fromX}px,${toY-fromY}px)`}],
        {duration:dur,easing:'ease-in-out'}).onfinish=()=>{
            el.style.left = toX + 'px';
            el.style.top = toY + 'px';
            el.classList.remove('glow');
            p.r = toR;
            p.c = toC;
            r();
        };
    });
}

// Flash et confetti
const flash=document.getElementById('flash');
function flashOn(){flash.classList.add('on'); setTimeout(()=>flash.classList.remove('on'),1200);}
const canvas=document.getElementById('confetti');
const ctx=canvas.getContext('2d');
let W=0,H=0;
function fit(){const r=canvas.getBoundingClientRect(); canvas.width=r.width; canvas.height=r.height; W=canvas.width; H=canvas.height;} fit(); window.addEventListener('resize',fit);
let particles=[];
function explodeConfetti(){
    particles=[]; for(let i=0;i<60;i++)
        particles.push({x:W/2,y:H/3,vx:(Math.random()-0.5)*8,vy:-Math.random()*8-2,r:Math.random()*6+4,rot:Math.random()*360,vr:(Math.random()-0.5)*8,color:['#ffd166','#06d6a0','#118ab2','#ef476f','#ffd700'][Math.floor(Math.random()*5)]});
    requestAnimationFrame(loop);
}
function loop(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
        p.vy+=0.3; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.6); ctx.restore();
    });
    particles = particles.filter(p=>p.y<H+50);
    if(particles.length>0) requestAnimationFrame(loop);
}
function clearConfetti(){particles=[]; ctx.clearRect(0,0,W,H);}

// Remet toutes les pièces visibles à la fin
function resetPieces(){
    for(const k in pieces){
        const p = pieces[k];
        const [r,c] = piecesPositions[k];
        p.r = r;
        p.c = c;
        p.el.style.visibility = 'visible';
    }
    placePieces();
}

// Séquence Mat du Berger
async function sequence(){
    while(true){
        resetPieces();
        clearConfetti();
        await animMove('wp5',4,4,400);
        await animMove('bp5',3,4,400);
        await animMove('wb2',4,2,400);
        await animMove('bp3',3,2,400);
        await animMove('wq',5,5,400);
        await animMove('bn2',2,5,400);
        await animMove('wq',3,7,400);
        await animMove('bn1',2,0,400);
        await animMove('wq',1,5,400);
        flashOn(); explodeConfetti();
        await new Promise(r=>setTimeout(r,1500));
    }
}

sequence();
