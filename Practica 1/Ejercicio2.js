/*

2. Dado un numero N verifique cuantas veces aparece ese número en un arreglo de longitud M.
Realice el algoritmo en forma concurrente utilizando <> y <await B; S>. Escriba las condiciones
que considere necesarias.

Autor del código: ferminmine
https://github.com/ferminmine
*/

CHEQUEAR (int[] arr, int num){  //programa principal

    //Variables compartidas
    int[] arr;
    int numero_buscar = read();
    int longitud_arreglo = arr.size();
    int cantidad_procesos = read();
    int carga_por_proceso = (longitud_arreglo / cantidad_procesos);
    int base = 0;
    int procesos_terminados = 0;
    int cantidad_ocurrencias;

    PROCESS BUSCADOR [i=1 to cantidad_procesos]{
      int cantidad_ocurrencias_aux = 0;
      int mi_base;
      < base = base + carga_por_proceso;
        mi_base = base; >
      for (mi_base to (mi_base + carga_por_proceso) ){
        if (arr[mi_base] == numero_buscar) cantidad_ocurrencias_aux;
      }
      < cantidad_ocurrencias = cantidad_ocurrencias + cantidad_ocurrencias_aux >
      < fin = fin + 1 >
    }

    <await (fin = cantidad_procesos)>
    print(cantidad_ocurrencias);
}
