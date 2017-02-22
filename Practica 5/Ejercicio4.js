/*

4) Se debe controlar el acceso a una base de datos. Existen A procesos de Tipo 1, B
procesos de Tipo 2 y C procesos de Tipo 3 que trabajan indefinidamente de la siguiente
manera:
• Proceso Tipo 1: intenta escribir, si no lo logro en 2 minutos, espera 5 minutos y
vuelve a intentarlo.
• Proceso Tipo 2: intenta escribir, si no lo logra en 5 minutos, intenta leer, si no lo
logra en 5 minutos vuelve a comenzar.
• Proceso Tipo 3: intenta leer, si no puede inmediatamente entonces espera hasta
poder escribir.
Un proceso que quiera escribir podrá acceder si no hay ningún otro proceso en la base de
datos, al acceder escribe y avisa que termino de escribir. Un proceso que quiera leer
podrá acceder si no hay procesos que escriban, al acceder lee y avisa que termino de
leer. Siempre se le debe dar prioridad al pedido de acceso para escribir sobre el pedido
de acceso para leer.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCEDURE BD is
  TASK type proceso1;
  TASK type proceso2;
  TASK type proceso3;
  TASK admin_bd
    entry quiero_leer();
    entry quiero_escribir();
    entry termine_leer();
    entry termine_escribir();
  end admin_bd;

  TASK body proceso1 is
      accedi: boolean;
  begin
      accedi := false;
      loop
          SELECT admin_bd.quierlo_ler();
              //accedo BD
              admin_bd.termine_leer();
          OR delay 2;
            delay 5;
          END select;
      end loop;
  end proceso1;

  TASK body admin_bd is
      integer leyendo, escribiendo := 0;
  begin
      while (true) do begin
          SELECT
              WHEN(escribiendo = 0 AND quiero_escribir count = 0) => acccept quiero_leer() do
                                                                        leyendo := leyendo + 1;
                                                                     end quiero_leer;
              or WHEN (leyendo = 0 AND escribiendo = 0) => accept quiero_escribir() do
                                                              escribiendo := escribiendo +1;
                                                           end quiero_escrbir;
              or ACCEPT termine_leer() do
                  leyendo:=leyendo-1;
                 end termine_leer;
              or ACCEPT termine_escribir() do
                  escrbiendo:=escribiendo-1;
              end termine_escribir;
          END SELECT
      end while;
  end admin_bd;
