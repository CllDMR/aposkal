"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui";

import ToggleActive from "./ToggleActive";
import UserRoleSelector from "./UserRoleSelector";

const EditUser = ({ currentUserRole, companyUserData, userData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState(null);
  const [modules, setModules] = useState(null);

  useEffect(() => {
    setIsActive(companyUserData?.isActive);
    setRole(companyUserData?.role);
  }, [companyUserData]);

  const params = useParams();
  const router = useRouter();

  const companyId = params.companyId;
  const userId = params.userId;

  const handleUpdateUser = async () => {
    const data = {
      companyId,
      isActive,
      role,
      // modules,
    };

    try {
      const res = await fetch(`/api/companies/${companyId}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.error) {
        // setError(resData.error);
        return;
      }
      router.refresh();
      router.push(`/app/${companyId}/settings/users`);
    } catch (error) {}
  };

  const handleDeleteUser = async () => {
    const data = {
      companyId,
    };

    try {
      const res = await fetch(`/api/companies/${companyId}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (resData.error) {
        // setError(resData.error);
        return;
      }

      router.push(`/app/${companyId}/settings/users`);
    } catch (error) {}
  };

  return (
    <div className="overflow-hidden shadow sm:rounded-md">
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="">
          <div className="border-gray-200 py-3 ">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userData?.name}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">e Posta</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userData?.email}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Cep Telefonu
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userData?.phone}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-4">
          <UserPermissions
            isActive={isActive}
            setIsActive={setIsActive}
            role={role}
            setRole={setRole}
            currentUserRole={currentUserRole}
            userData={userData}
            companyUserData={companyUserData}
          />
        </div>
      </div>
      <div className="space-x-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
        <Link href={`/app/${params.companyId}/settings/users`}>
          <Button className="mx-2" color="secondary">
            Vazgeç
          </Button>
        </Link>

        {(currentUserRole === "ADMIN" || currentUserRole === "OWNER") && (
          <>
            {" "}
            <Button
              color="danger"
              disabled={companyUserData.role === "OWNER"}
              onClick={handleDeleteUser}
            >
              Kullanıcıyı Sil
            </Button>
            <Button
              disabled={companyUserData.role === "OWNER"}
              onClick={handleUpdateUser}
            >
              Güncelle
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditUser;

const UserPermissions = ({
  isActive,
  setIsActive,
  role,
  setRole,
  currentUserRole,
  companyUserData,
  userData,
}) => {
  // hesap sahibinin hesabı ise

  if (currentUserRole === "USER") return null;

  if (companyUserData.role === "OWNER")
    return (
      <div className="border-t border-gray-200 ">
        <p className="py-4 text-center text-lg text-gray-700 ">Hesap Sahibi</p>
      </div>
    );

  if (companyUserData.inviteId)
    return (
      <div className="border-t border-gray-200 ">
        <p className="py-4 text-center text-lg text-gray-700 ">
          {" "}
          Kullanıcı henüz daveti kabul etmedi.
        </p>
      </div>
    );

  return (
    <div className="border-t border-gray-200 ">
      <h3 className="py-4 text-center text-lg ">Kullanıcı Yetkileri</h3>
      <ToggleActive isActive={isActive} setIsActive={setIsActive} />
      <div className="">
        <UserRoleSelector callback={setRole} initValue={role} />
        {/* {(currentUserRole === "ADMIN" || currentUserRole === "OWNER") &&
      role === "USER" && (
        <UserModuleSelector
          callback={setModules}
          initValue={modules}
        />
      )} */}
      </div>
    </div>
  );
};
