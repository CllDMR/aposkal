"use client";
import { Button } from "@/components/landing/Button";
import TextField from "@/components/landing/Fields";
import { Logo } from "@/components/landing/Logo";
import { SlimLayout } from "@/components/landing/SlimLayout";
import Spinner from "@/components/landing/spinner";
import InputError from "@/components/ui/inputError";
import { acceptInvitationSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/*
{
  isNewUser: false,
  invitedUser: {
    id: 'clqr3exji0007n2450v1yhn48',
    name: 'Furkan Şevki ARICI',
    email: 'furkanarici@icloud.com',
    emailVerified: 2023-12-29T20:35:53.455Z,
    phone: '5412070553',
    image: 'https://i0.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/FA-1.png?ssl=1'
  },
  companyUser: {
    id: 'clqrz8nld0004ophixwu1kpb2',
    companyId: 3,
    userId: 'clqr3exji0007n2450v1yhn48',
    role: 'USER',
    createdAt: 2023-12-30T11:26:03.889Z,
    updatedAt: 2023-12-30T11:26:03.889Z,
    invitedAt: 2023-12-30T11:26:03.887Z,
    invitedBy: 'clqrywfif0000ophiaoh8ro87',
    isActive: false,
    acceptedInviteAt: null,
    inviteId: '98aaccde-2246-44ba-a35f-92d50dd910c3'
  },
  isUserNew: false
}

*/

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

  useEffect(() => {
    signOut({ redirect: false });
    // set email
    setValue("email", email);
    setValue("inviteId", inviteId);
    setValue("userId", userId);
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
    // try sign in
    // if success accept invitation

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res.error) {
        setError("Hatalı giriş bilgileri");
        setSubmitting(false);
      } else {
        const res = await fetch("/api/companies/inviteUser/accept", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (res.error) {
          setError(res.error);
          setSubmitting(false);
          return;
        }

        router.push("/app");
        router.refresh();
        setSubmitting(false);
      }
    } catch (error) {
      // setError(error);
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
