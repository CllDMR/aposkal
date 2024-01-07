"use client";

import { useEffect } from "react";
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

export function ExistingUserInvitationAcceptForm({ inviteId, userId, email }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    setError,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues: {
      email,
      inviteId,
      userId,
    },
    resolver: zodResolver(acceptInvitationSchema),
  });

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onResetPassword = async () => {
    const data = getValues();
    const [_, error] = await tryCatch(
      fetch("/api/auth/resetPassword/send", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      }),
    );

    if (error) return voidsetError("server", error);
    else return void clearErrors("server");
  };

  const onSubmit = handleSubmit(async (data) => {
    const [signInRes, signInError] = await tryCatch(
      signIn("credentials", {
        ...data,
        redirect: false,
      }),
    );
    if (signInRes.error) return void setError("server", signInRes.error);
    else if (signInError) return void setError("server", signInError);

    const [inviteUserAcceptRes, inviteUserAcceptError] = await tryCatch(
      fetch("/api/companies/inviteUser/accept", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    );

    if (inviteUserAcceptRes.error)
      return void setError("server", inviteUserAcceptRes.error);
    else if (inviteUserAcceptError)
      return void setError("server", inviteUserAcceptError);

    return void router.push("/app");
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
        Daveti kabul etmek için kullanıcı bilgilerinizi girin.
        {/* <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          tıklayın
        </Link>{" "} */}
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
          disabled
          {...register("email")}
        />

        <TextField
          className="col-span-full"
          label="Parola"
          type="password"
          autoComplete="password"
          {...register("password")}
        />
        <InputError
          error={errors?.password?.message}
          className="col-span-full"
        />

        <p className="text-red-500 col-span-full text-sm">{error}</p>

        <p className="mt-2 text-sm text-gray-700">
          Parolanızı mı unuttunuz?{" "}
          <Button
            onClick={onResetPassword}
            type="button"
            variant="link"
            className="text-blue-600 font-medium hover:underline"
          >
            Parolamı sıfırla
          </Button>{" "}
        </p>

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
