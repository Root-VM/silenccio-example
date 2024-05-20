import {FC} from "react";

import css from "./log-out.module.scss";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";
import {useRouter} from "next/router";
import {getDefaultUrl} from "@/global/helpers/url-generator";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {useTranslations} from "use-intl";

const LogOut: FC = () => {
    const leaveModal = useDisclosure();
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const t = useTranslations('HEADER');
    const tCommon = useTranslations('COMMON');

    const logout = async () => {
        leaveModal.onClose();
        await router.push(getDefaultUrl());
        localStorage.clear();
        dispatch.payment.changePaymentStatus(null);
        dispatch.payment.changePaymentID(null);
        dispatch.payment.changeInvoiceID(null);
        dispatch.common.clearAll();
    }

    return (
        <div className={css.wrap}>
            <button className={cn('myBtn', 'logoutBtn')} onClick={(() => leaveModal.onOpen())}>Ausloggen</button>

            <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose}>
                <ModalContent className={'myModal'}>
                    <ModalBody>
                        <img src="/img/icons/close.svg" alt="close" className='close' onClick={() => leaveModal.onClose()}/>
                        <p className='title'>{t('log_out')}</p>

                        <div className='btnGroup'>
                            <button className={cn('myBtn', 'small', css.btn)} onClick={logout}
                            >{tCommon('yes')}
                            </button>
                            <button className={cn('myBtn', 'small', 'white', css.btn)} onClick={() => leaveModal.onClose()}
                            >{tCommon('no')}
                            </button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LogOut;
