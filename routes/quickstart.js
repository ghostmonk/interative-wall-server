const fs = require('fs');
const google = require('googleapis').google;
const OAuth2Client = google.auth.OAuth2;
const TOKEN_PATH = 'routes/credentials.json';

exports.authorize = (credentials) => {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  const creds = fs.readFileSync(TOKEN_PATH, "utf8");
  oAuth2Client.setCredentials(JSON.parse(creds));
  return listEvents(oAuth2Client);
};

function listEvents(auth) {
  return new Promise((res, reject) => {
    google.calendar({version: 'v3', auth}).events.list({
      calendarId: 'shutterstock.com_r67206b2910chd2mgaegqtjgmo@group.calendar.google.com',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, {data}) => {
      if(err) {
        reject(err);
      }
      res(data.items);
    });
  });

}