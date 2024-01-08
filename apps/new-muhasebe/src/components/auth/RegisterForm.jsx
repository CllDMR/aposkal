"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn, signOut } from "@acme/auth";

import {
  Button,
  Logo,
  SlimLayout,
  Spinner,
  TextField,
} from "~/components/landing";
import { InputError } from "~/components/ui";
import { registerUserSchema } from "~/validationSchemas";
import { Privacy } from "./privacy";

export function RegisterForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const [registerRes, registerError] = await tryCatch(
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
    if (registerRes.error) return void setError("server", registerRes.error);
    else if (registerError) return void setError("server", registerError);
    else {
      const [signInRes, signInError] = await tryCatch(
        signIn("credentials", {
          ...data,
          redirect: false,
        }),
      );
      if (signInRes.error) return void setError("server", signInRes.error);
      else if (signInError) return void setError("server", signInError);
      router.refresh();
      router.push("/app");
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
        Şimdi ücretsiz hesap oluşturun
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Hesabınız var mı?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Giriş Yapın
        </Link>{" "}
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2"
      >
        <TextField
          className="col-span-full"
          label="Ad Soyad"
          type="text"
          autoComplete="given-name"
          {...register("name")}
        />
        <InputError error={errors?.name?.message} className="col-span-full" />

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
          label="Cep Telefonu"
          //   type="email"
          autoComplete="phone"
          {...register("phone")}
        />
        <InputError error={errors?.phone?.message} className="col-span-full" />
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

        <div className="col-span-full flex items-center">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            checked={isAgreed}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <label htmlFor="agreement2" className="ml-4">
            <span
              className="w-full cursor-pointer text-sm text-gray-700 hover:text-blue-600"
              id="privacy-policy-description"
              onClick={() => setOpenPrivacyPolicy(true)}
            >
              K.V.K.K Aydıntlatma Metni Açık Rıza Beyanını ve Gizlilik
              Politikasını&apos;nı okudum kabul ediyorum.
            </span>
          </label>
          <Privacy
            open={openPrivacyPolicy}
            setOpen={setOpenPrivacyPolicy}
            name={watch("name")}
          />
        </div>
        <p className="col-span-full text-sm text-red-500">{error}</p>
        <div className="col-span-full">
          <Button
            disabled={!isAgreed || isSubmitting}
            type="submit"
            variant="solid"
            color="blue"
            className="w-full disabled:opacity-50"
          >
            <span className="flex items-center justify-center">
              Kaydol <span aria-hidden="true">&rarr;</span>
              {isSubmitting && <Spinner />}
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  );
}
