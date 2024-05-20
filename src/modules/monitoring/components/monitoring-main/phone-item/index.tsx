import {FC } from "react";

import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {Input, Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import {SubmitHandler} from "react-hook-form";
import {MonitoringStoreInterface} from "@/modules/monitoring/store/model";
import EditableV2Element from "@/global/components/ui/editable-v2-element";

import css from "./phone-item.module.scss";
import cn from "classnames";
import {deleteOrganisationPhonesApi} from "@/global/api/organisation";
import {successAlert} from "@/global/helpers/success-alert";
import {useTranslations} from "use-intl";

const PhoneItem: FC<{item: MonitoringStoreInterface["phones"][0]}> = ({item}) => {
    const dispatch = useDispatch<Dispatch>();
    const leaveModal = useDisclosure();
    const t = useTranslations('PHONE_ITEM');
    const tCommon = useTranslations('COMMON');

    const onRemove = async () => {
        leaveModal.onClose();
        try {
            dispatch.common.toggleModalLoading(true);

            await deleteOrganisationPhonesApi(item.id);
            dispatch.monitoring.getPhones();

            dispatch.common.toggleModalLoading(false);
            successAlert('Phone was deleted');
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <div className={css.wrap} >
            <EditableV2Element value={item.phone} isValid onSave={() => leaveModal.onOpen()}>
                <Input placeholder={tCommon('default_placeholder')} value={item.phone} disabled
                    className="myInput"  type='email'/>
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

export default PhoneItem;
