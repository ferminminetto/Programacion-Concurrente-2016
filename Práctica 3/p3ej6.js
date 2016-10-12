Process Jugador [i = 1 to 50] {
  int equipo_asignado;
  Asignador.asignar(equipo_asignado); // variable de entrada salida
  Equipo[equipo_asignado].agrupar(cancha_asignada) // var e/s
  delay(5); // se va a la cancha
  Cancha[cancha_asignada].esperar_resto();
  delay(50); //juega partido
}

Monitor Asignador {
  int[1..4] equipos;
  Procedure asignar (int equipo_asignado){
    equipo_asignado = darEquipo(equipos, equipo_asignado); // método mágico que le da un Equipo al jugador
  }
}

Monitor Equipo[k= 1 to 4] {
  asignados = 0; Cond jugador; int cancha;
  Procedure agrupar (int cancha_asignada) {
    asignados++;
    if (asignados != 5){
      wait(jugador);
    } else {
      Asignador_Cancha.asignar(k, cancha);
      signal_all(jugador);
    }
    cancha_asignada = cancha;
  }
}

Monitor Asignador_Cancha {
  preparados = 0; asignada = 0; Cond esperando;
  Procedure asignar (int equipo_asignar, int cancha_asignada) {
    preparados++;
    if (preparados < 2) {
      wait(esperando);
    } else {
      asignada++; signal_all(esperando); preparados = 0;
    }
    cancha_asignada = asignada;
  }
}

Monitor Cancha [m = 1 to 2] {
  preparados = 0; Cond esperando;
  Procedure esperar_resto () {
    if (preparados != 10) {
      wait(esperando);
    } else {
      signal_all(esperando);
    }
  }
}
