import {FC, useEffect, useState} from "react";

import css from "./email-modal.module.scss";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";
import {useTranslations} from "use-intl";

const EmailModal: FC<{onClose: () => void}> = ({onClose}) => {
    const leaveModal = useDisclosure();
    const tLost = useTranslations('LOST_DATA');
    const [beatCopied, setBeatCopied] = useState(false);
    const [emailCopied, setEnailCopied] = useState(false);

    useEffect(() => {
        leaveModal.onOpen();
    }, []);

    const close = () => {
        onClose && onClose();
        leaveModal.onClose();
    }

    const copyBeat = async (text: string) =>  {
        try {
            await navigator.clipboard.writeText(text);
            setBeatCopied(true);
        } catch (err) {
            console.error(err);
        }
    }

    const copyEmail = async (text: string) =>  {
        try {
            await navigator.clipboard.writeText(text);
            setEnailCopied(true);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose}>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>
                    <img src="/img/icons/close.svg" alt="close" className='close'
                         onClick={close}/>

                    <h4>{tLost('phishing_email_title')}</h4>

                    <p className={css.title}>{tLost('phishing_email_text')}</p>

                    <p className={css.text}>
                        <strong>{tLost('phishing_email_inform_s')}</strong><br/> {tLost('phishing_email_inform')}
                    </p>

                    <div className={css.btnGroup}>
                        <button onClick={() => copyBeat(tLost('phishing_email_inform'))} className={cn('myBtn', 'small', css.btn)}>
                            {tLost('phishing_email_btn')} <img src="/img/icons/copy.svg" alt="copy"/>
                        </button>

                        {
                            beatCopied && <p>{tLost('phishing_email_btn_copied')}</p>
                        }
                    </div>

                    <p className={css.text}>
                        <strong>{tLost('phishing_email_mail_text_s')}</strong><br/>
                        {tLost('phishing_email_mail_text')}<br/><br/>
                        {tLost('phishing_email_mail_text_last')}
                    </p>

                    <div className={css.btnGroup}>
                        <button onClick={() => copyEmail(tLost('phishing_email_mail_text'))} className={cn('myBtn', 'small', css.btn)}>
                            {tLost('phishing_email_mail_btn')} <img src="/img/icons/copy.svg" alt="copy"/>
                        </button>

                        {emailCopied && <p>{tLost('phishing_email_mail_btn_copied')}</p>}
                    </div>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default EmailModal;
