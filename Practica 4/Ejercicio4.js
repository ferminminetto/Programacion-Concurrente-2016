/*

4)  Se desea modelar una competencia de atletismo. Para eso existen dos tipos de procesos:
C corredores y un portero. Los corredores deben esperar que se habilite la entrada a la
pista, donde deben esperar que lleguen todos los corredores para comenzar. El portero es
el encargado de habilitar la entrada a la pista.
a) Implementar usando un coordinador.
b) Implementar sin usar un coordinador.
NOTAS: el proceso portero NO puede contabilizar nada, su única función es habilitar la
entrada a la pista; NO se puede suponer ningún orden en la llegada de los corredores al
punto de partida.

Autor: ferminmine
https://github.com/ferminmine

*/

a) Con Coordinador

PROCESS CORREDOR[i=1 to N]{
  delay(5);
  send llegue;
  receive señal_comienzo(i);
}

PROCESS coordinador{
  int cont=0;
  while (cont < N){
    receive llegue;
    cont++;
  }
  send dar_señal;
}

PROCESS PORTERO {
  receive dar_señal;
  for [i=1; i<=N; i++]{
    send señal_comienzo[i];
  }
}

b) Sin coordinador

PROCESS CORREDOR [i=1 to N]{
  delay(5);
  for [k=1 to N] send llegue[k];
  for [k=1 to N] receive llegue[k];
  send llegaron;
  receive dar_señal[i];
}

PROCESS PORTERO{
  for [k=1 to N] receive llegaron;
  for [k=1 to N] send dar_señal[k];
}
