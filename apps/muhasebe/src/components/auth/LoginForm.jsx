"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Logo,
  SlimLayout,
  Spinner,
  TextField,
} from "@/components/landing";
import { InputError } from "@/components/ui";
import { loginUserSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onResetPassword = async () => {
    const email = getValues("email");
    if (!email)
      return void setError("Parola sıfırlamak için Email alanını doldurunuz");

    const [res, error] = await tryCatch(
      fetch("/api/auth/resetPassword/send", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
    if (res.error) return void setError("server", res.error);
    else if (error) return void setError("server", error);
    else return void alert("Parola sıfırlama linki gönderildi");
  };

  const onSubmit = handleSubmit(async (data) => {
    const [_, error] = await tryCatch(
      signIn("credentials", {
        ...data,
        redirect: false,
      }),
    );
    if (error) return void setError("server", error);
    else return void router.push("/app");
  });

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Hesabınıza giriş yapın
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Hesabınız yok mu?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Ücretsiz hesap oluşturun
        </Link>{" "}
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          className="col-span-full"
          label="Email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        <InputError error={errors?.email?.message} className="col-span-full" />

        <TextField
          className="col-span-full"
          label="Parola"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        <InputError
          error={errors?.password?.message}
          className="col-span-full"
        />

        <p className="mt-2 text-sm text-gray-700">
          Parolanızı mı unuttunuz?{" "}
          <Button
            onClick={onResetPassword}
            type="button"
            variant="link"
            className="font-medium text-blue-600 hover:underline"
          >
            Parolamı sıfırla
          </Button>{" "}
        </p>

        <p className="col-span-full text-sm text-red-500">{error}</p>

        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            disabled={isSubmitting}
            color="blue"
            className="w-full disabled:opacity-50"
          >
            <span className="flex items-center justify-center">
              Giriş <span aria-hidden="true">&rarr;</span>
              {isSubmitting && <Spinner />}
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  );
};
