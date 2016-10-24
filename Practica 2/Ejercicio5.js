/*

5) Suponga que se tiene un curso con 50 alumnos. Cada alumno elije una de las 10 tareas
para realizar entre todos. Una vez que todos los alumnos eligieron su tarea comienzan a
realizarla. Cada vez que un alumno termina su tarea le avisa al profesor y si todos los
alumnos que tenían la misma tarea terminaron el profesor les otorga un puntaje que
representa el orden en que se terminó esa tarea.
Nota: Para elegir la tarea suponga que existe una función elegir que le asigna una tarea a
un alumno (esta función asignará 10 tareas diferentes entre 50 alumnos, es decir, que 5
alumnos tendrán la tarea 1, otros 5 la tarea 2 y así sucesivamente para las 10 tareas).

Autor del código: ferminmine
https://github.com/ferminmine

*/

escuela(){
  //variables compartidas
  TAREA[1..50] tarea; //guarda para cada alumno el indice de tarea asignado
  SEM acceso_eligieron = 1;
  int eligieron = 0;
  int[1..10] tarea_grupal = 0; //para cada tarea, cuantos miembros terminaron su parte de la tarea
  SEM[1..50] comenzar = 0;
  SEM acceso_chequear = 1;
  QUEUE a_chequear;
  QUEUE prioridad_notas; // orden en que terminan los grupos para las notas

  PROCESS ALUMNO [i=1 to 50]{

      tarea[i] = elegir(i); //devuelve una tarea (1..10)
      P(acceso_eligieron);
        eligieron++;
        if (eligieron == 50) for (q:1 to 50) V(comenzar[q]);
      V(acceso_eligieron);
      P(comenzar[i]);

      tarea[i] = realizarTarea();
      P(acceso_chequear);
        a_chequear.push(tarea[i]);
      V(acceso_chequear);
      V(ya_termine);

  }

  PROCESS PROFESOR{
    int terminaron = 0;
    while (terminaron != 10){

      P(ya_termine);
      int tarea_chequear;
      P(acceso_chequear);
        tarea_chequear = a_chequear.pop();
      V(acceso_chequear);
      tarea_grupal[tarea_chequear]++; //registra el alumno que termino
      if (tarea_grupal[tarea_chequear] == 10) { //terminaron todos
        prioridad_notas.push(tarea_chequear);
        terminaron++;
      }
    }
  }

}
