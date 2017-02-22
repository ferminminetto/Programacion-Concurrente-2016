/*

1) Se requiere modelar un puente de un solo sentido, el puente solo soporta el peso de 3
autos, 2 camionetas o un camión.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCEDURE CRUCE is
  TASK TYPE VEHICULO;
  ARRAY VEHICULOS : array (1..N) of VEHICULO;
  TASK PUENTE
    ENTRY ENTRAR (tipo: in; puedo_pasar: out);
    ENTRY SALIR (tipo: in);
  END PUENTE;

TASK VEHICULO is
  boolean pasar := false;
  enum tipo := ('AUTO' | 'CAMIONETA' | 'CAMIÓN');
BEGIN
  read(tipo); //me fijo si soy auto, camioneta o camión
  while (not pasar) puente.entrar(tipo, pasar);
  //código para cruzar el puente
  puente.salir(tipo);
END;

TASK BODY PUENTE is
  integer auto,camioneta,camion := 0;
BEGIN
  while (true) do begin
      SELECT
            ACCEPT salir(tipo: in) is
                if (tipo = 'auto') then auto--;
                else if (tipo = 'camioneta') then camioneta--;
                else camion--;
            end SALIR;

            ACCEPT entrar(tipo:in, respuesta: out) is
              if (tipo = 'auto') and (auto < 3) BEGIN
                respuesta := true;
                auto++;
              END ELSE IF (tipo = 'camion') and (camion < 1) then BEGIN
                respuesta := true;
                camion++;
              END ELSE IF (tipo = 'camioneta') and (camionetas < 2) then BEGIN
                respuesta := true;
                camioneta++;
              END else respuesta := false;
            END ENTRAR;
       END SELECT;
  end while;
END PUENTE;
