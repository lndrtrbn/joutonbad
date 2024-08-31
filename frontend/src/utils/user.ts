import { User } from "@auth0/auth0-react";

import { CONFIG } from "../config";

export function isEditor(user: User): boolean {
  return user.joutonbadRoles.includes(CONFIG.joutonbad.moderatorRole);
}
