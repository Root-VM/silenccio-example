import {FC, useEffect, useState} from "react";
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {presetsSelector, selectedPresetSelector} from "@/modules/phishing/store/selector";
import {useRouter} from "next/router";
import {getPhishingStepUrl, getPhishingUrl} from "@/global/helpers/url-generator";
import {PresetResponseApiType} from "@/global/api/phishing/types";
import TemplateModal from "@/modules/phishing/modals/template-modal";

import css from "./template-one-block.module.scss";
import {useTranslations} from "use-intl";

const TemplateOneBlock: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const presets = useSelector(presetsSelector);
    const selectedPreset = useSelector(selectedPresetSelector);
    const router = useRouter();
    const [html, setHtml] = useState('');
    const [selectedPresetLocale, setSelectedPreset] = useState<any>();
    const [htmlTemplate, setHtmlTemplate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const t = useTranslations('PHISHING_STEP_ONE_PAGE');
    const {locale} = useRouter();

    useEffect(() => {
        dispatch.phishing.getPresets().then();
    }, [locale]);

    const onSelectPreset = (preset: PresetResponseApiType) => {
        dispatch.phishing.setSelectedPreset(preset);
        setSelectedPreset(preset);

        dispatch.phishing.setCampainName(preset?.name)
    }

    const onModalOpen = (html: string | null, templateHtml: string ) => {
        if(!html) {
            return;
        }
        setHtml(html);
        setHtmlTemplate(templateHtml);
        setShowModal(true)
    }

    return (
        <div className={css.wrap}>
            <h2>{t('pre_title')}</h2>

            <p className={css.title}>{t('title')}</p>
            <div className={css.text}>{t('text')}</div>

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
                        {
                            presets?.map((preset) => (
                                <Tr>
                                    <Td><strong>
                                        {preset?.name}
                                    </strong></Td>
                                    <Td><strong>
                                        {preset?.description}
                                    </strong></Td>
                                    <Td>
                                        {
                                            !!preset?.emailTemplate?.html &&
                                            <img onClick={() => onModalOpen(preset?.emailTemplate?.html, preset?.landingPage?.html)}
                                                 className={css.preview} src="/img/icons/find_in_page.svg"
                                                 alt="find_in_page"/>
                                        }
                                    </Td>
                                    <Td>
                                        {
                                            preset?.id === selectedPresetLocale?.id ?
                                                <button onClick={() => onSelectPreset(preset)}
                                                        className={cn('myBtn', 'small')}>
                                                    {t('selected')}
                                                </button> :
                                                <button onClick={() => onSelectPreset(preset)}
                                                        className={cn('myBtn', 'small', 'white')}>
                                                    {t('select')}
                                                </button>
                                        }
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>

            <div className={css.btnGroup}>
                <button onClick={() => router.push(getPhishingUrl())}
                    className={cn('myBtn', 'small', 'white', css.btn)}>
                    {t('btn_1')}
                </button>

                <div>
                    <button disabled={!selectedPresetLocale} onClick={() => router.push(getPhishingStepUrl(2))}
                        className={cn('myBtn', 'small', css.btn)}>
                        {t('btn_2')}
                    </button>
                </div>
            </div>

            {
                showModal && html && <TemplateModal templateHtml={htmlTemplate} html={html}
                                                    onClose={() => setShowModal(false)} />
            }
        </div>
    )
}

export default TemplateOneBlock;
