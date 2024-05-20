import {FC} from "react";
import cn from "classnames";

import {useRouter} from "next/router";
import {getPhishingUrl} from "@/global/helpers/url-generator";

import css from "./employees-test-block.module.scss";
import {useTranslations} from "use-intl";
import {useSelector} from "react-redux";
import {isPaidSelector} from "@/global/store/payment/selector";

const EmployeesTestBlock: FC = () => {
    const router = useRouter();
    const t = useTranslations('EMPLOYEES_BLOCK');
    const isPaid = useSelector(isPaidSelector);

    return (
        <div className={css.wrap}>
            <p className={css.title}>
                {t('title')}
            </p>
            <p className={css.text}>{t('text')}</p>

            <button onClick={() => router.push(getPhishingUrl())} disabled={!isPaid}
                    className={cn('myBtn', 'small', 'white', css.btn)}>{t('btn')}</button>
        </div>
    )
}

export default EmployeesTestBlock;
