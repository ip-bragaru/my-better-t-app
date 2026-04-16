import { createUuid } from "@shared/lib/uuid";

import { readSessionToken, writeSessionToken } from "@features/session/model/session-storage";

export async function bootstrapSessionToken() {
  const existingToken = await readSessionToken();

  if (existingToken) {
    return existingToken;
  }

  const nextToken = createUuid();
  await writeSessionToken(nextToken);

  return nextToken;
}
