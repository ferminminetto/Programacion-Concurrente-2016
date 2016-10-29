/*

6)  En un entrenamiento de futbol hay 20 jugadores que forman 4 equipos (cada jugador
conoce el equipo al cual pertenece llamando a la función DarEquipo()). Cuando un
equipo está listo (han llegado los 5 jugadores que lo componen), debe enfrentarse a otro
equipo que también esté listo (los dos primeros equipos en juntarse juegan en la cancha
1, y los otros dos equipos juegan en la cancha 2). Una vez que el equipo conoce la
cancha en la que juega, sus jugadores se dirigen a ella. Cuando los 10 jugadores del
partido llegaron a la cancha comienza el partido, juegan durante 50 minutos, y al
terminar todos los jugadores del partido se retiran (no es necesario que se esperen para
salir).

Autor del código: ferminmine
https://github.com/ferminmine

*/

Process Jugador [i = 1 to 50] {
  int equipo_asignado;
  Asignador.asignar(equipo_asignado); // variable de entrada salida
  Equipo[equipo_asignado].agrupar(cancha_asignada) // var e/s
  delay(5); // se va a la cancha
  Cancha[cancha_asignada].esperar_resto();
  delay(50); //juega partido, PARA PENSAR: aunque lo correcto podría ser que cuando se junten los
            // integrantes de ambos equipos en la cancha, jueguen antes de que sea despertado
            // porque si no juegan en el semaforo antes de ser despertados, podría significar que cada jugador empiece a jugar en un momento distinto.
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
      //Aca podría ir el código que sea para "jugar el partido"
      signal_all(esperando);
    }
  }
}
