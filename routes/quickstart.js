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
  const end = new Date();
  end.setHours(23,59,59,999);
  return new Promise((res, reject) => {
    google.calendar({version: 'v3', auth}).events.list({
      calendarId: 'shutterstock.com_r67206b2910chd2mgaegqtjgmo@group.calendar.google.com',
      timeMin: (new Date()).toISOString(),
      timeMax: (end).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, {data}) => {
      if(err) {
        reject(err);
      }
      const eventTargets = data.items.filter(i => i.start.dateTime && i.location);
      const ptoTargets = data.items.filter(i => i.summary.includes('PTO'));
      const munge = t => {
        return {
          summary: t.summary,
          description: t.description,
          location: t.location,
          start: t.start,
          end: t.end,
          createdBy: t.creator.email
        };
      };

      res({
        events: eventTargets.map(munge),
        ptos: ptoTargets.map(munge)
      });
    });
  });

}