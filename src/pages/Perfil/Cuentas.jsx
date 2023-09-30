import { Card, CardHeader, CardBody, Image, Divider, Button } from "@nextui-org/react";

export default function Cuentas(cuentas) {
    return (
        <Card className="py-4 w-full h-[273px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex mb-[1rem] w-full justify-between items-center">
                    <h4 className="font-[800] text-2xl">Mis Cuentas</h4>
                    <Button color="primary" endContent={<i className="fa-solid fa-plus"></i>}>
                        Nueva Cuenta
                    </Button>
                </div>
            </CardHeader>
            <Divider className="mt-2" />
            <CardBody className="flex flex-col gap-6 overflow-y-auto no-scrollbar">
                {cuentas.cuentas && cuentas.cuentas.map((cuenta) => (
                    <div key={cuenta.id_cuenta} className="flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-[600] text-lg">{cuenta.invocador}</h3>
                            <h4 className="font-[300] text-sm">{cuenta.linea_principal}, {cuenta.linea_secundaria}</h4>
                        </div>
                        <div>
                            <Button color="warning" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-hammer"></i>} />
                        </div>
                    </div>
                ))}
            </CardBody>
        </Card>
    )
}