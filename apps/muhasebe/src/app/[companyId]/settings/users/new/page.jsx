"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Label, Toggle } from "@/components/ui";
import { inviteUserSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const NewUser = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inviteUserSchema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setValue("companyId", params.companyId);
  }, [params.companyId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const registerRes = await fetch("/api/companies/inviteUser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await registerRes.json();

      if (responseData?.error) {
        setError(responseData.error);
        setSubmitting(false);
      } else {
        router.refresh();
        router.push(`/app/${params.companyId}/settings/users`);
      }
    } catch (error) {
      setError(error?.error || "Bir hata oluştu");
      setSubmitting(false);
    }
  });

  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={onSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <Input
                          {...register("name")}
                          error={errors?.name?.message}
                        />
                      </div>

                      <Label htmlFor="name">E posta</Label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <Input
                          {...register("email")}
                          error={errors?.email?.message}
                        />
                      </div>

                      <Label htmlFor="name">Cep Telefonu</Label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <Input
                          {...register("phone")}
                          error={errors?.phone?.message}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-4">
                    <div className="border-t border-gray-200 ">
                      <h3 className="py-4 text-lg text-center ">
                        Kullanıcı Yetkileri
                      </h3>
                      <ToggleActive
                        isActiveWatch={isActiveWatch}
                        setValue={setValue}
                      />
                    </div>
                  </div> */}
                </div>
                <div className="space-x-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <Link href={`/app/${params.companyId}/settings/users`}>
                    <Button
                      className="mx-2"
                      color="secondary"
                      href="app/[companyId]/settings/users"
                    >
                      Vazgeç
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    // onClick={handleSubmit(onSaveUser)}
                  >
                    Kullanıcı Ekle
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-5 sm:mt-0 md:col-span-1">
            <div className="px-4 sm:px-0">
              <>
                <h3 className="text-lg font-medium leading-6 text-gray-900 ">
                  Kullanıcı Ekle
                </h3>
                <p className="mt-5 text-sm text-gray-600">
                  Ortaklarınızı, Mali Müşaviirnizi veya çalışanlarınızı Aposkal
                  kullanıcısı olarak ekleyebilir verilerinizi kolyaca
                  paylaşabilirisniz.
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

const ToggleActive = ({ isActiveWatch, setValue }) => {
  return (
    <div className="py-4 sm:my-2 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
      <label>Kullanıcı Durumu</label>
      <div className="col-span-2">
        <Toggle
          enabled={isActiveWatch}
          setEnabled={(enabled) => setValue("isActive", enabled)}
          label={
            isActiveWatch
              ? "Kullanıcı Aktif"
              : "Kullanıcı Pasif firmanızın bilgilerine erişemez"
          }
        />
      </div>
    </div>
  );
};
