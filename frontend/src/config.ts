export const CONFIG = {
  joutonbad: {
    apiUrl: import.meta.env.VITE_API_URL,
    clientName: import.meta.env.VITE_JOUTONBAD_CLIENT,
    moderatorRole: import.meta.env.VITE_MODERATOR_ROLE,
  },
  auth0: {
    clientDomain: import.meta.env.VITE_AUTH0_CLIENT_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
};
