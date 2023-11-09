import type { FC } from "react";
import Link from "next/link";

const NotFound: FC = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="btn btn-secondary" href="/address-companies/create">
        Create new Address Company
      </Link>
    </div>
  );
};

export default NotFound;
