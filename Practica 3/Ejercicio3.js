/*

3)  En un laboratorio de genética se debe administrar el uso de una máquina secuenciadora
de ADN. Esta máquina se puede utilizar por una única persona a la vez. Existen 100
personas en el laboratorio que utilizan repetidamente esta máquina para sus estudios,
para esto cada persona pide permiso para usarla, y cuando termina el análisis avisa que
termino. Cuando la máquina está libre se le debe adjudicar a aquella persona cuyo
pedido tiene mayor prioridad (valor numérico entre 0 y 100).

Autor del código: ferminmine
https://github.com/ferminmine

*/

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
