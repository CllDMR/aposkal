import Image from "next/image";
import Link from "next/link";
import { _getCompanyUsers } from "@/lib/services";

export const dynamic = "force-dynamic";

export default async function Users({ params }) {
  const companyId = params?.companyId;
  const users = await _getCompanyUsers({ companyId });

  return (
    <>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 ">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Kullanıcılar
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              {/* <Button onClick={onAddUser}>Kullanıcı Ekle</Button> */}
              <Link
                // onClick={onAddUser}
                href={`/app/${companyId}/settings/users/new`}
                type="button"
                className="relative inline-flex items-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Kullanıcı Ekle
              </Link>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 bg-white ">
          {users.map((user) => (
            <li key={user.id}>
              <Link
                href={`/app/${companyId}/settings/users/${user.id}/edit`}
                className="block cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="flex-shrink-0">
                      {user?.image && (
                        <Image
                          className="h-12 w-12 rounded-full"
                          src={user.image}
                          alt=""
                          width={48}
                          height={48}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-teal-600 ">
                          {user.name}{" "}
                        </p>
                        <p className="mt-2 flex items-center space-x-1 text-sm text-gray-500">
                          <div className="text-gray-400 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                              />
                            </svg>
                          </div>
                          <span className="truncate">{user.email}</span>
                        </p>

                        <p className="mt-2 flex items-center space-x-1 text-sm text-gray-500">
                          <div className="text-gray-400 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                              />
                            </svg>
                          </div>
                          <span className="truncate">{user.phone}</span>
                        </p>
                      </div>

                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900 ">{user.stage}</p>
                          <StateView
                            isActive={user?.permission?.isActive}
                            inviteId={user?.permission?.inviteId}
                          />
                          <UserTypeWiev role={user?.permission?.role} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-5 w-5 text-gray-400 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const StateView = ({ isActive, inviteId }) => {
  if (inviteId)
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        Davet onay bekliyor
      </p>
    );
  else if (isActive === false)
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        Pasif
      </p>
    );
  else if (isActive === true)
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Aktif
      </p>
    );
  else return null;
};

const UserTypeWiev = ({ role }) => {
  if (role === "OWNER")
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        Hesap Sahibi
      </p>
    );
  else if (role === "ADMIN")
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        Yetkili Kullanıcı
      </p>
    );
  else if (role === "USER")
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Kullanıcı
      </p>
    );
  else if (role === "limitedUser")
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Kısıtlı Kullanıcı
      </p>
    );
  else return null;
};
