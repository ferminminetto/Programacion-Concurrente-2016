/*

9) En un curso hay dos profesores que toman examen en forma oral, el profesor A llama a
los alumnos de acuerdo al orden de llegada, mientras que el profesor B llama a cualquier
alumno (que haya llegado). Existen N alumnos que llegan y se quedan esperando hasta
ser llamados para rendir, luego de que uno de los dos profesores lo atiende, se va. Indicar
si la siguiente solución realizada con semáforo resuelve lo pedido. Justificar la respuesta

Autor: ferminmine
https://github.com/ferminmine

*/

El problema con el código propuesto es que el alumno no avisa que llegó, entonces
los profesores se quedan esperando continuamente en el semaforo llegoA o llegoB y nunca pueden
avanzar para atender a los alumnos.
