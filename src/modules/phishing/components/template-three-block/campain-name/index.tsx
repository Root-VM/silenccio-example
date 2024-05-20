import {FC} from "react";
import {useSelector} from "react-redux";
import {campainNameSelector} from "@/modules/phishing/store/selector";

import css from "./campain-name.module.scss";
import {useTranslations} from "use-intl";
import {useRouter} from "next/router";
import {getPhishingStepUrl} from "@/global/helpers/url-generator";

const CampainName: FC = () => {
    const name = useSelector(campainNameSelector);
    const t = useTranslations('PHISHING_CAMPAIN_NAME');
    const router = useRouter();

    const goTo = () => {
        router.push(getPhishingStepUrl(1))
    }

    return (
        <div className={css.line}>
            <p>{t('title')}</p>

            <p><strong>{name}</strong></p>
            <img onClick={goTo} src="/img/icons/pen.svg" alt="pen" />
        </div>
    )
}

export default CampainName;
