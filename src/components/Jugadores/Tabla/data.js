const columns = [
    { name: "ID", uid: "id_usuario", sortable: true },
    { name: "NICK", uid: "nick_usuario", sortable: true },
    { name: "NOMBRE", uid: "nombre_usuario", sortable: true },
    { name: "APELLIDO", uid: "apellido_usuario", sortable: true },
    { name: "PERMISOS", uid: "rol", sortable: true },
    { name: "EDAD", uid: "edad", sortable: true },
    { name: "ACCIONES", uid: "actions" },
];

const tipoRol = [
    { name: "Usuarios", uid: "0" },
    { name: "Jugadores", uid: "1" },
    { name: "Jugadores Reserva", uid: "2" },

    { name: "Coaches", uid: "5" },
    { name: "Managers", uid: "6" },
    { name: "Sub Presidentes", uid: "7" },
    { name: "Presidentes", uid: "8" },

    { name: "Casters", uid: "10" },
    { name: "Realizadores", uid: "11" },
    { name: "Community Managers", uid: "12" },
    { name: "Diseñadores", uid: "13" },

    { name: "Arbritos", uid: "15" },
    { name: "Arbritos Jefe", uid: "16" },
    { name: "Desarrolladores", uid: "17" },

    { name: "CTO", uid: "20" },
    { name: "CMO", uid: "21" },
    { name: "COO", uid: "22" },
    { name: "CEO", uid: "23" },
];

export { columns, tipoRol }