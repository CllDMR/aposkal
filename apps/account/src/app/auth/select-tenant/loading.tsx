import Image from "next/image";

const Page = () => {
  return (
    <main>
      <div className="min-h-screen bg-gray-50 p-10 md:px-36">
        <div className="xl:px-60 ">
          <div className="xl:mb-20">
            <div className="flex justify-center ">
              <Image
                className="h-48 w-48"
                src="/logo.svg"
                alt="Aposkal Logo"
                width={286.3}
                height={141.73}
                priority
              />
            </div>
          </div>

          <div className="">
            <span>Loading Tenants...</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
