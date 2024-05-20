import {FC, useEffect, useState} from "react";

import {
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Table, TableContainer,
    Tbody, Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";

import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {
    campaignIdsSelector, currentCampaignIdSelector,
    currentCampaignSelector, currentEmployeesSelector,
    employeesFromCampaignSelector
} from "@/modules/phishing/store/selector";
import Cards from "@/modules/phishing/components/phishing-main-block/company-form/cards";
import Moment from "react-moment";

import css from "./company-form.module.scss";
import {useTranslations} from "use-intl";
import {Dispatch} from "@/global/store";

const CompanyForm: FC = () => {
    const employees = useSelector(currentEmployeesSelector);
    const [sortEmployees, setSortEmployees] = useState<any>([]);
    const [show, setShow] = useState(true);
    const t = useTranslations('PHISHING_COMPANY_FROM');
    const tC = useTranslations('PHISHING_COMPANY_CARD');
    const ids = useSelector(campaignIdsSelector);
    const dispatch = useDispatch<Dispatch>();
    const currentId = useSelector(currentCampaignIdSelector);

    useEffect(() => {
        !currentId?.id && dispatch.phishing.setCurrentId(ids[ids.length - 1]);
    }, [ids, currentId])

    useEffect(() => {
        setSortEmployees(employees);
    }, [employees]);

    const sortByKey = (key: string) => {
        const sorted = sortEmployees.sort((b: any, a: any) => {
            const a_hasKey = a?.some((e: any) => e[key]);
            const b_hasKey = b?.some((e: any) => e[key]);

            if (a_hasKey === b_hasKey) {
                return 0;
            } else if (a_hasKey) {
                return -1;
            } else {
                return 1;
            }
        })


        setSortEmployees(sorted);

        setShow(false);
        setTimeout(() => {setShow(true)})
    }

    const  getCurrentIndex = () =>  {
        return ids?.findIndex(item => item?.id === currentId?.id);
    }
    const canGoForward = () => {
        const currentIndex = getCurrentIndex();
        return currentIndex < ids.length - 1;
    }

    const canGoBackward = () => {
        const currentIndex = getCurrentIndex();
        return currentIndex > 0;
    }

    function goForward() {
        if (canGoForward()) {
            const currentIndex = getCurrentIndex();
            dispatch.phishing.setCurrentId(ids[currentIndex + 1]);
        }
    }

    function goBackward() {
        if (canGoBackward()) {
            const currentIndex = getCurrentIndex();
            dispatch.phishing.setCurrentId(ids[currentIndex - 1]);
        }
    }

    return (
        <div className={css.wrap}>
            {
                !sortEmployees?.length && <>
                    <h4>{t('title')}</h4>
                    <p className={css.text}>{t('text')}</p>
                </>
            }

            <div className={css.dateControl}>

                <img onClick={goBackward}
                    className={cn(css.arrow, !canGoBackward() && css.disabled)}
                     src="/img/icons/arrow_left.svg" alt="arrow"/>
                <span>
                    <Moment date={currentId?.launchDate ? currentId?.launchDate : new Date()}
                            format="DD.MM.YYYY"/>
                </span>
                <img onClick={goForward}
                    className={cn(css.arrow, !canGoForward() && css.disabled)}
                    src="/img/icons/arrow_right.svg" alt="arrow"/>

                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="question"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='myPopover'>
                            <strong>{t('explane_b')}</strong> <br/>{t('explane')}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>

            <Cards/>

            {
                !!sortEmployees?.length &&
                <TableContainer className={cn('myTable', css.table)}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th onClick={() => sortByKey('emailSentDate')}>{tC('email_1').toUpperCase()}</Th>
                                <Th onClick={() => sortByKey('emailOpenedDate')}>{tC('email_2')}</Th>
                                <Th onClick={() => sortByKey('clickedLinkDate')}>{tC('link')}</Th>
                                <Th onClick={() => sortByKey('submittedDataDate')}>{tC('date')}</Th>
                                <Th onClick={() => sortByKey('emailReportedDate')}>{tC('email_3')}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                              show && sortEmployees?.map((employe: any, index: number) => (
                                    <Tr key={index}>
                                        <Td><strong>{employe.firstName} {employe.lastName}</strong></Td>
                                        <Td>{!!employe?.emailSentDate ?
                                            <img src="/img/icons/table_check.svg" alt="table"/> :
                                            <img src="/img/icons/table_close.svg" alt="table"/>
                                        }</Td>
                                        <Td>{!!employe?.emailOpenedDate ?
                                            <img src="/img/icons/table_check.svg" alt="table"/> :
                                            <img src="/img/icons/table_close.svg" alt="table"/>
                                        }</Td>
                                        <Td>{!!employe?.clickedLinkDate ?
                                            <img src="/img/icons/table_check.svg" alt="table"/> :
                                            <img src="/img/icons/table_close.svg" alt="table"/>
                                        }</Td>
                                        <Td>{!!employe?.submittedDataDate ?
                                            <img src="/img/icons/table_check.svg" alt="table"/> :
                                            <img src="/img/icons/table_close.svg" alt="table"/>
                                        }</Td>
                                        <Td>{!!employe?.emailReportedDate ?
                                            <img src="/img/icons/table_check.svg" alt="table"/> :
                                            <img src="/img/icons/table_close.svg" alt="table"/>
                                        }</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            }
        </div>
    )
}

export default CompanyForm;
