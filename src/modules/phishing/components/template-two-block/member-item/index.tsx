import {FC, useState} from "react";
import {Input, Modal, ModalBody, ModalContent, Td, Tr, useDisclosure,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";

import {emailPattern, namePattern} from "@/global/helpers/validation-patterns";
import {EmployeeRequestApiType, EmployeeResponseApiType} from "@/global/api/phishing/types";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {deleteEmployeeApi, updateEmployeeApi} from "@/global/api/phishing";
import cn from "classnames";

import css from "./member-item.module.scss";
import {useTranslations} from "use-intl";

const MemberItem: FC<{employee: EmployeeResponseApiType}> = ({employee}) => {
    const leaveModal = useDisclosure();
    const {
        register,
        setValue,
        getValues,
        trigger,
        formState: { errors },
    } = useForm<EmployeeRequestApiType>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const dispatch = useDispatch<Dispatch>();
    const [edit, setEdit] = useState(false);
    const t = useTranslations('MEMBER_ITEM_BLOCK');
    const tCommon = useTranslations('COMMON');

    const save = async (data: EmployeeRequestApiType) => {
        try {
            dispatch.common.toggleModalLoading(true);

            await updateEmployeeApi(employee.id, data);

            await dispatch.phishing.getEmployees();

            close();
            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
        }
    }

    const onSend = async () => {
        await trigger();

        setTimeout(() => {
            const data = getValues();
            if(!errors?.email && !errors?.firstName && !errors?.lastName) {
                save(data).then();
            }
        })
    }

    const close = () => {
        setEdit(false);

        setValue('email', '');
        setValue('lastName','');
        setValue('firstName', '');
    }

    const open = () => {
        setEdit(true);
        setValue('email', employee.email);
        setValue('lastName', employee.lastName);
        setValue('firstName', employee.firstName);
    }

    const onRemove = async () => {
        try {
            dispatch.common.toggleModalLoading(true);

            await deleteEmployeeApi(employee.id);

            await dispatch.phishing.getEmployees();

            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
        }

    }
    return <>
        <Tr className={css.wrap}>
            {
                edit ?
                    <>
                        <Td>
                            <Input placeholder={tCommon('default_placeholder')} {...register("firstName", {required: true, pattern: namePattern})}
                                   isInvalid={!!errors.firstName}
                                   className="myInput" type='text'/>
                            {errors?.firstName?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                            {errors?.firstName?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                        </Td>
                        <Td>
                            <Input placeholder={tCommon('default_placeholder')} {...register("lastName", {required: true, pattern: namePattern})}
                                   isInvalid={!!errors.lastName}
                                   className="myInput" type='text'/>
                            {errors?.lastName?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                            {errors?.lastName?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                        </Td>
                        <Td>
                            <Input placeholder={tCommon('default_placeholder')} {...register("email", {required: true, pattern: emailPattern})}
                                   isInvalid={!!errors.email}
                                   className="myInput" type='email'/>
                            {errors?.email?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                            {errors?.email?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                        </Td>
                    </> :
                    <>
                        <Td><strong>{employee.firstName}</strong></Td>
                        <Td><strong>{employee.lastName}</strong></Td>
                        <Td><strong>{employee.email}</strong></Td>
                    </>
            }

            <Td>
                {
                    edit ?
                        <div className={css.btns}>
                            <CloseIcon boxSize={5} onClick={close}/>
                            <CheckIcon boxSize={6} onClick={onSend}/>
                        </div> :
                        <div className={css.btns}>
                            <img onClick={() => leaveModal.onOpen()} src="/img/icons/card.svg" alt="card"/>
                            <img onClick={open} src="/img/icons/pen.svg" alt="pen"/>
                        </div>
                }
            </Td>
        </Tr>

        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose}>
            <ModalContent className={'myModal'}>
                <ModalBody>
                    <img src="/img/icons/close.svg" alt="close" className='close' onClick={() => leaveModal.onClose()}/>
                    <p className='title'>{t('delete')}</p>

                    <div className='btnGroup'>
                        <button className={cn('myBtn', 'small', css.btn)}
                                onClick={onRemove}
                        >{tCommon('yes')}
                        </button>

                        <button className={cn('myBtn', 'small', 'white', css.btn)}
                                onClick={() => leaveModal.onClose()}
                        >{tCommon('no')}
                        </button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}

export default MemberItem;
