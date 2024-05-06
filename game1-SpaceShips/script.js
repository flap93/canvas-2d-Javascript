

class Player {
  constructor(game) {
    this.game = game;
    // size of the player
    this.width = 50;
    this.height = 100;
    // mueve el jugador 5 px per animation frame
    this.speed = 5;

    // position of the player
    // se utilizara el game object para tomar
    // la referencia de la posicion  del jugador
   // posiciona al jugador horizontalmente
   // de izquierda a derecha
    this.x = this.game.width * 0.5 - this.width * 0.5;

    // posiciona al jugador verticalmente de arriba a abajo
    this.y = this.game.height - this.height;

  }

  draw(context) {
  context.fillRect(this.x,this.y, this.width, this.height);
  }
  // actualiza la posicion del jugador osea le permite moverse
  update() {
    // move left and right
    if(this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;

    if(this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;
    // move up and down
   // if(this.game.keys.indexOf('ArrowUp') > -1) this.y -= this.speed;

    //if(this.game.keys.indexOf('ArrowDown') > -1) this.y += this.speed;

    // set limits of the canvas
    // impide que el jugador salga del canvas de izquierda a derecha
    //  pero le permite que se mueve hasta la mitad su ancho para poder disparar bien al enemigo
    // si solo fuera que llegue justo hasta el borde del canva seria
    // if(this.y < 0) this.y = 0;
    if(this.x < -this.width * 0.5) this.x = -this.width * 0.5;
    else if(this.x > this.game.width - this.width ) this.x = this.game.width - this.width;
    // impide que el jugador salga del canvas de arriba 
    // if(this.y < 0) this.y = 0;
    // else if(this.height > this.game.height - this.height) this.height =  this.game.height - this.height;
  }

  // Este metodo permite despirar cada vez que presionemos la tecla 1
  // dispara desde la posicion del jugador para ellos tomamos su posicion
 // al disparar se le anade al ancho del jugador el witdh con 0.5 para que tome justo la mitad
 // este metodo esta dentro de la clase projectile que le quitaremos el ancho del jugador por 0.5
 // para que sea la mitad
  shoot() {
    const projectile = this.game.getProjectile();
    if(projectile) projectile.start(this.x + this.width * 0.5, this.y);

  }

}

class Projectile {
constructor() {
  this.width = 4;
  this.height= 20;
  this.x = 0;
  this.y = 0;
  this.speed = 20;
   // es un object pool que no lo vemos cuando este en true
   // y cunado sea false aparecera
  this.free = true;
}
// permite que se vea el projectile cuando dispara

draw(context) {

  if(!this.free) {
    context.fillRect(this.x,this.y, this.width, this.height);
  }
}

update() {
  if(!this.free) {
    this.y -= this.speed;
    if(this.y < -this.height) this.reset();
  }

}
// Recibe las coordinadas del jugador , poruqe lo necesita para cada vez que dispara
// para que dispare desde el centro es la posicion x del projectile que es el corner izquierdo
// MENOS el ancho del jugador  por 0.5 
start(x, y) {
  this.x = x - this.width * 0.5;
  this.y = y;
  this.free = false;
}

reset() {
  this.free = true;
}

}

class Enemy {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.height = 100;
    this.speed = 5;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;

  }

  draw(context) {
    context.strokeRect(this.x,this.y, this.width, this.height);
    }

  update() {}

}

class Wave {
  constructor(game) {
    this.game = game;
    this.width = this.game.columns * this.game.enemySize;
    this.height = this.game.rows * this.game.enemySize;
    this.x = 0;
    this.y = 0;

  }

  render(context) {
    context.strokeRect(this.x,this.y, this.width, this.height);
  }
}


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    //  the this inside of parenthesis makes reference to the Game class
    this.player = new Player(this);
    this.keys = [];
    this.player = new Player(this);


    this.projectilesPool = [];
    this.numberOfProjectiles = 10;
    this.createProjectiles();
    // cada ronda de enmigos que sale tendra 9 enemigos
    this.columns = 3;
    this.rows = 3;
    this.enemySize = 60;

    this.waves = [];
    this.waves.push(new Wave(this));
    //event listeners

    window.addEventListener('keydown', e => {
      // esto hace que si el index del key no esta presente en el array solo entonces anadelo al array pero si devuelve menos 1 es porque ya esta y no es necesario anadirlo
      // this aqui apunta al game object
      // y utiliza el array Keys que se ira guardando los event que hagamos cuando presionamoas las fechcas del teclado
      // gracias al arrow function
      if(this.keys.indexOf(e.key) === -1) { this.keys.push(e.key) };
      if(e.key === '1') this.player.shoot();
      // DESCOMENTAR SI QUIERES VER COMO SOLO LO ANADE UNA VEZ EL EVENT DE TECLADO
     //console.log(this.keys);
    });

    // utilizamos splice to remove elementos existentes en el array , solo removermos uno
    // si presiono lo guardo si suelta la tecla lo remueve

    window.addEventListener('keyup', e => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) { this.keys.splice(index, 1)};
      console.log(this.keys);
    });
  }

  // ejecuta los metodos de Player
  render(context) {
    // console.log(this.width, this.height);
    this.player.draw(context);
    this.player.update();
    // obtiene los projectiles  , llama a draw para dibujarlo y update para que se actualice
    // cada vez que supera la altura del canvas
    this.projectilesPool.forEach(projectile => {
      projectile.update();
      projectile.draw(context);
    })

    // dibuja los enemigos 
    this.waves.forEach(wave => {
      wave.render(context);
    })
  }


  // create projectile object pool

  createProjectiles() {
    for(let i = 0 ; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new Projectile());
    }
  }


  // get free projectile object from the pool

  getProjectile() {
    for(let i =0;i< this.projectilesPool.length; i++) {
      if(this.projectilesPool[i].free)  return this.projectilesPool[i];
    }
  }
}


  // Remember always to ensure that the event load fires  after style sheets script and images ... have been loaded first.

  window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.fillStyle='white';
    // detertimina el color del enemigo 
    ctx.strokeStyle='white';
    ctx.lineWidth= 5;

    const game = new Game(canvas);
    // esta funcion hace que se repita/actualice la posicion y el movimiento del jugador
    // para ellos utiliza la funcion requestAnimationFrame que hara como un loop itera sobre las propiedades segun usuario
    function animatePlayer() {
      // limpia el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      game.render(ctx);
      window.requestAnimationFrame(animatePlayer);
    }

    animatePlayer();
  });