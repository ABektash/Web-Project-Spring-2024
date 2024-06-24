const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'fr'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    autoReload: true,
    updateFiles: true,
    syncFiles: true,
    cookie: 'i18n'
});

module.exports = i18n;