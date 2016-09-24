Monitor BD {
  Cond cola;
  int cant_adentro;
  Procedure entrar() {
    while (cant < 5) wait (cola); //cuando sale de cola gracias al while vuelve a chequear si no son 5.
    cant++
  }
  Procedure salir() {
    cant--;
    signal(cola)
  }
}

Process [i:= 1 to N] {
  BD.entrar();
  //consulta a BD
  BD.salir();
}
