import {FC} from "react";
import {useRouter} from "next/router";

import css from "./footer.module.scss";
import cn from "classnames";
import Link from "next/link";
import {useTranslations} from "use-intl";
import {getDataProtectionUrl} from "@/global/helpers/url-generator";
import {changeAccountDataApi} from "@/global/api/account";
import {getLoginToken} from "@/global/api/tokens";

const Footer: FC = () => {
    const router = useRouter();
    const {locale} = useRouter();
    const t = useTranslations('FOOTER');
    const tCommon = useTranslations('COMMON');
    const tLost = useTranslations('LOST_DATA');

    const changeLang = async (e: string) => {
        getLoginToken() && await changeAccountDataApi({language: String(e).toUpperCase()})

        router.push(router.pathname, router.asPath, {locale: e}).then();
    }

    const goTo = () => {
        if(locale === 'de') {
            return 'https://cyberpreventionservices.axa.ch/datenschutzerklarung/'
        }
        if(locale === 'en') {
            return 'https://cyberpreventionservices.axa.ch/en/privacy-policy/'
        }
        if(locale === 'it') {
            return 'https://cyberpreventionservices.axa.ch/it/informativa-sulla-privacy/'
        }
        if(locale === 'fr') {
            return 'https://cyberpreventionservices.axa.ch/fr/declaration-de-protection-des-donnees/'
        }

        return 'https://cyberpreventionservices.axa.ch/datenschutzerklarung/'
    }

    const goToCond = () => {
        if(locale === 'de') {
            return 'https://cyberpreventionservices.axa.ch/agb/'
        }
        if(locale === 'en') {
            return 'https://cyberpreventionservices.axa.ch/en/agb/'
        }
        if(locale === 'it') {
            return 'https://cyberpreventionservices.axa.ch/it/cgc/'
        }
        if(locale === 'fr') {
            return 'https://cyberpreventionservices.axa.ch/fr/tc/'
        }

        return 'https://cyberpreventionservices.axa.ch/agb/';
    }

    return (
        <div className={css.wrap}>
            <ul className={css.items}>
                <li className={cn(locale === 'de' && css.active)} onClick={() => changeLang('de')}>{tCommon('l_de')}</li>
                <li className={cn(locale === 'en' && css.active)} onClick={() => changeLang('en')}>{tCommon('l_en')}</li>
                <li className={cn(locale === 'it' && css.active)} onClick={() => changeLang('it')}>{tCommon('l_it')}</li>
                <li className={cn(locale === 'fr' && css.active)} onClick={() => changeLang('fr')}>{tCommon('l_fr')}</li>
            </ul>

            <ul className={css.list}>
                <Link target="_blank" href={goToCond()}>
                    <li>{tLost('conditions')}</li>
                </Link>
                <span>|</span>
                <Link target="_blank" href={goTo()}>
                    <li>{t('link')}</li>
                </Link>
                <li>{t('text')}</li>
            </ul>
        </div>
    )
}

export default Footer;
