Process Empleado [int i= 1 to 50] {
  Asignador.asignar(asignado);
  Grupo[asignado].agrupar();
  // realiza ispección
}

Monitor Asignador {
  int [1..10] grupos;
  Procedure asignar (int asignado) {
    asignado = asignar_grupo(grupos); // método mágico que asigna un grupo a un empleado
  }
}

Monitor Grupo [int k = 1 to 10] {
  int agrupados = 0; Cond emp;
  Procedure agrupar() {
    agrupados++;
    if (agrupados != 5) {
      wait(emp);
    } else {
      signal_all(emp);
    }
  }
}
