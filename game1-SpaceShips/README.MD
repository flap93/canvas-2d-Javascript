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

# OBJECT POOL QUE ES ?

the Object Pool pattern and provide a simple example in JavaScript.

The Object Pool pattern is a creational design pattern that uses a set of initialized objects kept ready to use - a "pool" - rather than allocating and destroying them on demand. This pattern is particularly useful when the cost of initializing a class instance is high and the rate of instantiation and destruction of a class is high.

Here's a simple example of an Object Pool in JavaScript:

class PooledObject {
constructor() {
// Initialize the object here
}

    // Add your methods here

}

class ObjectPool {
constructor(maxSize) {
this.maxSize = maxSize;
this.pool = [];
}

    acquire() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        } else if (this.pool.length < this.maxSize) {
            let object = new PooledObject();
            return object;
        } else {
            throw new Error("No object available");
        }
    }

    release(object) {
        this.pool.push(object);
    }

}

In this example, PooledObject is the object that we want to pool. The ObjectPool class maintains an array of PooledObjects. The acquire() method is used to get an object from the pool, and the release() method is used to return an object to the pool. If the pool is empty, a new PooledObject is created and returned. If the pool is full, an error is thrown.

# Projectile class

Esta clase es la que dibuja los projectiles cuando se disparan , tambien a tener en cuenta que esta clase recib las posiciones x , y de la clase jugador
