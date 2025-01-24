"use server";

import { currentUser } from "@clerk/nextjs/server";

/** Gets the current user from the Clerk API. */
export async function getCurrentUser() {
  const user = await currentUser();
  const data = {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
  console.info("Called server action:", data);
  return data;
}
