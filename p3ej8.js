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
