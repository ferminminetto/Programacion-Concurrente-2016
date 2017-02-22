/*

5) Se dispone de un sistema compuesto por 1 central y 2 procesos. Los procesos envían
señales a la central. La central comienza su ejecución tomando una señal del proceso 1,
luego toma aleatoriamente señales de cualquiera de los dos indefinidamente. Al recibir
una señal de proceso 2, recibe señales del mismo proceso durante 3 minutos.
El proceso 1 envía una señal que es considerada vieja (se deshecha) si en 2 minutos no
fue recibida.
El proceso 2 envía una señal, si no es recibida en ese instante espera 1 minuto y vuelve a
mandarla (no se deshecha).

Autor: ferminmine
https://github.com/ferminmine

*/

PROCEDURE BD is
  TASK type proceso1;
  TASK type proceso2;
  TASK timer
    entry comenzar;
  end timer;

  TASK BODY proceso2 is begin
    while(true) do begin
        señal := genera_señal();
        recibida := false;
        while (recibida) do begin
          SELECT
              central.señal2(señal);
              recibida:=true;
          ELSE delay(1);
        end while;
    end while;
  end proceso2;

  TASK BODY proceso1 is begin
      while (true) do begin
          señal:=recibir_señal();
          SELECT central.señal1(señal);
          OR delay(2)
      end while;
  end proceso1;

  TASK BODY central is
    var recibi_señal2;
    señal: señal;
    begin
      accept señal1(señal);
      while (true) do begin
          recibi_señal2 := false;
          SELECT accept señal1(señal);
          OR accept señal2(señal) do
                recibi_señal2 := true;
             end accept;
          END SELECT;
          if (recibi_señal2) then begin
            timer.comenzar();
            pasaron3:=false;
            while (not pasaron3) do begin
                SELECT accept timeout(pasaron3);
                OR WHEN (timeout count = 0) => accept señal2(señal);
            end while;
          end if;
      end while;
    end central;

    TASK BODY timer is begin
      while (true) do begin
          accept comenzar;
          delay(3);
          central.timeout(true);
      end while;
    end timer;
