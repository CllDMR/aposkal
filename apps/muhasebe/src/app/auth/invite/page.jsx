// http://localhost:3000/auth/invite?code=98aaccde-2246-44ba-a35f-92d50dd910c3&email=furkanarici@icloud.com

// import AcceptInviteForm from "@/auth/invite/AcceptInviteForm";

// invitation page
// check user is has reset password code

// show password reset form and accept invite button

// if user does not have reset password code

// show login form and accept invite button

// if user email is not verified verify email

import Link from "next/link";
import ExistingUser from "@/app/auth/invite/ExistingUser";
import NewUser from "@/app/auth/invite/NewUser";
import { Logo } from "@/components/landing/Logo";
import { getInvitation } from "@db/index";

const page = async ({ searchParams }) => {
  const inviteCode = searchParams.code;
  const email = searchParams.email;

  let error = false;

  let mode = null;

  if (!email || !inviteCode) error = true;

  // mode newUser or existingUser
  let checkInviteRes = null;

  if (!error) {
    // check invite code
    checkInviteRes = await getInvitation({ inviteId: inviteCode, email });
  }

  const isUserNew = checkInviteRes?.isNewUser;
  const inviteId = checkInviteRes?.companyUser?.inviteId;
  const userId = checkInviteRes?.invitedUser?.id;

  if (!inviteId || !userId) error = true;

  if (error)
    return (
      <main className="grid h-screen place-items-center bg-gray-100 px-6 py-10 lg:px-8">
        <div className="text-center">
          {/* <p className="text-base font-semibold text-teal-600">Çıkış</p> */}

          <div className="flex h-20 justify-center ">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" width={150} />
            </Link>
          </div>

          <h1 className="mt-6 text-5xl font-bold text-gray-900">
            Hatalı Davetiye
          </h1>
          <p className="mt-6 w-96 text-base leading-7 text-gray-600">
            Davetiye kodunuz hatalı. Daha önce kullanılmış veya süresi dolmuş
            olabilir.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-gray-900"
            >
              Giriş Yap <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    );

  // inviteId, userId, email

  if (isUserNew === true)
    return <NewUser inviteId={inviteId} userId={userId} email={email} />;

  if (isUserNew === false)
    return <ExistingUser inviteId={inviteId} userId={userId} email={email} />;

  return <div>some error</div>;
};

export default page;
