import { Card, CardHeader, CardBody, Image, Divider, Button } from "@nextui-org/react";

import ModalEnlazar from "./ModalEnlazar/ModalEnlazar";
import ModalEnlazarIndividual from "./ModalEnlazar/ModalEnlazarIndividual";
import ModalEliminar from "./ModalEnlazar/ModalEliminar";

export default function Enlazar(cuentas) {

    return (
        <Card className="py-4 h-[425px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex mb-[1rem] w-full justify-between items-center">
                    <h4 className="font-[800] text-2xl">Mis Enlaces</h4>
                    {<ModalEnlazar info={cuentas} cambioDatos={cuentas.cambioDatos} />}
                </div>
            </CardHeader>
            <Divider className="mt-2" />
            <CardBody className="overflow-y-scroll no-scrollbar flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Circuito Tormenta</h3>
                        <h4 className="font-[300] text-sm">{cuentas.usuario.informacion.circuitotormenta}</h4>
                    </div>
                    <div className="flex gap-2">
                        {cuentas.usuario.informacion.circuitotormenta != null ?
                            <>
                                <ModalEnlazarIndividual usuario={cuentas} tipo={"circuitotormenta"} cambioDatos={cuentas.cambioDatos} />
                                <ModalEliminar usuario={cuentas} tipo={"discord"} cambioDatos={cuentas.cambioDatos} />
                            </> :
                            <></>
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Twitter</h3>
                        <h4 className="font-[300] text-sm">{cuentas.usuario.informacion.twitter}</h4>
                    </div>
                    <div className="flex gap-2">
                        {cuentas.usuario.informacion.twitter != null ?
                            <>
                                <ModalEnlazarIndividual usuario={cuentas} tipo={"twitter"} cambioDatos={cuentas.cambioDatos} />
                                <ModalEliminar usuario={cuentas} tipo={"discord"} cambioDatos={cuentas.cambioDatos} />
                            </> :
                            <></>
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Discord</h3>
                        <h4 className="font-[300] text-sm">{cuentas.usuario.informacion.discord}</h4>
                    </div>
                    <div className="flex gap-2">
                        {cuentas.usuario.informacion.discord != null ?
                            <>
                                <ModalEnlazarIndividual usuario={cuentas} tipo={"discord"} cambioDatos={cuentas.cambioDatos} />
                                <ModalEliminar usuario={cuentas} tipo={"discord"} cambioDatos={cuentas.cambioDatos} />
                            </> :
                            <></>
                        }
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}