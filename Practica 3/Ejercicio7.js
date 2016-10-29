/*

7)  Resolver la siguiente situación. Suponga una comisión con 50 alumnos. Cuando los
alumnos llegan forman una fila, una vez que están los 50 en la fila el jefe de trabajos
prácticos les entrega el número de grupo (número aleatorio del 1 al 25) de tal manera
que dos alumnos tendrán el mismo número de grupo (suponga que el jefe posee una
función DarNumero() que devuelve en forma aleatoria un número del 1 al 25, el jefe de
trabajos prácticos no guarda el número que le asigna a cada alumno). Cuando un
alumno ha recibido su número de grupo comienza a realizar la práctica. Al terminar de
trabajar, el alumno le avisa al jefe de trabajos prácticos y espera la nota. El jefe de
trabajos prácticos, cuando han llegado los dos alumnos de un grupo les devuelve a
ambos la nota del GRUPO (el primer grupo en terminar tendrá como nota 25, el segundo
24, y así sucesivamente hasta el último que tendrá nota 1).

Autor del código: ferminmine
https://github.com/ferminmine

*/

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
    listos++;
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
