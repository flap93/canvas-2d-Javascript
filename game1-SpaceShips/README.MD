https://www.youtube.com/watch?v=cuudnyDyWGE&list=PL5r0ozJqYXnuLw-29_ewLYeAGKvalGOug

# The game has 4 classes

HTML CANVAS HAS 2 SIZES they need to be set to the same value to prevent distorsion

When creating a canvas object the size by default its 300 x 150 px

# 1. first you need to set the size

# 2. La clase game le pasamos el objeto canvas creado

lo que nos da acceso a su width y su height

de esta forma nuestras permitimos que nuestras otras clases puedan identificar si estan fuera o dentro de esos parametros.

en la clase Game tendra un method que le llamaremos render() que renderizara nuestro objeto

# OBJETO GLOBAL WINDOW

definimos nuestras variables para la manipulacion del canvas este objeto es la ventana que contiene al dom y desde ahi crearemos nuestras clases y llamadas de los metodos

# DIBUJO DEL JUGADOR

En la clase player tenemos un metodo definido draw() que nos permitira dibujar el jugador .

Para ello el jugador debe ser pintado dentro de la clase Game , en nuestro objeto WINDOW junto con el evento load dentro de la funcion del callback , llamaremos a la funcion render que obtendra el objeto ctx este se lo pasara a l metodo draw de la clase PLAYER . El metodo draw recibe el CTX que nos permite utilizar el metodo
fill rect de Canvas con lo que dibujaremos a nuestro jugador.

# POSICION DEL JUGADOR

La posicion del jugador debe ser relativa con el tamano del juego (Game OBJECT) para ello haremos una operacion con las variable de tamano del GAME jutno con las del PLAYER

# MOVIMIENTO DEL JUGADOR

con el objeto window utilizaremos uno de sus metodos ( requestAnimationFrame) que nos permitira iterar sobre las propiedades del player cada vez que se actualice.

Esto lo haremos mediante los event de teclado que le anadiremos a nuestro GAME class.
