

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
    this.x += this.speed;
  }

}

class Projectile {


}

class Enemy {}


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    //  the this inside of parenthesis makes reference to the Game class
    this.player = new Player(this);
    this.keys = [];

    //event listeners

    window.addEventListener('keydown', e => {
      // esto hace que si el index del key no esta presente en el array solo entonces anadelo al array pero si devuelve menos 1 es porque ya esta y no es necesario anadirlo
      // this aqui apunta al game object
      // y utiliza el array Keys que se ira guardando los event que hagamos cuando presionamoas las fechcas del teclado
      // gracias al arrow function
      if(this.keys.indexOf(e.key) === -1) { this.keys.push(e.key) };
      // DESCOMENTAR SI QUIERES VER COMO SOLO LO ANADE UNA VEZ EL EVENT DE TECLADO
     console.log(this.keys);
    });

    // utilizamos splice to remove elementos existentes en el array , solo removermos uno 
    // si presiono lo guardo si suelta la tecla lo remueve

    window.addEventListener('keyup', e => {
      //if(this.keys.indexOf(e.key) === -1) { this.keys.push(e.key) };
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
  }
}


  // Remember always to ensure that the event load fires  after style sheets script and images ... have been loaded first.

  window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;

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