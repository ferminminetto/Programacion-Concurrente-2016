/*

4) Se tiene un curso con 40 alumnos, la maestra entrega una tarea distinta a cada alumno,
luego cada alumno realiza su tarea y se la entrega a la maestra para que la corrija, esta
revisa la tarea y si está bien le avisa al alumno que puede irse, si la tarea está mal le indica
los errores, el alumno corregirá esos errores y volverá a entregarle la tarea a la maestra
para que realice la corrección nuevamente, esto se repite hasta que la tarea no tenga
errores.

Autor del código: ferminmine
https://github.com/ferminmine

*/

curso(){
  //variables compartidas
  SEM[40] termine_corregir = 0; //inicializa todos los semaforos en 0
  BOOL[n] correccion = false;
  QUEUE a_corregir;
  SEM acceso_a_corregir = 1;
  TAREA[n] tareas;
  SEM acceso_finalizados = 1;
  int finalizados=0;
  SEM corregime = 0;

  PROCESS ALUMNO [i=1 to 40]{
    tareas[i] = miTarea.realizar(); //realiza la tarea y la almacena
    P(acceso_a_corregir);
    a_corregir.push(i);
    V(acceso_a_corregir);
    V(corregime);
    P(termine_corregir[i]);
    while (NOT correccion[i]){ //si no es aprobado
      tareas[i] = miTarea.realizar();
      p(acceso_a_corregir);
      a_corregir.push(i);
      v(acceso_a_corregir);
      v(corregime);
      p(termine_corregir[i]);
    }
    P(acceso_finalizados);
    finalizados++;
    V(acceso_finalizados);
  }

  PROCESS MAESTRA{
    int tarea_corregir;
    P(corregime);
    while(finalizados < 40){
      P(acceso_a_corregir);
      tarea_corregir=a_corregir.pop();
      V(acceso_a_corregir);
      correccion[tarea_corregir] = corregir(tareas[tarea_corregir]);//devuelve true si esta aprobado, false c.c
      V(termine_corregir[tarea_corregir]);
      P(corregime);
    }
  }

}
