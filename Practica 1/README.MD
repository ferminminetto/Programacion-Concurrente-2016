                              Práctica 1 – Variables compartidas

1. Para el siguiente programa concurrente suponga:
 Que las instrucciones del siguiente código no son atómicas.
 Todas las variables están inicializadas en 0 antes de empezar.

Indique cual/es de las siguientes opciones son verdaderas:
a) En algún caso el valor de x al terminar el programa es 56.
b) En algún caso el valor de x al terminar el programa es 22.
c) En algún caso el valor de x al terminar el programa es 23.
d) x puede obtener un valor incorrecto por interferencias.
e) Si las instrucciones fueran atómicas, x puede obtener un valor incorrecto por interferencias.
f) Si las instrucciones fueran atómicas, indique las posibles alternativas de ejecución.

P1::
If (x = 0) {
y:= 4*2;
x:= y + 2;
}
P2::
If (x > 0) {
x:= x + 1;
}
P3::
x:= (x*3) + (x*2) + 1;

2. Dado un numero N verifique cuantas veces aparece ese número en un arreglo de longitud M.
Realice el algoritmo en forma concurrente utilizando <> y <await B; S>. Escriba las condiciones
que considere necesarias.

3. En base a lo visto en la clase 2 de teoría.
a) Indicar si el siguiente código funciona para resolver el problema de Productor/Consumidor
con un buffer de tamaño N. En caso de no funcionar, debe hacer las modificaciones
necesarias.
b) Modificar el código para que funcione para C consumidores y P productores.
int cant = 0;
 int pri_ocupada = 0;
 int pri_vacia = 0;
 int buffer[N];
Productor::
 Consumidor::
{ while (true)
 { while (true)
{ produce elemento
 { <await (cant > 0); cant-- >
<await (cant < N); cant++>
 elemento = buffer[pri_ocupada];
buffer[pri_vacia] = elemento;
 pri_ocupada = (pri_ocupada + 1) mod N;
pri_vacia = (pri_vacia + 1) mod N;
 consume elemento
}
 }
}
 }

4. En base a lo visto en la clase 3 de teoría, resuelva el problema de acceso a la sección crítica
usando un proceso coordinador. En este caso, cuando un proceso SC[i] quiere entrar a su sección
crítica le avisa al coordinador, y espera a que éste le dé permiso. Al terminar de ejecutar su
sección crítica, el proceso SC[i] le avisa al coordinador. Desarrolle una solución de grano fino
usando sólo variables compartidas (sin sentencias especiales como TS o FA, ni sentencias
await).
