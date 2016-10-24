/*

8) Hay una fábrica con M operarios en donde se deben realizar N tareas (siendo M = Nx5).
Cada tarea se realiza de a grupos de 5 operarios, ni bien llegan a la fábrica se juntan de a
5 en el orden en que llegaron y cuando se ha formado el grupo se le da la tarea
correspondiente empezando de la tarea uno hasta la enésima. Una vez que los operarios
del grupo tienen la tarea asignada producen elementos hasta que hayan realizado
exactamente X entre los operarios del grupo. Una vez que terminaron de producir los X
elementos, se juntan los 5 operarios del grupo y se retiran.
Nota: cada operario puede hacer 0, 1 o más elementos de una tarea. El tiempo que cada
operario tarda en hacer cada elemento es diferente y random. Maximice la concurrencia.

NOTA IMPORTANTE: Código no corregido/validado.

Autor del código: ferminmine
https://github.com/ferminmine

*/

Variables Compartidas:
SEM acceso_cant = 1
int tarea_actual = 0
int cant = 0
tarea_asignada [n]
tarea [n] = x
sem acceso_tarea [n] = 1
sem comenzar [m] = 0
sem acc_terminados [n] = 5
sem irse [m] = 0
queue [n] operario_asignado

OPERARIO:
	process i=1 to M {
		p(acceso_cant)
		cant++
		if (cant mod 5 == 0){
			tarea_asignada[i] =  tarea[tarea_actual]
			for [k=0 to 3] { // libero barrera
				int operario_a_despertar = operario_asignado[tarea_actual].pop()
				v(comenzar[operario_a_despertar])
			}
			tarea_actual++
		}
		else {
			operario_asignado[tarea_actual].push(i);
      v(acceso_cant);
		}
		p(comenzar[i])
 // Empieza a laburar
    p(acceso_tarea[tarea_asignada[i]]) //devuelve x de la tarea asignada
      while (tarea[tarea_asignada[i]] =! 0) {
          tarea[tarea_asignada[i]] --;
          v(acceso_tarea[tarea_asignada[i]])
          hacer_elemento(); // random haciendo un elemento de la tarea
      }
      // no hay mas tareas y el flaco termino
      p(acc_terminados)
      cant_terminados++
      if (cant_terminados == 5) {
        for [k=0 to 3] { // libero barrera
          int operario_a_despertar = operario_asignado[tarea_actual].pop()
          v(irse[operario_a_despertar])
        }
      }
      else {
        operario_asignado[tarea_actual].push(i);
        v(acc_terminados);
      }
      P(irse[i])
	}
