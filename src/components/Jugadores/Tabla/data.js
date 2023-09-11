const columns = [
    { name: "ID", uid: "id_usuario", sortable: true },
    { name: "NICK", uid: "nick_usuario", sortable: true },
    { name: "NOMBRE", uid: "nombre_usuario", sortable: true },
    { name: "APELLIDO", uid: "apellido_usuario", sortable: true },
    { name: "EDAD", uid: "edad", sortable: true },
    { name: "POSICION", uid: "linea_principal", sortable: true },
    { name: "POSICION SECUNDARIA", uid: "linea_secundaria", sortable: true },
    { name: "ESTADO", uid: "verificado", sortable: true },
];

const statusOptions = [
    { name: "Activo", uid: 1 },
    { name: "Inactivo", uid: 0 },
];

export {columns, statusOptions}