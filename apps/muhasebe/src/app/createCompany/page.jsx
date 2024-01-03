"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/landing/Button";
import TextField from "@/components/landing/Fields";
import { Logo } from "@/components/landing/Logo";
import SelectField from "@/components/landing/SelectField";
import { SlimLayout } from "@/components/landing/SlimLayout";
import Spinner from "@/components/landing/spinner";
import { createCompanySchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreateCompany() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCompanySchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/companies/createCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.error) {
        setSubmitting(false);
        setError("Hatalı oluştu");
      } else {
        router.push("/app");
        router.refresh();
      }
    } catch (error) {
      setError(error);
      setSubmitting(false);
      console.log({ error });
    }
    // setSubmitting(false);
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
        <Link href="/app" className="text-blue-600 font-medium hover:underline">
          Firma Seçin
        </Link>{" "}
      </p>
      <form
        action="#"
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

        <p className="text-red-500 col-span-full text-sm">{error}</p>

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
