/*

2) Se quiere modelar la cola de un banco que atiende un solo empleado, los clientes llegan
y si esperan más de 10 minutos se retiran.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCEDURE BANCO is

  TASK TYPE cliente;
  TASK empleado
    entry atender(info_aux: in);
  end empleado;
  clientes: array (1..N) of cliente;

  TASK body empleado is begin
    while (true) do begin
      accept atender(info_aux: in) do
        //atiende al empleado usando info_aux
      end accept;
    end while;
  end empleado;

  TASK body cliente is
    info_cliente: string;
    begin
      SELECT empleado.atender(info_cliente);
             OR delay(10);
      END SELECT;
    end cliente;
