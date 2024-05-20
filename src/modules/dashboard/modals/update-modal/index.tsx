import {FC} from "react";
import cn from "classnames";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";

import css from "./update-modal.module.scss";
import {useTranslations} from "use-intl";

const UpdateModal: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const t = useTranslations('MUST_PAY_BLOCK');

    const goToPayment = () => {
        dispatch.payment.changePaymentStatus('to_payment');
    }

    return (
        <div className={css.wrap}>
            <p className={css.text}>
                {t('text')}
            </p>

            <button className={cn('myBtn', 'small', css.btn)} onClick={goToPayment}>
                {t('button')}
            </button>

        </div>
    )
}

export default UpdateModal;
