import en from '../data/locale/en.json';
import de from '../data/locale/de.json';
import it from '../data/locale/it.json';
import fr from '../data/locale/fr.json';

function getValueByKey(obj: string, key: string) {
    const keys = key.split('.');

    let value = obj;
    for (const k of keys) {
        // @ts-ignore
        if (value[k] === undefined) {
            return "Key not found";
        }
        // @ts-ignore
        value = value[k];
    }
    return value;
}

export async function getTranslationFromFile(key: string, language = "de") {
    try {
        let translations: any = de;
        if(language === "en") { translations = en;}
        if(language === "de") { translations = de;}
        if(language === "it") { translations = it;}
        if(language === "fr") { translations = fr;}

        return getValueByKey(translations, key);
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}
