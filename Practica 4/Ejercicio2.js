/*

2)  Se desea modelar el funcionamiento de un banco en el cual existen 5 cajas para realizar
pagos. Existen P personas que desean pagar. Para esto cada una selecciona la caja donde
hay menos personas esperando, una vez seleccionada espera a ser atendido. Nota:
maximizando la concurrencia, deben usarse los valores actualizados del tamaño de las
colas para seleccionar la caja con menos gente esperando.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCESS COORDINADOR {
  while (true){
    if        [] NOT EMPTY LIBERAR {
                    receive liberar(caja_num);
                    cajas[caja_num]
                  }
              [] (EMPTY LIBERAR) & (NOT EMPTY PEDIDOS){
                    receive pedidos(cli_encolar);
                    caja_min = min(cajas);
                    send respuesta[cli_encolar](caja_min);
                  }
  }
}

PROCESS PERSONA [i=1 to P]{
  int caja_asignada;
  send pedidos(i);
  reicive respuesta[i](caja_asignada);
  delay(1);
  send atendeme(i);
}

PROCESS CAJA[k=1 to 5]{
  WHILE (true){
    receive atendeme(atender);
    delay(5);
    send liberar(i);
  }
}
