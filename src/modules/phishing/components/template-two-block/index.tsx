import {FC, useEffect, useState} from "react";
import {Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import cn from "classnames";
import MemberAdd from "@/modules/phishing/components/template-two-block/member-add";
import MemberItem from "@/modules/phishing/components/template-two-block/member-item";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {employeesSelector} from "@/modules/phishing/store/selector";
import {getPhishingStepUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";

import css from "./template-two-block.module.scss";
import {useTranslations} from "use-intl";

const TemplateTwoBlock: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const employees = useSelector(employeesSelector);
    const router = useRouter();
    const t = useTranslations('PHISHING_STEP_TWO_PAGE');
    const tLost = useTranslations('LOST_DATA');
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        dispatch.phishing.getEmployees().then();
    }, []);

    useEffect(() => {
        setShowAdd(false);
    }, [employees]);
    return (
        <div className={css.wrap}>
            <h2>{t('pre_title')}</h2>

            <p className={css.title}>{t('title')}</p>
            <div className={css.text}>
                <p>{t('text')}</p>
                <br/>
                <p>{t('text_2')}</p>
            </div>

            {
                !!employees?.length &&
                <TableContainer className={cn('myTable', css.table)}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>{t('table_title_1')}</Th>
                                <Th>{t('table_title_2')}</Th>
                                <Th>{t('table_title_3')}</Th>
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


            {
                !showAdd &&
                <button className={cn('myBtn', 'small', css.btn)} onClick={() => setShowAdd(true)}>
                    {tLost('phishing_add_worker_btn')}
                </button>
            }

            {
                showAdd && <>
                    <MemberAdd/>
                </>
            }

            <div className={css.btnGroup}>
                <button onClick={() => router.push(getPhishingStepUrl(1))}
                        className={cn('myBtn', 'small', 'white', css.btn)}>
                    {t('btn_1')}
                </button>
                <button onClick={() => router.push(getPhishingStepUrl(3))}
                    disabled={!employees?.length} className={cn('myBtn', 'small', css.btn)}>
                    {t('btn_2')}
                </button>
            </div>

        </div>
    )
}

export default TemplateTwoBlock;
