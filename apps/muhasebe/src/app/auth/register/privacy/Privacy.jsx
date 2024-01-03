import AcikRizaBeyani from "./AcikRizaBeyani";
import AydinlatmaMetni from "./AydinlatmaMetni";
import PrivacyPolicyText from "./PrivacyPolicy";

const PrivacyPolicy = ({ name }) => {
  return (
    <div className="container mx-auto my-2 rounded-md px-4 text-left ">
      <div className="mt-10 flex justify-end">
        {/* <Logo className="w-48 " /> */}
      </div>
      <div className="">
        <PrivacyPolicyText />
      </div>
      <div className="mt-10">
        <AydinlatmaMetni />
        <AcikRizaBeyani displayName={name} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
