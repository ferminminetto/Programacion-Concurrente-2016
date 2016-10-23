/*

1) Existen N personas que deben ser chequeadas por un detector de metales antes de poder
ingresar al avión.
a. Implemente una solución que modele el acceso de las personas a un detector (es decir
si el detector está libre la persona lo puede utilizar caso contrario debe esperar).
b. Modifique su solución para el caso que haya tres detectores.

Autor del código: ferminmine
https://github.com/ferminmine

*/

// 1A)

detectores(){
  //variables compartidas
  SEM detector = 1;

  PROCESS PERSONA [i=1 to N]{
    P(detector);
    delay(1); //la persona pasa un detector
    V(detector);
  }
}
// 1B) En caso de que haya tres detectores se debe inicializar el semaforo detector en 3.
