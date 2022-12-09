import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

function loadLocaleMessages() {
    const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

const defaultLocale = localStorage.getItem("locale") || "kk";

export const locales = [
    {
        locale: "ru",
        id: 1,
        title: "Рус",
    },
    {
        locale: "kk",
        id: 2,
        title: "Каз",
    },
];

export default new VueI18n({
    locale: defaultLocale,
    fallbackLocale: "kk",
    messages: loadLocaleMessages(),
});
