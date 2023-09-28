const checkSession = (rol) => {
  console.log(rol);
  switch (rol) {
    case 0:
        return "Usuario"
    case 1:
        return "Jugador"
    case 2:
        return "Jugador Reserva"

    case 5:
        return "Coach"
    case 6:
        return "Manager"
    case 7:
        return "Sub Presidente"
    case 8:
        return "Presidente"

    case 10:
        return "Caster"
    case 11:
        return "Realizador"
    case 12:
        return "Community Manager"
    case 13:
        return "Diseñador"

    case 15:
        return "Arbitro"
    case 16:
        return "Arbitro Jefe"
    case 17:
        return "Desarrollador"

    case 20:
        return "CTO"
    case 21:
        return "COO"
    case 22:
        return "CEO"
  }
};

export default checkSession;
