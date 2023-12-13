import { Client } from "@planetscale/database";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { eq, schema } from "./";

dotenv.config({ path: "./.env.local" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on ./.env.local");

const main = async () => {
  const startTime = performance.now();

  const db = drizzle(
    new Client({
      url: process.env.DATABASE_URL,
    }).connection(),
    { schema },
  );

  console.log("Seed started");

  //#region delete db datas
  console.log("delete db datas - started");

  await db
    .delete(schema.usersToTenants)
    .where(eq(schema.usersToTenants.tenantId, "5-dgmrWXztTnr0Tp-wmnO"));

  console.log("delete db datas - ended");
  //#endregion

  const endTime = performance.now();
  const timeElapsed = endTime - startTime;

  console.log("Seed done, timeElapsed: ", timeElapsed);
};

void main();
