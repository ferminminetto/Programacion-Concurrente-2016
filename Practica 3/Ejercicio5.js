/*

5)  Se tienen 50 empleados de una empresa petrolera que se reúnen para ir en grupos de a 5
a verificar 1 de los 10 pozos de petróleo existentes, cuando los empleados llegan se les
asigna un numero de grupo, luego deberán esperar a sus compañeros de grupo para ir a
la verificación.

Autor del código: ferminmine
https://github.com/ferminmine

*/

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
