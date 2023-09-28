const returnSession = (usuario, setAcceso) => {
  if (usuario.informacion == undefined) {
    window.location.replace("/iniciosesion");
  } else {
    setAcceso(true)
  }
};

export default returnSession;
