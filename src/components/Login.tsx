"use client";
import { supabase } from "@/lib/client";
import { useUser } from "@/lib/store/user";
import { login } from "@/utils/functions/login";
import { logout } from "@/utils/functions/logout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const [session, setSession] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    const data = await login();
    router.push("/profile");
  };
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(true);
      } else {
        setSession(false);
      }
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col h-[100vh] justify-center w-full mx-auto my-auto items-center gap-5">
      <h1 className="text-4xl text-center font-serif font-semibold tracking-wider">
        Alumni Bill Generator
      </h1>
      <div className="flex flex-row items-center gap-5 justify-center w-full mx-auto">
        <div>
          {session ? (
            <button
              className="bg-white px-5 py-2 text-black font-sem flex flex-row items-center gap-1 justify-center mx-auto rounded-lg hover:bg-sky-500 hover:text-white duration-300"
              onClick={async () => {
                await logout();
                setSession(false);
                setUser(undefined);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="bg-white px-5 py-2 text-black flex flex-row items-center gap-1 justify-center mx-auto rounded-lg hover:bg-sky-500 hover:text-white duration-300"
            >
              <Image
                src={"/assets/google.jpg"}
                width={40}
                height={40}
                alt=""
                className="rounded-full"
              />
              <h1>Login With Google</h1>
            </button>
          )}
        </div>
        {session && (
          <>
            <button
              onClick={() => {
                router.push("/profile");
              }}
              className="bg-sky-500 text-white px-4 py-1 rounded-lg"
            >
              Profile
            </button>
            <button
              onClick={() => {
                router.push("/bill");
              }}
              className="bg-sky-500 text-white px-4 py-1 rounded-lg"
            >
              Bill
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
