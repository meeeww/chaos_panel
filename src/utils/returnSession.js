const returnSession = (usuario) => {
  if (usuario.informacion == undefined) {
    window.location.replace("/iniciosesion");
    window.localStorage.removeItem("token")
  }
};

export default returnSession;
