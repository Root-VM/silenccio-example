import {FC, useEffect} from "react";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";

import {useDispatch, useSelector} from "react-redux";
import {payrexxLinkSelector} from "@/global/store/payment/selector";

import css from "./payrexx-payment-modal.module.scss";
import {Dispatch} from "@/global/store";

const PayrexxPaymentModal: FC = () => {
    const leaveModal = useDisclosure();
    const link = useSelector(payrexxLinkSelector);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        leaveModal.onOpen();
    }, []);

    useEffect(() => {
        const handleMessage = async (e: any) => {
            try {
                const message = JSON.parse(e.data);
                if('closeModal' in message?.payrexx) {
                    dispatch.payment.changePaymentStatus(null);
                    leaveModal.onClose();
                }

                if (typeof message !== 'object' || !message?.payrexx || !message?.payrexx?.transaction) {return;}
                const {transaction} = message.payrexx;

                if(transaction?.id) {
                    dispatch.payment.changePaymentStatus('loading');
                }

            } catch (_) {
                // eslint-disable-next-line no-console
                console.log('error');
            }
        };

        window.addEventListener('message', handleMessage, false);

        return () => {
            window.removeEventListener('message', handleMessage, false);
        };
    }, []);

    const close = () => {
        leaveModal.onClose()
    }

    const iframeLoad = () => {
        const iFrame = document.getElementById('payrexx-iframe');
        if (iFrame) {
            // @ts-ignore
            iFrame.contentWindow.postMessage(JSON.stringify({origin: window.location.origin,}), iFrame.src);
        }
    };

    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} scrollBehavior='outside'>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>
                    {/*<img src="/img/icons/close.svg" alt="close" className='close' onClick={close}/>*/}

                    {
                        !!link && <iframe allow="payment *" onLoad={iframeLoad} title='payrexx' id="payrexx-iframe" src={link}/>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default PayrexxPaymentModal;
