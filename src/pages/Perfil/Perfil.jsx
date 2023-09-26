import { useState } from "react";

import Layout from "../../components/Layout/Layout.jsx"

import { Card, CardHeader, CardBody, Image, Divider, Button } from "@nextui-org/react";

import ModalPerfil from "./ModalEditar/ModalEditar.jsx";

import Cuentas from "./Cuentas.jsx";

import { columns } from "./ModalEditar/data";

export default function Perfil() {

  const [cambioDeDatos, setCambioDeDatos] = useState()

  return (
    <Layout>
      <div className="flex justify-between mr-16">
        <Card className="py-4 w-[45%] max-h-[713.69px]">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/5000.jpg"}
              width={270}
            />
          </CardHeader>
          <Divider className="my-8" />
          <CardBody className="py-2">
            <div className="flex mb-[3rem] justify-between items-center">
              <h4 className="font-[800] text-4xl">Mi Perfil</h4>
              <h className="font-[300] text-bs pr-6">Juan Zas</h>
            </div>
            <div className="overflow-y-auto no-scrollbar pr-4">
              <div className="flex flex-col gap-2">
                {columns.map((columna) => (
                  // <div key={columna.name} className="flex items-center justify-between">
                  //   <p className="text-sm w-[5rem]">{columna.name}</p>
                  //   <p className="text-md font-[500] text-center w-[9rem]">{equipo[columna.uid]}</p>
                  // </div>
                  <div key={columna.name}>
                    <div className="flex justify-between items-center">
                      <p>{columna.name}</p>
                      <div className="flex justify-center items-center gap-4">
                        <p className="font-[600] text-lg">Hola</p>
                        {/* <ModalPerfil perfil={perfil} columna={columna} cambioDatos={setCambioDeDatos} /> */}
                        <ModalPerfil columna={columna} cambioDatos={setCambioDeDatos} />
                      </div>
                    </div>
                    <Divider className="my-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="flex flex-col w-[50%] gap-4">
            <Cuentas />
          <Card className="py-4 max-h-[425px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="flex mb-[1rem] w-full justify-between items-center">
                <h4 className="font-[800] text-2xl">Mis Contactos</h4>
                <Button color="primary" endContent={<i className="fa-solid fa-plus"></i>}>
                  Añadir Contacto
                </Button>
              </div>
            </CardHeader>
            <Divider className="mt-2" />
            <CardBody className="overflow-y-scroll no-scrollbar flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">javito paredito</h3>
                  <h4 className="font-[300] text-sm">Fundador</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">javito paredito</h3>
                  <h4 className="font-[300] text-sm">Fundador</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">javito paredito</h3>
                  <h4 className="font-[300] text-sm">Fundador</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">javito paredito</h3>
                  <h4 className="font-[300] text-sm">Fundador</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">javito paredito</h3>
                  <h4 className="font-[300] text-sm">Fundador</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">javito paredito</h3>
                  <h4 className="font-[300] text-sm">Fundador</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
}