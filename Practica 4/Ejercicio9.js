/*

9)  Se debe modelar la atención en una panadería por parte de 3 empleados. Hay C clientes
que ingresan al negocio para ser atendidos por cualquiera de los empleados, los cuales
deben atenderse de acuerdo al orden de llegada.
Nota: maximizar la concurrencia.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCESS CLIENTE [i=1 to N]{
  recepcion ! (pedido);
  empleado[*] ? (pedido);
}

PROCESS RECEPCION{
  while (true){
    if [] true; cliente[*] ? (pedido) -> pedidos.push(pedido);
       [] pedidos.hasElements(); empleado[*] ? (dame_trabajo) ->  trabajo= pedidos.pop();
                                                                  empleado[dame_trabajo] ! trabajo;
  }
}

PROCESS EMPLEADO [q=1 to N]{
  while (true){
    recepcion ! (q);
    recepcion ? (pedido);
    delay(10);
    id_cli = pedido.idcliente();
    cliente[id_cli] ! pedido;
  }
}
