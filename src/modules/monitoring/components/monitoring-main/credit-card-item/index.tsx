import {FC } from "react";

import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {Input, Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import EditableV2Element from "@/global/components/ui/editable-v2-element";
import cn from "classnames";
import {successAlert} from "@/global/helpers/success-alert";
import {deleteCreditCardApi} from "@/global/api/payment";
import {useTranslations} from "use-intl";
import {creditCardApiType} from "@/global/api/card/types";

import css from "./credit-card-item.module.scss";

const CreditCardItem: FC<{item: creditCardApiType}> = ({item}) => {
    const dispatch = useDispatch<Dispatch>();
    const leaveModal = useDisclosure();
    const t = useTranslations('CREDIT_CARD_ITEM_PAGE');
    const tCommon = useTranslations('COMMON');

    const onRemove = async () => {
        leaveModal.onClose();
        try {
            dispatch.common.toggleModalLoading(true);

            await deleteCreditCardApi(item.id);
            dispatch.payment.getCreditCards();

            dispatch.common.toggleModalLoading(false);
            successAlert('Credit card was deleted');
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <div className={css.wrap} >
            <EditableV2Element value={item.name} isValid onSave={() => leaveModal.onOpen()}>
                <Input placeholder={tCommon('default_placeholder')} value={item.name} disabled
                    className="myInput" type='string'/>
            </EditableV2Element>

            <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose}>
                <ModalContent className={'myModal'}>
                    <ModalBody>
                        <img src="/img/icons/close.svg" alt="close" className='close' onClick={() => leaveModal.onClose()}/>
                        <p className='title'>{t('delete')}</p>

                        <div className='btnGroup'>
                            <button className={cn('myBtn', 'small', css.btn)}
                                    onClick={onRemove}
                            >{tCommon('yes')}</button>

                            <button className={cn('myBtn', 'small', 'white', css.btn)}
                                    onClick={() => leaveModal.onClose()}
                            >{tCommon('no')}</button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreditCardItem;
