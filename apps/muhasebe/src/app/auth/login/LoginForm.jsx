"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/landing/Button";
import TextField from "@/components/landing/Fields";
import { Logo } from "@/components/landing/Logo";
import { SlimLayout } from "@/components/landing/SlimLayout";
import Spinner from "@/components/landing/spinner";
import InputError from "@/components/ui/inputError";
import { loginUserSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  // do signout
  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onResetPassword = async () => {
    const email = watch("email");
    if (!email)
      return setError("Parola sıfırlamak için Email alanını doldurunuz");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/resetPassword/send", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const responseData = await res.json();
      if (responseData.error) {
        setError(responseData.error || "Hatayla karşılaşıldı");
        setSubmitting(false);
      } else {
        setError("");
        alert("Parola sıfırlama linki gönderildi");
        setSubmitting(false);
      }
    } catch (error) {
      setError("Hatayla karşılaşıldı");
      setSubmitting(false);
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/app",
      });
      if (res.error) {
        setError("Hatalı giriş bilgileri");
        setSubmitting(false);
      } else {
        router.push("/app");
        router.refresh();
        // setSubmitting(false);
      }
    } catch (error) {
      setError(error);
      setSubmitting(false);
    }
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
        action="#"
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
}
