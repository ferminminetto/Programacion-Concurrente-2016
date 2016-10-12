a) El código funciona correctamente
b) Se podría reescribir el programa ya que el monitor realiza exclusión mutua.

Monitor Puente
  Cond cola;
  Procedure cruzarPuente ()
    delay(1);
  end
end

Process[1..M] Auto
  Puente.cruzarPuente();
end


c) Respeta el orden de llegada ya que se utiliza una cola donde se duermen los procesos auto cuando ya hay un auto pasando.
