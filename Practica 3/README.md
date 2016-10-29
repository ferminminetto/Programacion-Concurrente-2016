Práctica 3 – Monitores

CONSIDERACIONES PARA RESOLVER LOS EJERCICIOS:

1)  Los monitores utilizan el protocolo signal and continue.
2)  A una variable condition SÓLO pueden aplicársele las operaciones SIGNAL,
SIGNALALL y WAIT.
3)  NO puede utilizarse el wait con prioridades.
4)  NO se puede utilizar ninguna operación que determine la cantidad de procesos
encolados en una variable condition o si está vacía.
La única forma de comunicar datos entre monitores o entre un proceso y un
monitor es por medio de invocaciones al procedimiento del monitor del cual se
quieren obtener (o enviar) los datos.
5)  No existen variables globales.
6)  En todos los ejercicios debe maximizarse la concurrencia.
7)  En todos los ejercicios debe aprovecharse al máximo la característica de exclusión
mutua que brindan los monitores.
8)  Debe evitarse hacer busy waiting.
9)  En todos los ejercicios el tiempo debe representarse con la función delay.

-----------------------------------------------------------------------------------------

1) Se dispone de un puente por el cual puede pasar un solo auto a la vez. Un auto pide
permiso para pasar por el puente, cruza por el mismo y luego sigue su camino. Nota: no
importa el orden en que han llegado al puente.
Monitor Puente
cond cola;
int cant= 0;
Procedure entrarPuente (int au)
while ( cant > 0) wait (cola);
cant = cant + 1;
end;
Process Auto [a:1..M]
Puente. entrarPuente (a);
“el auto cruza el puente”
Puente. salirPuente(a);
End Process;
Procedure salirPuente (int au)
cant = cant – 1;
signal(cola);
end;
End Monitor;
a.b.c.¿El código funciona correctamente? Justifique su respuesta.
¿Se podría simplificar el programa? En caso afirmativo, rescriba el código.
Si hubiese que respetar el orden de llegada de los vehículos, ¿La solución original lo
respeta? Si rescribió el código en el punto b), ¿esa solución lo respeta?.

2)  Implementar el acceso a una base de datos de solo lectura que puede atender a lo sumo 5
consultas simultáneas.

3)  En un laboratorio de genética se debe administrar el uso de una máquina secuenciadora
de ADN. Esta máquina se puede utilizar por una única persona a la vez. Existen 100
personas en el laboratorio que utilizan repetidamente esta máquina para sus estudios,
para esto cada persona pide permiso para usarla, y cuando termina el análisis avisa que
termino. Cuando la máquina está libre se le debe adjudicar a aquella persona cuyo
pedido tiene mayor prioridad (valor numérico entre 0 y 100).

4)  Suponga que N personas llegan a la cola de un banco. Una vez que la persona se agrega
en la cola no espera más de 15 minutos para su atención, si pasado ese tiempo no fue
atendida se retira. Para atender a las personas existen 2 empleados que van atendiendo
de a una y por orden de llegada a las personas.

5)  Se tienen 50 empleados de una empresa petrolera que se reúnen para ir en grupos de a 5
a verificar 1 de los 10 pozos de petróleo existentes, cuando los empleados llegan se les
asigna un numero de grupo, luego deberán esperar a sus compañeros de grupo para ir a
la verificación.

6)  En un entrenamiento de futbol hay 20 jugadores que forman 4 equipos (cada jugador
conoce el equipo al cual pertenece llamando a la función DarEquipo()). Cuando un
equipo está listo (han llegado los 5 jugadores que lo componen), debe enfrentarse a otro
equipo que también esté listo (los dos primeros equipos en juntarse juegan en la cancha
1, y los otros dos equipos juegan en la cancha 2). Una vez que el equipo conoce la
cancha en la que juega, sus jugadores se dirigen a ella. Cuando los 10 jugadores del
partido llegaron a la cancha comienza el partido, juegan durante 50 minutos, y al
terminar todos los jugadores del partido se retiran (no es necesario que se esperen para
salir).

7)  Resolver la siguiente situación. Suponga una comisión con 50 alumnos. Cuando los
alumnos llegan forman una fila, una vez que están los 50 en la fila el jefe de trabajos
prácticos les entrega el número de grupo (número aleatorio del 1 al 25) de tal manera
que dos alumnos tendrán el mismo número de grupo (suponga que el jefe posee una
función DarNumero() que devuelve en forma aleatoria un número del 1 al 25, el jefe de
trabajos prácticos no guarda el número que le asigna a cada alumno). Cuando un
alumno ha recibido su número de grupo comienza a realizar la práctica. Al terminar de
trabajar, el alumno le avisa al jefe de trabajos prácticos y espera la nota. El jefe de
trabajos prácticos, cuando han llegado los dos alumnos de un grupo les devuelve a
ambos la nota del GRUPO (el primer grupo en terminar tendrá como nota 25, el segundo
24, y así sucesivamente hasta el último que tendrá nota 1).
