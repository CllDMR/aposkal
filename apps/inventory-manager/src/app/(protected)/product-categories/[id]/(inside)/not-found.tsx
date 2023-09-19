import type { FC } from "react";
import Link from "next/link";

const NotFound: FC = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="btn btn-secondary" href="/product-categories/create">
        Create new Product Category
      </Link>
    </div>
  );
};

export default NotFound;
