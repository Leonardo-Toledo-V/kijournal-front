'use client'

import { LockClosedIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notificacion from '@/components/Notification';

interface FormData {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [notificaciones, setNotificaciones] = useState<any>([]);
  const [show, setShow] = useState<Boolean>(false);

  const userCreated = {
    email: "aylin@gmail.com",
    password: "aylin123456789",
  }

  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("userLogged", JSON.stringify(data));
    if (data.email !== userCreated.email || data.password !== userCreated.password) {
      setNotificaciones((prevNotificaciones: any) => [...prevNotificaciones, {
        title: "Usuario o contraseña incorrectos",
        subtitle: "Inténtelo nuevamente",
        icon: false
      }]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    }
    setShow(true);
    setNotificaciones((prevNotificaciones: any) => [...prevNotificaciones, {
      title: "Bienvenido",
      subtitle: "Has iniciado sesión correctamente",
      icon: true
    }]);
    setTimeout(() => {
      router.push("/inventory")
  }, 3000);
  }


  return (
    <div className="h-screen">
      {notificaciones.map((notificacion: any, index: any) => (
        <Notificacion
          key={index}
          isActive={show}
          title={notificacion.title}
          subtitle={notificacion.subtitle}
          icon={notificacion.icon}
        />
      ))}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-20 w-auto"
              src="/kiwi.png"
              alt="Your Company"
              width={540}
              height={462}
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Inicia sesión en tu cuenta
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#468e4d] focus:outline-none focus:ring-[#468e4d] sm:text-sm"
                  placeholder="Correo electrónico"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#468e4d] focus:outline-none focus:ring-[#468e4d] sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#468e4d] focus:ring-[#468e4d]"
                />

                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recuérdame
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#468e4d] hover:text-[#47a751] duration-300">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#468e4d] py-2 px-4 text-sm font-medium text-white hover:bg-[#47a751] focus:outline-none focus:ring-2 focus:ring-[#468e4d] focus:ring-offset-2 duration-700"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-[#47a751] group-hover:text-[#468e4d]" aria-hidden="true" />
                </span>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
