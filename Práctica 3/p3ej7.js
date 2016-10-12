Process Alumno [i=1 to 50] {
  int numero;
  Seleccionador.fila();
  Entregador.entregar(numero);
  delay(10); // hace tarea
  Agrupador[numero].terminar(nota);
}

Monitor Seleccionador {
  preparados = 0; Cond esperando;
  Procedure fila (){
      preparados++;
      if (preparados != 50) {
        wait(esperando);
      } else {
        signal_all(esperando);
      }
  }
}

Monitor Entregador {
  int[25] grupos;
  Procedure entregar (int numero) {
    numero = darNumero(grupos); // método mágico que da un numero de grupo
  }
}

Monitor Agrupador [k=1 to 25] {
  listos = 0; Cond esperando; int nota;

  Procedure terminar (int nota_sacada) {
    if (listos != 2) {
      wait(esperando);
    } else {
      Jefe.corregir(nota); signal(esperando);
    }
    nota_sacada = nota;
  }
}

Monitor Jefe {
  nota = 25;
  Procedure corregir (int resultado) {
    resultado = nota--;
  }
}
