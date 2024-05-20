import {FC} from "react";
import {Modal, ModalContent, Spinner} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {loadingModalSelector} from "@/global/store/common/selector";


const ModalLoading: FC = () => {
    const show = useSelector(loadingModalSelector);

    return <>
        {show && (
            <Modal onClose={() => {}} isOpen={true}>
                <ModalContent className='modalLoading'>
                    <Spinner size='xl'/></ModalContent>
            </Modal>
        )}
    </>
}

export default ModalLoading;
