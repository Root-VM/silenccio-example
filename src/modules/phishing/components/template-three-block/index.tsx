import {FC} from "react";
import {Input, Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {campainNameSelector, employeesSelector, selectedPresetSelector} from "@/modules/phishing/store/selector";
import MemberItem from "@/modules/phishing/components/template-two-block/member-item";
import {getPhishingStepUrl, getPhishingUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";
import {campaignCompleteApi, campaignInitApi} from "@/global/api/phishing";
import {Dispatch} from "@/global/store";
import CampainName from "@/modules/phishing/components/template-three-block/campain-name";

import css from "./template-three-block.module.scss";
import {useTranslations} from "use-intl";

const TemplateThreeBlock: FC = () => {
    const selectedPreset = useSelector(selectedPresetSelector);
    const employees = useSelector(employeesSelector);
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const name = useSelector(campainNameSelector);
    const t = useTranslations('PHISHING_STEP_THREE_PAGE');

    const onSend = async () => {
        try {
            dispatch.common.toggleModalLoading(true);

            await campaignInitApi({
                presetId: selectedPreset?.id,
                launchDate: new Date(),
                name: name
            });

            // await campaignCompleteApi();

            await dispatch.phishing.getCurrentCampaign();

            await router.push(getPhishingUrl());

            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
        }
    }
    return (
        <div className={css.wrap}>
            <h2>{t('pre_title')}</h2>

            <p className={css.title}>{t('title')}</p>
            <div className={css.text}>{t('text')}</div>

            <CampainName />

            <div className={css.line}>
                <p>{t('email')}</p>
                <strong>{selectedPreset?.emailTemplate?.sender}</strong>
            </div>

            {
                !!employees?.length &&
                <TableContainer className={cn('myTable', css.table)}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>{t('table_title')}</Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {employees?.map((employee) => (
                                <MemberItem key={employee.id} employee={employee} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            }

            <p className={css.tLast}>
                {t('last_text_1')}
                <br/><br/>
                {t('last_text_2')}
            </p>

            <div className={css.btnGroup}>
                <button onClick={() => router.push(getPhishingStepUrl(2))}
                    className={cn('myBtn', 'small', 'white', css.btn)}>
                    {t('btn_1')}
                </button>
                <button onClick={onSend}
                    disabled={!selectedPreset?.id || !employees?.length || !name}
                        className={cn('myBtn', 'small', css.btn)}>
                    {t('btn_2')}
                </button>
            </div>

        </div>
    )
}

export default TemplateThreeBlock;
