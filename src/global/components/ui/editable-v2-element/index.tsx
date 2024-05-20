import {FC, ReactNode, useEffect, useState} from "react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

import css from "./editable-v2-element.module.scss";
import {useTranslations} from "use-intl";
interface ElementProps {
    children: ReactNode | any;
    value?: string | number;
    onCancel?: () => void;
    onSave?: () => void;
    isValid?: boolean;
}
const EditableV2Element: FC<ElementProps> = ({children, value, onCancel, onSave, isValid}) => {
    const [isEdit, setEdit] = useState(true);
    const t = useTranslations('ALERT_BLOCK');

    useEffect(() => {
        // !value && setEdit(true);
    }, []);

    const close = () => {
        // setEdit(false);
        onCancel && onCancel();
    }

    const save = () => {
        onSave && onSave();

        if (!isValid) return;
        // setEdit(false);
    }

    const edit = () => {
        setEdit(true);
    }

    return (
        <div className={css.wrap}>
            {isEdit ?
                <div className={css.contr}>{children}</div> :
                <p className={css.value}>{value ? value : t('none')}</p>
            }

            <div className={css.btns}>
                <img src="/img/icons/card.svg" alt="pen" onClick={save}/>
            </div>
        </div>
    )
}

export default EditableV2Element;
