const axios = require("axios");

exports.onExecutePreUserRegistration = async (event, api) => {
  if (event.request.geoip.countryCode !== "FR") {
    api.access.deny("NOT_ALLOWED", "You are not allowed to register");
  }

  async function getToken() {
    const tokenOptions = {
      method: "POST",
      url: `https://${event.secrets.DOMAIN}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        grant_type: "client_credentials",
        client_id: event.secrets.CLIENT_ID,
        client_secret: event.secrets.CLIENT_SECRET,
        audience: `https://${event.secrets.DOMAIN}/api/v2/`,
      },
    };
    const res = await axios.request(tokenOptions);
    return res.data.access_token;
  }

  async function getUsers(token, license) {
    const usersOptions = {
      method: "GET",
      url: `https://${event.secrets.DOMAIN}/api/v2/users`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      params: {
        q: `username:*${license}`,
        search_engine: "v3",
      },
    };
    const users = await axios.request(usersOptions);
    return users.data;
  }

  if (event.user.username) {
    const token = await getToken();
    const license = event.user.username.replace(/^0+/, "");
    const existingUsers = await getUsers(token, license);
    if (existingUsers && existingUsers.length > 0) {
      api.access.deny(
        "ALREADY_EXISTING_LICENSE",
        "Un compte avec cette licence existe déjà",
      );
    }
  }
};
