const columns = [ //hay que añadir si esta activo (statusoptions) + posicion real
    { name: "Nombre", uid: "nombre_usuario", modificar: "nombre_usuario", tipo: "text" },
    { name: "Apellido", uid: "apellido_usuario", modificar: "apellido_usuario", tipo: "text" },
    { name: "Nick", uid: "nick_usuario", modificar: "nick_usuario", tipo: "text" },
    { name: "Edad", uid: "edad", modificar: "edad", tipo: "number" },
    { name: "Rol", uid: "rol", modificar: "rol", tipo: "number" },
    { name: "Equipo", uid: "id_equipo", modificar: "id_equipo", tipo: "text"}
];

export { columns }