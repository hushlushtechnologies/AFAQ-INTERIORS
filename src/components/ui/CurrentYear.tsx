import { cacheLife } from "next/cache";

export async function CurrentYear() {
  "use cache";
  cacheLife("days"); // recalculated about once a day, so it rolls over on 1 January

  return <>{new Date().getFullYear()}</>;
}