"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Logo,
  SelectField,
  SlimLayout,
  Spinner,
  TextField,
} from "@/components/landing";
import { tryCatch } from "@/utils/try";
import { createCompanySchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(createCompanySchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const [res, resError] = await tryCatch(
      fetch("/api/auth/resetPassword", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
    if (resError) return void setError("server", resError);
    else if (res.error) return void setError("server", res.error);
    else return void router.push("/app");
  });

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>
      <h2 className="mt-16 text-lg font-semibold text-gray-900">
        Yeni Firma Ekle
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        veya{" "}
        <Link href="/app" className="font-medium text-blue-600 hover:underline">
          Firma Seçin
        </Link>{" "}
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
      >
        <SelectField
          className="col-span-full"
          label="Firma Türü"
          {...register("companyType")}
        >
          <option></option>
          <option>Şahıs Firması</option>
          <option>Limited Şirket</option>
          <option>Anonim Şirket</option>
        </SelectField>

        <TextField
          className="col-span-full"
          label={
            watch("companyType") === "Şahıs Firması"
              ? "Ad Soyad"
              : "Şirket Ünvanı"
          }
          type="title"
          {...register("title")}
        />

        <TextField
          // className="col-span-full"
          label={
            watch("companyType") === "Şahıs Firması"
              ? "T.C. Kimlik No"
              : "Vergi No"
          }
          type="vknTckn"
          autoComplete="vknTckn"
          {...register("vknTckn")}
        />

        <TextField
          // className="col-span-full"
          label="Vergi Dairesi"
          type="taxOffice"
          autoComplete="taxOffice"
          {...register("taxOffice")}
        />

        {/* <TextField
          className="col-span-full"
          label="Mersis No"
          type="mersisNo"
          autoComplete="mersisNo"
          {...register("mersisNo")}
        /> */}

        <TextField
          className="col-span-full"
          label="Adres"
          type="adress"
          autoComplete="adress"
          {...register("adress")}
        />
        <TextField
          className="col-span-full"
          label="e-Posta"
          type="email"
          autoComplete="email"
          {...register("email")}
        />

        <p className="col-span-full text-sm text-red-500">
          {errors.server?.message}
        </p>

        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            disabled={isSubmitting}
            color="blue"
            className="w-full disabled:opacity-50"
          >
            <span className="flex items-center justify-center">
              Yeni Firma Ekle <span aria-hidden="true">&rarr;</span>
              {isSubmitting && <Spinner />}
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  );
}
