"use client";

import { useEffect } from "react";
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
import { api } from "@/utils/api";
import { acceptInvitationSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn, signOut } from "@acme/auth";

export function ExistingUserInvitationAcceptForm({ inviteId, userId, email }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
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

  const { mutateAsync: resetPasswordSendMutateAsync } =
    api.auth.resetPasswordSend.useMutation({
      onError(error) {
        setError("server", error);
      },
      onSuccess() {
        clearErrors("server");
      },
    });

  const { mutateAsync: inviteUserAcceptMutateAsync } =
    api.company.inviteUserAccept.useMutation({
      onError(error) {
        setError("server", error);
      },
      onSuccess() {
        router.push("/app");
      },
    });

  const onResetPassword = async () => {
    const data = getValues();
    await resetPasswordSendMutateAsync({ email: data.email });
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

    await inviteUserAcceptMutateAsync(data);
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

        <p className="col-span-full text-sm text-red-500">{error}</p>

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
