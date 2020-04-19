exports.handler = async (event) => {
  // todoist ... stored tsundoku books
  // googlespreadsheet ... stored read books

  const getTsundokuNum = require('./getTsundokuNum.js')
  const getReadBooksNum = require('./getReadBooksNum.js');
  const updateTwitterProfile = require('./updateTwitterProfile.js');

  const tsundokuNum = await getTsundokuNum();
  const readBooks = await getReadBooksNum();
  const totalBooks = tsundokuNum + readBooks;
  const counter = readBooks + "/" + totalBooks;

  await updateTwitterProfile(counter);
};
