/*

3)  Se debe modelar una casa de Comida Rápida, en el cual trabajan 2 cocineros y 3
vendedores. Además hay C clientes que dejan un pedido y quedan esperando a que se lo
alcancen.
Los pedidos que hacen los clientes son tomados por cualquiera de los vendedores y se lo
pasan a los cocineros para que realicen el plato. Cuando no hay pedidos para atender, los
vendedores aprovechan para reponer un pack de bebidas de la heladera (tardan entre 1 y
3 minutos para hacer esto).
Repetidamente cada cocinero toma un pedido pendiente dejado por los vendedores, lo
cocina y se lo entrega directamente al cliente correspondiente.
Nota: maximizar la concurrencia.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCESS CLIENTES [i=1 to C]{
  Pedido p;
  p.comida="algo de comida";
  p.id=i;
  send pedidos(p);
  receive respuesta[i](comida);
}

PROCESS ADMIN_PEDIDOS{
  Pedido p;
  while (true){
    receive pedidos(p);
    int derivar_a;
    receive estoy_listo(derivar_a);
    send pedidos_derivados[derivar_a](p);
  }
}

PROCESS VENDEDOR[q=1 to 3]{
  send estoy_listo(q);
  while (true){
    if NOT EMPTY (pedidos_derivados[q]){
      receive pedidos_derivados[derivar_a](p);
      send cocinar(p);
    } else delay(3);
    send estoy_listo(q);
  }
}

PROCESS COCINERO [k=1 to 2]{
  Pedido p;
  receive cocinar(p);
  //procesa pedido
  send respuesta[p.id](p);
}
