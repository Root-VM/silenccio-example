import {FC, useEffect, useRef, useState} from "react";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";

import css from "./template-modal.module.scss";

const TemplateModal: FC<{html: string, templateHtml: string, onClose: () => void}> = ({html, templateHtml, onClose}) => {
    const leaveModal = useDisclosure();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [type, setType] = useState<'email' | 'template'>('email');
    useEffect(() => {
        leaveModal.onOpen();
    }, []);

    const adjustIframeHeight = () => {
        if (iframeRef.current) {
            const height =  iframeRef?.current?.contentWindow?.document?.body?.scrollHeight;
            iframeRef.current.style.height = height ? height + 30 + 'px' : 'auto';
        }
    };
    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose}>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>
                    {
                        type === 'email' &&
                        <img onClick={() => setType('template')}
                             src="/img/icons/arrow-l-m.svg" alt="arrow" className={css.arrowL}/>
                    }
                    {
                        type === 'template' &&
                        <img onClick={() => setType('email')}
                             src="/img/icons/arrow-l-m.svg" alt="arrow" className={css.arrowR}/>
                    }


                    <img src="/img/icons/close.svg" alt="close" className='close'
                         onClick={onClose}/>

                    { type === 'email' &&
                        <iframe srcDoc={html}
                                style={{width: '100%', border: 'none', pointerEvents: 'none'}}
                                ref={iframeRef}
                                onLoad={adjustIframeHeight}
                                // sandbox="allow-top-navigation"
                        />
                    }
                    { type === 'template' &&
                        <iframe srcDoc={templateHtml}
                                style={{width: '100%', border: 'none', minHeight: '500px'}}
                                ref={iframeRef}
                                // onLoad={adjustIframeHeight}
                                sandbox="allow-top-navigation"
                        />
                    }

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default TemplateModal;
