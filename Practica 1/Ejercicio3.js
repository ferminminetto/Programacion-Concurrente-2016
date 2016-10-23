/*

3. En base a lo visto en la clase 2 de teoría.
Indicar si el siguiente código funciona para resolver el problema de Productor/Consumidor
con un buffer de tamaño N. En caso de no funcionar, debe hacer las modificaciones
necesarias.

------------------------------------------------------

Autor del código: ferminmine
https://github.com/ferminmine

  Problemas:
    1) Hay interferencia.
    2) El productor puede llegar a producir dos veces
    3) El consumidor puede llegar a leer de algo vacío

  Solucion: Se aumenta la cantidad de "cargado" o "leido" SOLO DESPUÉS de realizar la operación y NO antes.

*/
ProductoresConsumidores(){
    int cant = 0;
    int pri_ocupada;
    int pri_vacia = 0;
    int buffer[n];

    Productor(){
      while(true){
        //produce elemento
        <await (cant<N);>
        buffer[pri_vacia] = elemento;
        pri_vacia = (pri_vacia + 1) mod N;
        <cant++>
      }
    }

    Consumidor(){
      while (true){
        <await (cant>0);>
        elemento=buffer[pri_ocupada];
        pri_ocupada = (pri_ocupada + 1) mod N;
        < cant-- >
        //consume elemento
      }
    }

}
