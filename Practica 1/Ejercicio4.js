/*

4. En base a lo visto en la clase 3 de teoría, resuelva el problema de acceso a la sección crítica
usando un proceso coordinador. En este caso, cuando un proceso SC[i] quiere entrar a su sección
crítica le avisa al coordinador, y espera a que éste le dé permiso. Al terminar de ejecutar su
sección crítica, el proceso SC[i] le avisa al coordinador. Desarrolle una solución de grano fino
usando sólo variables compartidas (sin sentencias especiales como TS o FA, ni sentencias
await).

Autor del código: ferminmine
https://github.com/ferminmine

NOTA: hay cosas feas que debido a que no se puede utilizar await ni semáforos resultan complicadas de evitar. En ambos procesos CLIENTE y COORDINADOR se termina haciendo busy waiting;
el cliente para esperar a que le den permiso y el COORDINADOR continuamente buscando que el cliente termine de ejecutar
la sección crítica y continuamente buscando a un CLIENTE que quiera entrar a la sección.
*/

seccion_critica(){

  //variables compartidas
  bool[n] permiso;
  bool termine = false;
  bool[n] entrar_seccion = false; //si se usara cola habría que controlar el acceso
  int proceso_actual;

  PROCESS CLIENTE [i=1 to N]{

    //SECCION DE CÓDIGO NO CRÍTICA

    entrar_seccion[i] = true;
    while (NOT permiso[i]) do skip; //cosa mala: busy waiting, pero no queda otra porque no se pueden usar semáforos (P2)

    //PARTE DEL CÓDIGO DE SECCIÓN CRÍTICA
    //FINALIZA LA EJECUCIÓN DE LA SECCION CRÍTICA

    termine = true;
  }

  PROCESS COORDINADOR{
    bool encontre = false;
    while (encontre){
    for (q=1 to N){
        if (entrar_seccion[i]){
          encontre = true;
          entrar[i] = false;
          proceso_actual = q;
        }
      }
    }
    encontre = false;
    permiso[proceso_actual] = true;
    while ( true ) {
      while (NOT termine) do skip;
      termine = false;
      permiso[proceso_actual] = false;
      bool encontre = false;

      //vuelve a buscar uno para dejar pasar
      while (encontre){
      for (q=1 to N){
          if (entrar_seccion[i]){
            encontre = true;
            entrar[i] = false;
            proceso_actual = q;
          }
        }
      }
      encontre = false;
      permiso[proceso_actual] = true;
    }

  }

}
