import {FC, ReactNode, useEffect, useState} from "react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

import css from "./editable-element.module.scss";
import cn from "classnames";
import {useTranslations} from "use-intl";
interface ElementProps {
    children: ReactNode | any;
    value?: string | number;
    onCancel?: () => void;
    onSave?: () => void;
    isValid?: boolean;
}
const EditableElement: FC<ElementProps> = ({children, value, onCancel, onSave, isValid}) => {
    const [isEdit, setEdit] = useState(false);
    const tCommon = useTranslations('COMMON');

    useEffect(() => {
        !value && setEdit(true);
    }, []);

    useEffect(() => {
        !isValid && setEdit(true);
    }, [isValid]);

    const close = () => {
        setEdit(false);
        onCancel && onCancel();
    }

    const save = () => {
        if (!isValid) return;

        onSave && onSave();
        setEdit(false);
    }

    const edit = () => {
        setEdit(true);
    }

    return (
        <div className={cn(css.wrap, !isEdit && 'notEdit')}>
            {isEdit ?
                <div className={css.contr}>{children}</div> :
                <p className={css.value}>{value ? value : tCommon('none')}</p>

            }

            {
                isEdit ?
                    <div className={css.btns}>
                        <CloseIcon boxSize={4} onClick={close}/>
                        <CheckIcon boxSize={5} onClick={save}/>
                    </div> :
                    <div className={css.btns}>
                        <img src="/img/icons/pen.svg" alt="pen" onClick={edit}/>
                    </div>
            }
        </div>
    )
}

export default EditableElement;
