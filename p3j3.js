Process [i:=1 to 100] {
  int prioridad = asignarPrioridad(); // método mágico que devuelve una prioridad
  Secuenciadora.entrar(prioridad);
  // uso de máquina
  Secuenciadora.salir();
}

Monitor Secuenciadora {
  bool en_uso = false;
  Cond[100] espera;
  cola_prioridad prioridades;

  Procedure entrar (int prioridad) {
    if (en_uso) {
      prioridades.push(prioridad); // asigno al primero con esa prioridad ahí
      wait(espera[prioridad]);
    }
    en_uso = true;
  }

  Procedure salir () {
    if (prioridades.hasElements()) {
      int liberar = prioridades.pop(); // devuelve el de mayor prioridades
      signal(espera[liberar]);
    } else {
      en_uso = false;
    }
  }
}
