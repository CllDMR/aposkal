"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/landing/Button";
import TextField from "@/components/landing/Fields";
import { Logo } from "@/components/landing/Logo";
import { SlimLayout } from "@/components/landing/SlimLayout";
import Spinner from "@/components/landing/spinner";
import InputError from "@/components/ui/inputError";
import { api } from "@/utils/api";
import { resetPasswordSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm({
  email,
  changePasswordCode,
  userId,
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm({
    defaultValues: {
      email,
      changePasswordCode,
      userId,
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutateAsync } = api.auth.register.useMutation({
    onError(error) {
      setError("server", error);
    },
    onSuccess() {
      router.push("/auth/login");
    },
  });

  const onSubmit = handleSubmit(mutateAsync);

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Parolanızı sıfırlayın
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Veya giriş yapmak için{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 font-medium hover:underline"
        >
          tıklayın
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

        <p className="text-red-500 col-span-full text-sm">
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
              Parolayı Değiştir <span aria-hidden="true">&rarr;</span>
              {isSubmitting && <Spinner />}
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  );
}
