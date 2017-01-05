/*

7) Existe una casa de comida rápida que es atendida por 1 empleado. Cuando una persona
llega se pone en la cola y espera a lo sumo 10 minutos a que el empleado lo atienda. Pasado
ese tiempo se retira sin realizar la compra.

Autor: ferminmine
https://github.com/ferminmine

*/

comidaRapida(){

  //variables Compartidas
  QUEUE cola;
  SEM[1..N] llegue = 0;
  SEM[1..N] esperar = 0;
  SEM[1..N] acceso_estado = 1;
  STRING[1..N] estado = "esperando";
  SEM acceso_cola = 1;
  SEM atendeme = 0;

  PROCESS CLIENTE (i=1 to N){
    P(acceso_cola);
      cola.encolar(i);
    V(acceso_cola);
    V(llegue[i]);
    P(esperar[i]);
    if(estado[i] == "atender") V(atendeme);
  }

  PROCESS ALARMA (i=1 to N){
    P(llegue[i]);
    delay(10);
    P(acceso_estado[i]);
    if (estado[i] == "atendiendo") V(acceso_estado[i]);
    else {
      estado[i] = "marcharse";
      V(esperar[i]);
      V(acceso_estado[i]);
    }
  }

  PROCESS EMPLEADO{
    P(acceso_cola);
    while (cola.hasElements()){
      int cliente = cola.pop();
      V(acceso_cola);
      P(acceso_estado[cliente]);
      if (estado != "marcharse"){
        estado[i] = "atender";
        V(acceso_estado[i]);
        V(esperar[i]);
        P(atendeme);
        //lo atiende
      }
      P(acceso_cola);
    }
    V(acceso_cola);
  }

  }



  }


}
