import {
  ExistingUserInvitationAcceptForm,
  NewUserInvitationAcceptForm,
} from "@/components/auth";
import { getInvitation } from "@/lib/services";

export default async function Page({ searchParams: { code, email } }) {
  if (!email || !code) throw new Error("Insufficient data");

  const checkInviteRes = await getInvitation({ inviteId: code, email });

  const isUserNew = checkInviteRes?.isNewUser;
  const inviteId = checkInviteRes?.companyUser?.inviteId;
  const userId = checkInviteRes?.invitedUser?.id;

  if (!inviteId || !userId) throw new Error("Insufficient user data");

  if (isUserNew)
    return (
      <NewUserInvitationAcceptForm
        inviteId={inviteId}
        userId={userId}
        email={email}
      />
    );
  else
    return (
      <ExistingUserInvitationAcceptForm
        inviteId={inviteId}
        userId={userId}
        email={email}
      />
    );
}
