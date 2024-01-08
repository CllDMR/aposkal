import { deny, rule, shield } from "trpc-shield";

import type { Context } from "./trpc";

// Rules

type AwaitedContext = Awaited<ReturnType<Context>>;

const isAuthenticated = rule<AwaitedContext>()(
  (ctx) => ctx.session?.user !== null,
);

// const isAdmin = rule<AwaitedContext>()(
//   (ctx) => ctx.session?.user.role === "admin",
// );

// Permissions

export const permissions = shield<AwaitedContext>(
  {
    auth: {
      query: {},
      mutation: {},
    },
    addressCompany: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    addressTenant: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    company: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    product: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    productCategory: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    productTag: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    purchaseOrder: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    saleOffer: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    saleOfferNote: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    saleOfferProduct: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    saleOrder: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    supplier: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    tenant: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
    warehouse: {
      query: {
        list: isAuthenticated,
        get: isAuthenticated,
      },
      mutation: {
        create: isAuthenticated,
        update: isAuthenticated,
        delete: isAuthenticated,
        deleteMany: isAuthenticated,
      },
    },
  },
  { fallbackRule: deny },
);
