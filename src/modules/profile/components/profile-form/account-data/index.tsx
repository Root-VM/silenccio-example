import {FC, useEffect} from "react";
import {Dispatch} from "@/global/store";
import {useDispatch, useSelector} from "react-redux";

import css from "./account-data.module.scss";
import {useTranslations} from "use-intl";
import {accountSelector, organisationSelector} from "@/modules/profile/store/selector";

const AccountData: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const t = useTranslations('PROFILE_PAGE');
    const account = useSelector(accountSelector);
    const organisation = useSelector(organisationSelector);

    useEffect(() => {
        dispatch.profile.getAccount().then();
        dispatch.profile.getAccountOrganisation().then();
    }, []);

    return (
        <div className={css.wrap}>
            <h4>{t('company_information')}</h4>
            {
                !!account?.email && <>
                    <p className={css.title}>{t('login_email')}</p>
                    <p className={css.text}>
                        <a href={'mailto:' + account?.email}>{account?.email}</a>
                    </p>
                </>
            }

            {
                !!organisation?.length && <>
                    <p className={css.title}>{t('company_name')}</p>
                    <p className={css.text}>{organisation[0]?.name}</p>
                </>
            }

            {
                !!account?.phone && <>
                    <p className={css.title}>{t('phone_for_confirmation')}</p>
                    <p className={css.text}>{account?.phone}</p>
                </>
            }
        </div>
    )
}

export default AccountData;
