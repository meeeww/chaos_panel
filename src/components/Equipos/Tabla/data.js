const columns = [ //hay que añadir si esta activo (statusoptions) + posicion real
    { name: "ID", uid: "id_equipo", sortable: true },
    { name: "NOMBRE", uid: "nombre_equipo", sortable: true },
    { name: "ACRONIMO", uid: "acronimo_equipo", sortable: true },
    { name: "LIGA", uid: "id_liga", sortable: true },
    { name: "TEMPORADA", uid: "id_temporada", sortable: true },
    { name: "POSICION", uid: "stage", sortable: true }, //semifinales, final, etc.
];

const statusOptions = [
    { name: "Activo", uid: 1 },
    { name: "Inactivo", uid: 0 },
];

export {columns, statusOptions}