import { headers } from "next/headers";

const getHeader = () => {
  const headersList = headers();
  let host = headersList.get("host");
  if (host.includes("localhost")) host = "http://localhost:3000";
  else host = "https://muhasebe.aposkal.com/";

  return {
    headers: headersList,
    host,
  };
};

export default getHeader;
