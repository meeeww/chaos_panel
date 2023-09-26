import { React, useState } from "react";

import md5 from "md5"
import axios from "axios"
import api from "../../variables.json"

import { Toaster, toast } from 'sonner'

import { useForm } from "react-hook-form"

import { Card, CardBody, Input, Button, Link } from "@nextui-org/react";

import Logo from "../assets/logos/LogoSinTexto.png";

export default function InicioSesion() {

  const rand = () => {
    return Math.random().toString(36).substr(2);
  };

  const token = () => {
    return rand() + rand() + rand() + rand() + rand() + rand() + rand() + rand() + rand() + rand() + rand();
  };

  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    const encriptarPass = () => {
      return new Promise((resolve) => {
        resolve(md5(data.contra))
      })
    }

    encriptarPass().then(
      (contrasenaEncriptada) => {
        toast.promise(() => new Promise((resolve, reject) => {
          axios.get(api.directorio + "usuarios/nombre=" + data.usuario).then(response => {
            if (response.data.length > 0) {
              if (response.data[0]["contra"] == contrasenaEncriptada) {
                const tokenP = token()
                axios.post(api.directorio + "crearsesion", { id: response.data[0]["id_usuario"], fecha: Math.floor(new Date().getTime() / 1000.0), dispositivo: navigator.userAgent, token: tokenP }).then(function () {
                  localStorage.setItem("token", tokenP)
                  resolve()
                }).catch(function () {
                  reject()
                })
              } else {
                toast.error("Los datos de sesión no son correctos")
              }
            } else {
              toast.error("Los datos de sesión no son correctos")
            }
          })
        }), {
          loading: 'Iniciando sesión',
          success: 'Sesión iniciada',
          error: 'Error',
        });
      }
    )

  }

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    //añadir background image
    <div className="flex justify-center items-center h-[100vh] bg-[url('../assets/backgrounds/ViegoBackground.jpg')] bg-center">
      <Toaster richColors closeButton />
      <div className="flex justify-center items-center">
        <Card className="py-4 m-4 h-[20rem] glass max-w-[20rem] w-[30rem] md:max-w-[30rem] min-h-[70vh] flex flex-col items-center justify-center px-[5rem] rounded-md">
          <CardBody className="w-[20rem] mt-[1rem]">
            <div className="flex flex-col justify-between items-center h-full w-full">
              <div className="w-full h-full flex flex-col justify-start items-center gap-4 mt-8 pt-[1rem] md:pt-[2rem]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    {...register("usuario", { required: true })}
                    variant={"bordered"}
                    label="Nombre de Usuario"
                    type={"text"}
                    className="text-white"
                  />
                  <Input
                    {...register("contra", { required: true })}
                    variant={"bordered"}
                    label="Contraseña"
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <i className="fa-solid fa-eye-slash text-default-400 pointer-events-none"></i>
                        ) : (
                          <i className="fa-solid fa-eye text-default-400 pointer-events-none"></i>
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="text-white"
                  />

                  <Button type="submit" color="primary" variant="ghost" className="h-[5rem] w-full mb-4">
                    Iniciar Sesión
                  </Button>
                </form>
              </div>
              <div className="flex justify-center w-full gap-12">
                <Link href="https://discord.gg/nkgTkDxB8d" color="foreground" className="w-[100%] px-0 text-sm !text-center">¿Olvidaste la contraseña?</Link>
                <Link href="/registro" color="foreground" className="w-[100%] px-0 text-sm !flex !justify-center">Iniciar sesión</Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div >
  );
}
