/*

5)  Suponga que N personas llegan a la cola de un banco. Una vez que la persona se agrega
en la cola no espera más de 15 minutos para su atención, si pasado ese tiempo no fue
atendida se retira. Para atender a las personas existen 2 empleados que van atendiendo
de a una y por orden de llegada a las personas.

Autor: ferminmine
https://github.com/ferminmine

*/

PROCESS PERSONA [i=1 to N]{
  send iniciarTimer[i];
  send atender(i);
  receive me_atienden[i](atienden);
  if (atiended){
    //codigo de atencion
  } else irse();
}

PROCESS EMPLEADO [q=1 to 2]{
  while (true){
    receive atender(id);
    send estado[id]('atiendo', q);
    receive rta_estado[q](rta);
    if (rta){
      //lo atiendo
    } else //paso al siguiente
  }
}

PROCESS ADMIN_ESTADO [f=1 to N]{
  receive estado[t](primer, id);
  if (primer == "reloj"){
    send me_atienden[t] (false);
    receive estado[t](aux, id)
    send rta_estado[id](false);
  } elseif (primer == "atiendo"){
    send me_atienden[t](true);
    send rta_estado[id](true);
  }
}
