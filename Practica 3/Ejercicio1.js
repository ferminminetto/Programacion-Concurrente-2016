/*

1) Se dispone de un puente por el cual puede pasar un solo auto a la vez. Un auto pide
permiso para pasar por el puente, cruza por el mismo y luego sigue su camino. Nota: no
importa el orden en que han llegado al puente.
Monitor Puente
cond cola;
int cant= 0;
Procedure entrarPuente (int au)
while ( cant > 0) wait (cola);
cant = cant + 1;
end;
Process Auto [a:1..M]
Puente. entrarPuente (a);
“el auto cruza el puente”
Puente. salirPuente(a);
End Process;
Procedure salirPuente (int au)
cant = cant – 1;
signal(cola);
end;
End Monitor;
a.b.c.¿El código funciona correctamente? Justifique su respuesta.
¿Se podría simplificar el programa? En caso afirmativo, rescriba el código.
Si hubiese que respetar el orden de llegada de los vehículos, ¿La solución original lo
respeta? Si rescribió el código en el punto b), ¿esa solución lo respeta?.

Autor del código: ferminmine
https://github.com/ferminmine

*/

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
