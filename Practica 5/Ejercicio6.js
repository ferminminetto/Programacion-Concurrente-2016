/*

5) Se dispone de un sistema compuesto por 1 central y 2 procesos. Los procesos envían
señales a la central. La central comienza su ejecución tomando una señal del proceso 1,
luego toma aleatoriamente señales de cualquiera de los dos indefinidamente. Al recibir
una señal de proceso 2, recibe señales del mismo proceso durante 3 minutos.
El proceso 1 envía una señal que es considerada vieja (se deshecha) si en 2 minutos no
fue recibida.
El proceso 2 envía una señal, si no es recibida en ese instante espera 1 minuto y vuelve a
mandarla (no se deshecha).

NOTA: Boceto de ejercicio. Falta mejorar algo:
      Idealmente debe existir un intermediario entre el procesador y el administrador para que si el adminsitrador al querer darle
      un trabajo a un procesador que se encuentra trabajando no se quede trabajo.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCEDURE computadora is
  TASK TYPE usuario is
    entry recibir_procesadorID(in: procesadorID);
    entry recibir_id(in: usuario_id);
  end usuario;
  TASK type procesador is
      entry toma_proceso(in: proceso, in:usuario_id);
      entry recibir_id(in: proceso_id);
  end procesador;

  BEGIN
      for p:=1 to N do usuarios[p].recibir_id(p);
      for p:=1 to N do procesadores[p].recibir_id(p);
  END;

  TASK BODY usuario is
      var procesador_id: integer; string[20] estado; task_id: integer; proceso: proceso;
    BEGIN
          accept recibir_id(task_id);
          estado:="pendiente";
          while(estado != "terminado") DO BEGIN
            administrador.quiero_procesador (in:task_id, out: procesador_id);
            procesadores[procesador_id].toma_procesador(proceso, task_id);
            acccept.recibir_proceso(proceso, estado);
            if (estado = "error de ejecucion") then begin /* arregla el proceso */ endif;
          end while;
    end usuario;

    TASK BODY administrador is
      var contador_procesadores: array 1..k of integer;
    BEGIN
        while (true) do begin
            SELECT
                accept quiero_procesador(in:usuario_id, out:procesador_id) do
                    procesador_id := minimo(contador_procesadores); //devuelve el procesador con menos carga
                    contador_procesadores[procesador_id]++;
                end accept;
                or accept termine_proceso(in: procesador_id) do
                    contador_procesadores[procesador_id]--;
                end accept;
            END SELECT;
        end while;
    end administrador;

    TASK body PROCESADOR is
        cola_procesos = queue of proceso;
        round_robin:integer;
        linea_sig: linea_codigo;
        proceso_actual : proceso;
    BEGIN
      accept recibir_id(task_id);
      round_robin:=3;
      while(true) do begin
        SELECT
          ACCEPT toma_proceso(in: proceso, in: userID) do
                      proceso.setUserID(userID);
                      cola_procesos.push(proceso);
          end accept;
        END select;
        ciclo := 0;
        estado := "";
        proceso_actual := cola_procesos.pop(); //contemplar caso que este vacía
        while (estado != "finalizado" OR ciclo<round_robin or estado = 'error de ejecucion') do begin
          linea_sig := lineaSiguiente(proceso_actual);
          estado:=ejecucion(linea_sig);
          ciclo++;
        end while;
        if (ciclo = round_robin) AND (estado != 'error de ejecucion') then cola_procesos.push(proceso_actual);
        else begin
                usuario_devolver := proceso_actual.getUsuarioID();
                usuarios[usuario_devolver].recibir_proceso(proceso_actual, estado);
            end;
      end while;
    END procesador;
