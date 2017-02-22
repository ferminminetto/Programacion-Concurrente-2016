/*

3) Se debe modelar un buscador para contar la cantidad de veces que aparece un número
dentro de un vector distribuido entre las N tareas contador. Además existe un
administrador que decide el número que se desea buscar y se lo envía a los N contadores
para que lo busquen en la parte del vector que poseen.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCEDURE VECTOR_DISTRIBUIDO is

  TASK TYPE CONTADOR
      entry buscar(numero: int);
  END CONTADOR;
  TASK ADMIN
      entry respuesta(encontrado: in);
      entry quiero_buscar (task_id: in);TASK TYPE cliente;
  TASK empleado
    entry atender(info_aux: in);
  end empleado;
  clientes: array (1..N) of cliente;
  END ADMIN;
  CONTADORES: array (1..N) of contador;

  TASK body contador is
      num_buscar: integer; encontrado: boolean;
      begin
          admin.quiero_buscar(task_id);
          //busca el número en su parte del vector y si lo encuentra setea encontrado en true; caso contrario lo setea en false
          admin.respuesta(encontrado, task_id);
      END contador;

  TASK body admin is
      num_buscar, task_id: integer;
      encontrado: boolean;
  begin
      read(num_buscar);
      while(not encontrado) begin
          SELECT accept quiero_buscar(task_id) do
          end;

          OR accept respuesta(encontrado) do
              if (encontrado) then begin
                  //hace algo con el número
              end;
          end accept;
      end while;
  end admin;
