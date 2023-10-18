import type { FC } from "react";
import Link from "next/link";

const NotFound: FC = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="btn btn-secondary" href="/">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
