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
import { registerUserSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

import PrivacyPolicyModal from "./privacy/Modal";

export default function RegisterForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  console.log(errors);

  // do signout
  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const registerRes = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await registerRes.json();
      if (responseData?.email) {
        await signIn("credentials", {
          ...data,
          redirect: false,
          callbackUrl: "/app",
        });
        router.refresh();
        router.push("/app");
        // setSubmitting(false);
      }

      if (responseData?.error) {
        setError(responseData.error);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setError(error?.error || "Bir hata oluştu");
      console.log(error);
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
        Şimdi ücretsiz hesap oluşturun
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Hesabınız var mı?{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Giriş Yapın
        </Link>{" "}
      </p>
      <form
        action="#"
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
            className="text-blue-600 focus:ring-blue-500 h-4 w-4 rounded border-gray-300"
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <label htmlFor="agreement2" className="ml-4">
            <span
              className="hover:text-blue-600 w-full cursor-pointer text-sm text-gray-700"
              id="privacy-policy-description"
              onClick={() => setOpenPrivacyPolicy(true)}
            >
              K.V.K.K Aydıntlatma Metni Açık Rıza Beyanını ve Gizlilik
              Politikasını&apos;nı okudum kabul ediyorum.
            </span>
          </label>
          <PrivacyPolicyModal
            open={openPrivacyPolicy}
            setOpen={setOpenPrivacyPolicy}
            name={watch("name")}
          />
        </div>
        <p className="text-red-500 col-span-full text-sm">{error}</p>
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
