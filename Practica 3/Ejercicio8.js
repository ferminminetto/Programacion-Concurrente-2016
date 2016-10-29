/*

8. Suponga que en una fábrica de camisas trabajan 40 operarios que deben realizarse 5000
camisas. Para realizar una camisa se requieren 8 materiales diferentes, por lo que existe
un depósito para cada uno de estos donde se almacenan.
Cuando todos los operarios han llegado el encargado los agrupa de a cuatro (les asigna
un número de grupo de 1 a 10). Los 4 operarios de grupo deben juntarse y luego
comenzar a fabricar las camisas.
Para realizar cada camisa, entre los empleados del grupo deben buscar los 8 materiales
necesarios, cuando lo han conseguido, los 4 la fabrican conjuntamente.
Luego de que todas las camisas han sido fabricadas los operarios deben retirarse.
Nota: no se deben fabricar camisas de más. No se puede suponer nada sobre los tiempos,
es decir, el tiempo en que un operario tarda en buscar los elementos, ni el tiempo en que
tarda un grupo en fabricar una camisa.


Autor del código: ferminmine
https://github.com/ferminmine

*/

Process Operario [i=1 to 40] {
  int grupo_asignado; bool autorizacion; Recurso recurso1, recurso2;
  Asignador.asignar(grupo_asignado);
  Esperador.esperar();
  Grupo[grupo_asignado].asignar_depositos(carga);
  Coordinador.autorizar_camisa(autorizacion);
  while (autorizacion) {
    Deposito[carga].obtener(recurso1);
    Deposito[carga].obtener(recurso2);
    Grupo[grupo_asignado].esperar_recursos();
    Coordinador.terminar_camisa();
    Coordinador.autorizar_camisa(autorizacion);
  }
}

Monitor Esperador {
  listos = 0; Cond esperando;
  Procedure esperar (){
    listos++;
    if (listos != 40) {
      wait(esperando);
    } else {
      signal_all(esperando);
    }
  }
}

Monitor Grupo [k=1 to 10] {
  tarea = 1; int trajeron = 0; Cond esperando;
  Procedure asignar_depositos (int carga) {
    carga = tarea;
    tarea+= 2;
  }
  Procedure esperar_recursos () {
    trajeron++;
    if (trajeron < 4) {
      wait(esperando);
    } else {
      signal_all(esperando);
    }
  }
}

Monitor Coordinador {
  int trabajando = 0; int finalizadas = 0;
  Procedure autorizar_camisa (bool autorizacion) {
    autorizacion = ((finalizadas + trabajando) < 5000);
    if (autorizacion) { trabajando ++}
  }
  Procedure terminar_camisa () {
    finalizadas++; trabajando--;
  }
}

Monitor Deposito [j = 1 to 8]{
  Stack<Recurso> rec;
  Procedure obtener (Recurso recur) {
    recur = rec.pop();
  }
}

Monitor Asignador {
  int[10] grupos;
  Procedure asignar (int numero) {
    numero = darNumero(grupos); // método mágico que da un numero de grupo
  }
}
