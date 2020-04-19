const getReadBooksNum = async () => {
    // Dependencies
    const { GoogleSpreadsheet } = require('google-spreadsheet');

    // Load google-spreadsheet id and tokens
    const googleSpreadsheetId = process.env["GOOGLE_SPREADSHEET_ID"]
    const googleServiceClientEmail = process.env["GOOGLE_SERVICE_CLIENT_EMAIL"]
    const googleServicePrivatekey = process.env["GOOGLE_SERVICE_PRIVATE_KEY"].replace(/\\n/g, '\n')

    // Set target spreadsheet id
    const doc = new GoogleSpreadsheet(googleSpreadsheetId);

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email: googleServiceClientEmail,
        private_key: googleServicePrivatekey,
    });

    // Load document properties and worksheets
    await doc.loadInfo();
    const sheet = await doc.sheetsByIndex[0];

    // Get row length that mean read books by me
    await sheet.loadCells('B2:B');
    const rows = await sheet.getRows();
    return rows.length;
}
module.exports = getReadBooksNum;
