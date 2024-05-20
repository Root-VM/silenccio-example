export function getLocaleFromUrl() {
    const url = window.location.href;
    const parts = url.split('/');
    const locale = parts[3];

    if(locale !== "de" && locale !== "en" && locale !== "it" && locale !== "fr") {
        return "de";
    }
    return locale;
}
