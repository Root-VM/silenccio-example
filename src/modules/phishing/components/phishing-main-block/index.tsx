import {FC, useEffect, useState} from "react";

import cn from "classnames";
import CompanyForm from "@/modules/phishing/components/phishing-main-block/company-form";
import WorkersForm from "@/modules/phishing/components/phishing-main-block/workers-form";

import css from "./phishing-main-block.module.scss";
import EmailModal from "@/modules/phishing/modals/email-modal";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {
    currentCampaignIdSelector,
    currentCampaignSelector,
    employeesFromCampaignSelector
} from "@/modules/phishing/store/selector";
import {Checkbox, Popover, PopoverBody, PopoverContent, PopoverTrigger} from "@chakra-ui/react";
import {getPhishingStepUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";
import {useTranslations} from "use-intl";
import moment from "moment";

const PhishingMainBlock: FC = () => {
    const [active, setActive] = useState(1);
    const dispatch = useDispatch<Dispatch>();
    const [checked, setChecked] = useState(false);
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    const employees = useSelector(employeesFromCampaignSelector);
    const t = useTranslations('PHISHING_MAIN_PAGE');
    const tCommon = useTranslations('COMMON');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const campaign = useSelector(currentCampaignSelector);
    const currentId = useSelector(currentCampaignIdSelector);

    useEffect(() => {
        dispatch.phishing.loadCampaignListIDs().then();
    }, []);

    useEffect(() => {
        currentId?.id && dispatch.phishing.getCampaignById(currentId?.id).then();
    }, [currentId]);

    const goNext = async () => {
        setClicked(true);

        if(!checked && !employees?.length) {
            return;
        }

        await router.push(getPhishingStepUrl(1))
    }

    const checkDate = () => {
        const current_date = moment();

        if(!campaign?.launchDate) {
            return false;
        }

        const differenceInDays = current_date.diff(campaign?.launchDate, 'days');
        return !(differenceInDays > 7);
    }

    return (
        <div className={css.wrap}>
            <div className={cn(css.content)}>
                <h2>{t('title')}</h2>

                <div className={css.controls}>
                    <div onClick={() => setActive(1)}
                         className={cn(css.control, {[css.active]: active === 1})}>
                        {t('btn_a')}
                    </div>
                    <div onClick={() => setActive(2)}
                         className={cn(css.control, {[css.active]: active === 2})}>
                        {t('btn_d')}
                    </div>
                </div>

                {active === 1 && <CompanyForm/>}
                {active === 2 && <WorkersForm/>}

                {
                    !employees?.length && <>
                        <p className={css.bottomText}>
                            {t('text')}
                            <a  onClick={() => setShowEmailModal(true)}>{t('email_link')}</a>
                            {t('text_end')}
                        </p>

                        <Checkbox className={cn('myCheck', clicked && !checked && 'error')}
                                  onChange={(e) => setChecked(e.target.checked)}>
                            {t('check')}
                        </Checkbox>
                        {clicked && !checked && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                    </>
                }

                <div className={css.btnGroup}>
                    <button onClick={goNext} 
                            disabled={(clicked && !checked && !employees?.length) || checkDate()}
                            className={cn('myBtn', 'small', css.btn)}>
                        {t('btn')}
                    </button>
                    <Popover trigger='hover'>
                        <PopoverTrigger>
                            <img className={css.hoverEl} src="/img/icons/i.svg" alt="question"/>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverBody className='myPopover'>
                                <strong>{t('info_b')}</strong> <br/>
                                {t('info')}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {
                showEmailModal && <EmailModal onClose={() => setShowEmailModal(false)} />
            }

        </div>
    )
}

export default PhishingMainBlock;
