import { createMecenateApiClient } from "@my-better-t-app/mecenate-api";

import { APP_CONFIG } from "@shared/config/app-config";

export const mecenateApi = createMecenateApiClient(APP_CONFIG.apiBaseUrl);
