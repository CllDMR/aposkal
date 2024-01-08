"use client";

import { useEffect } from "react";
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
import { acceptInvitationSchema } from "~/validationSchemas";

export function NewUserInvitationAcceptForm({ inviteId, userId, email }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm({
    defaultValues: { inviteId, userId, email },
    resolver: zodResolver(acceptInvitationSchema),
  });

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const [_, error] = await tryCatch(
      fetch("/api/companies/inviteUser/accept", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    );
    if (error) return void setError("server", error);
    else {
      await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/app",
      });

      return void router.push("/app");
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
          {...register("confirmpassword")}
        />

        <InputError
          error={errors?.confirmpassword?.message}
          className="col-span-full"
        />

        <p className="col-span-full text-sm text-red-500">
          {errors.server?.message}
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
