/*

7)  En una estación de comunicaciones se cuenta con 10 radares y una unidad de
procesamiento que se encarga de procesar la información enviada por los radares. Cada
radar repetidamente detecta señales de radio durante 15 segundos y le envía esos datos a
la unidad de procesamiento para que los analice. Los radares no deben esperar a ser
atendidos para continuar trabajando.
Nota: maximizar la concurrencia

Autor: ferminmine
https://github.com/ferminmine

*/

PROCESS RADAR[i=1 to 10]{
  while (true){
    delay(0.15); //detecta señales
    captador ! señal;
  }
}

PROCESS CAPTADOR {
  while (true){
    if true; radar[*] ? señal -> señales.push(señal);
    if [] señales.hasElements(); procesador ? mandame -> señal = señales.pop();
                                                      procesador ! señal;
  }

PROCESS PROCESADOR {
  while (true){
    captador ! mandame;
    captador ? señal;
    delay(); //procesa la señal
  }
}
}
