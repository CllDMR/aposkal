"use client";

import type { FC } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signOutAction } from "@acme/action";
import { acceptInvitationSchema } from "@acme/validation-schema";

import {
  Button,
  Logo,
  SlimLayout,
  Spinner,
  TextField,
} from "~/components/landing";
import { InputError } from "~/components/ui";

interface ExistingUserInvitationAcceptFormProps {
  inviteId: string;
  userId: string;
  email: string;
}

interface ExistingUserInvitationAcceptFormFields {
  email: string;
  password: string;
  commonError: string;
}

export const ExistingUserInvitationAcceptForm: FC<
  ExistingUserInvitationAcceptFormProps
> = ({
  // inviteId, userId,
  email,
}) => {
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    // setError,
    getValues,
    // clearErrors,
  } = useForm<ExistingUserInvitationAcceptFormFields>({
    defaultValues: {
      email,
      password: "",
    },
    resolver: zodResolver(acceptInvitationSchema),
  });

  useEffect(() => {
    void signOutAction();
  }, []);

  // const { mutateAsync: resetPasswordSendMutateAsync } =
  //   api.auth.resetPasswordSend.useMutation({
  //     onError(error) {
  //       setError("commonError", {
  //         type: "server",
  //         message: error.message,
  //       });
  //     },
  //     onSuccess() {
  //       clearErrors();
  //     },
  //   });

  // const { mutateAsync: inviteUserAcceptMutateAsync } =
  //   api.company.inviteUserAccept.useMutation({
  //     onError(error) {
  //       setError("commonError", {
  //         type: "server",
  //         message: error.message,
  //       });
  //     },
  //     onSuccess() {
  //       router.push("/app");
  //     },
  //   });

  const onResetPassword =
    // async
    () => {
      const _data = getValues();
      // await resetPasswordSendMutateAsync({ email: data.email });
    };

  const onSubmit = handleSubmit(
    // async
    (_data) => {
      // const [signInRes, signInError] = await tryCatch(
      //   signIn("credentials", {
      //     ...data,
      //     redirect: false,
      //   }),
      // );
      // if (signInRes.error)
      //   return void setError("commonError", {
      //     type: "server",
      //     message: signInRes.error.message,
      //   });
      // else if (signInError)
      //   return void setError("commonError", {
      //     type: "server",
      //     message: signInError.message,
      //   });
      // await inviteUserAcceptMutateAsync(data);
    },
  );

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
          id="email"
          className="col-span-full"
          label="Email"
          type="email"
          autoComplete="email"
          disabled
          {...register("email")}
        />

        <TextField
          id="password"
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

        <p className="col-span-full text-sm text-red-500">
          {errors.commonError?.message}
        </p>

        <p className="mt-2 text-sm text-gray-700">
          Parolanızı mı unuttunuz?{" "}
          <Button
            onClick={onResetPassword}
            // type="button"
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
};
