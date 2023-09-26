import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    CircularProgress,
} from "@nextui-org/react";

import axios from "axios";
import api from "../../../../variables.json"

import ModalCrear from "../Modals/ModalCrear"
import ModalBorrar from "../Modals/ModalBorrar"

import { columns, statusOptions } from "./data";

const INITIAL_VISIBLE_COLUMNS = ["id_usuario", "nick_usuario", "actions"];

export default function Tabla() {

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "role",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([{
        "id_usuario": 16,
        "id_equipo": null,
        "id_discord": null,
        "nombre_usuario": "Juan",
        "apellido_usuario": "Zas",
        "nick_usuario": "zas",
        "nombre_ingame": "SupportConPanza",
        "id_ingame": "MRIE3IB1ZBIkLVTQ5nvEdV-0JkH8cI_RU4WnD7wAF8XKQs94",
        "puuid_ingame": "EwELBCKj5kiW7l8n0rMQREPcbQq8F_AHGZvKcIbO7qCLSw7cg8xOcSiSPuWdgYfueyYCEEqTiRE4PA",
        "edad": 20,
        "rol": 0,
        "linea_principal": "Support",
        "linea_secundaria": "Toplane",
        "verificado": 0
    }])

    const [cambioDeDatos, setCambioDeDatos] = useState(false)
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        setCambioDeDatos(false)
        axios.get(api.directorio + `usuarios`).then((usuarios) => {
            setUsers(usuarios.data)
            setCargando(false)
        })
    }, [rowsPerPage, page, cambioDeDatos])

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.nick_usuario.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {

            case "nick_usuario":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/" + user.icono + ".jpg" }}
                        description={user.nombre_usuario}
                        name={cellValue}
                        onClick={() => { window.location.replace("/usuario?id=" + user.id_usuario) }}
                        className="cursor-pointer"
                    >
                        {user.nombre_usuario}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{user.linea_principal}</p>
                    </div>
                );
            case "verificado":
                return (
                    <Chip className="capitalize" color={cellValue == 0 ? "warning" : "success"} size="sm" variant="flat">
                        {cellValue == 0 ? <div>Inactivo</div> : <div>Activo</div>}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Button onClick={() => { window.location.replace("/usuario?id=" + user.id_usuario) }} size="sm" isIconOnly aria-label="Informacion" color="primary"><i className="fa-solid fa-info font-[900]"></i></Button>
                        {!cargando ? <ModalBorrar equipo={user} cambioDatos={setCambioDeDatos} /> : null}
                    </div>
                );
            default:
                return cellValue;
        }
    }, [cargando]);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Buscar por nombre..."
                        startContent={<i className="fa-solid fa-magnifying-glass"></i>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<i className="fa-solid fa-chevron-down"></i>} variant="flat">
                                    Estado
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<i className="fa-solid fa-chevron-down"></i>} variant="flat">
                                    Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <ModalCrear cambioDatos={setCambioDeDatos} />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total de {users.length} usuarios</span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página
                        <select
                            className="bg-transparent outline-none text-default-400 text-small ml-4"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        users.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Todos los usuarios seleccionados"
                        : `Seleccionados ${selectedKeys.size} de ${filteredItems.length} usuarios`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Anterior
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Siguiente
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    if (cargando) {
        return (
            <div className="w-full h-full flex justify-center items-center mt-16">
                <CircularProgress aria-label="Cargando..." />
            </div>
        )
    }

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No se han encontrado jugadores"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id_usuario}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}