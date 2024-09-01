exports.onExecutePostLogin = async (event, api) => {
  const appNamespace = "joutonbad";
  const extraData = {
    license: event.user.username,
    roles: event.authorization?.roles,
  };
  api.idToken.setCustomClaim(appNamespace, extraData);
  api.accessToken.setCustomClaim(appNamespace, extraData);
};
