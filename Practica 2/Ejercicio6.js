/*

6) A una empresa llegan E empleados y por día hay T tareas para hacer (T>E), una vez que
todos los empleados llegaron empezaran a trabajar. Mientras haya tareas para hacer los
empleados tomaran una y la realizarán. Cada empleado puede tardar distinto tiempo en
realizar cada tarea. Al finalizar el día se le da un premio al empleado que más tareas
realizó.

Autor: ferminmine
https://github.com/ferminmine

*/

fabrica(){

    //variables Compartidas
    QUEUE tareas;
    SEM acceso_llegue = 1;
    int llegaron = 0;
    SEM [1..E] comenzar = 0;
    SEM tareas_acceso;
    int terminaron;
    SEM acceso_terminaron = 1;
    int [1..E] completadas;

    PROCESS EMPLEADO [1 to E]{
      int tareas_completadas = 0;
      P(acceso_llegue);
        llegaron++;
      V(acceso_llegue);
      if (llegaron != E ) P(comenzar[i]);
      else  for (k=1 to E) V(Comenzar[k]);
      P(tareas_acceso);
      while (tareas.tieneElementos()){
        Tarea t = tareas.pop();
        V(tareas_acceso);
        t.realizar();
        tareas_completadas++;
        P(tareas_acceso);
      }
      V(tareas_acceso);
      completadas[i] = tareas_completadas;
      P(acceso_terminaron);
      terminaron++;
      V(acceso_terminaron);
      if (terminaron != E ) P(continuar[i]));
      else for (k=1 to E) V(continuar[k]);
      if (max(completadas) == i) festejar(); //si yo gané festejo
    }

}
