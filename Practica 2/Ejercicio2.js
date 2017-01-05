/*

2) Un sistema operativo mantiene 5 instancias de un recurso almacenadas en una cola,
cuando un proceso necesita usar una instancia del recurso la saca de la cola, la usa y
cuando termina de usarla la vuelve a depositar.

Autor del código: ferminmine 
https://github.com/ferminmine

*/

sistemaOperativo(){

  //variables compartidas
  SEM acceso_cola = 5; SEM usando = 5; QUEUE cola;

  PROCESS PROCESO [i=1 to N]{
    while (true){
      P(acceso_cola);
      P(usando);
      cola.pop(); //desencola recurso para usarlo
      V(acceso_cola);
      //utiliza el recurso
      P(acceso_cola);
      cola.push()
      V(acceso_cola);
      V(usando);
    }
  }

}
