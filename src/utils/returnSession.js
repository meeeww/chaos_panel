const returnSession = (usuario, setAcceso) => {
  console.log(usuario.informacion)
  if (usuario.informacion == undefined) {
    window.location.replace("/iniciosesion");
    window.localStorage.removeItem("token")
  } else {
    setAcceso(true)
  }
};

export default returnSession;
