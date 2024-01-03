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
import { acceptInvitationSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function AcceptInviteForm({ inviteId, userId, email }) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(acceptInvitationSchema),
  });

  // do signout
  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  useEffect(() => {
    // set email
    setValue("email", email);
    setValue("inviteId", inviteId);
    setValue("userId", userId);
  }, [email, inviteId, setValue, userId]);

  const onSubmit = handleSubmit(async (data) => {
    const p1 = watch("password");
    const p2 = watch("password2");
    if (p1 !== p2) return setError("Parolalar eşleşmiyor");
    setSubmitting(true);
    try {
      const res = await fetch("/api/companies/inviteUser/accept", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.error) {
        setError(res.error);
        setSubmitting(false);
        return;
      }

      await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/app",
      });

      router.push("/app");
      router.refresh();
      setSubmitting(false);
    } catch (error) {
      setError("Hatayla karşılaşıldı");
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
      <h2 className="mt-20 text-lg font-semibold text-gray-900">Davet</h2>
      <p className="mt-2 text-sm text-gray-700">
        Daveti kabul etmek için parolanızı oluşturun.
        {/* <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          tıklayın
        </Link>{" "} */}
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
          disabled
          {...register("email")}
        />

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

        <TextField
          className="col-span-full"
          label="Parola Tekrar"
          type="password"
          {...register("password2")}
        />

        <InputError
          error={errors?.password2?.message}
          className="col-span-full"
        />

        <p className="text-red-500 col-span-full text-sm">{error}</p>

        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            color="blue"
            disabled={isSubmitting}
            className="w-full disabled:opacity-50"
          >
            <span className="flex items-center justify-center">
              Daveti Kabul Et <span aria-hidden="true">&rarr;</span>
              {isSubmitting && <Spinner />}
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  );
}
