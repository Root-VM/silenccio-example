import {FC} from "react";
import cn from "classnames";

import css from "./cyber-insurance-block.module.scss";
import {useTranslations} from "use-intl";
import {useRouter} from "next/router";

const CyberInsuranceBlock: FC = () => {
    const t = useTranslations('CYBER_BLOCK');
    const {locale} = useRouter();

    const goTo = () => {
        if(locale === 'de') {
            window?.open('https://www.axa.ch/de/unternehmenskunden/angebote/inventar-immobilien/cyberversicherung.html')
        }
        if(locale === 'en') {
            window?.open('https://www.axa.ch/en/corporate-customers/offers/inventory-real-estate/cyber-insurance.html')
        }
        if(locale === 'fr') {
            window?.open('https://www.axa.ch/fr/clients-entreprises/offres/inventaire-immobilier/assurance-cyber.html')
        }
        if(locale === 'it') {
            window?.open('https://www.axa.ch/it/clienti-commerciali/offerte/inventario-immobili/assicurazione-cyber.html')
        }
    }
    return (
        <div className={css.wrap}>
            <p className={css.title}>
                {t('title')}
            </p>
            <p className={css.text}>{t('text')}</p>

            <button onClick={goTo}
                className={cn('myBtn', 'small', 'white-natural', css.btn)}>{t('btn')}</button>
        </div>
    )
}

export default CyberInsuranceBlock;
