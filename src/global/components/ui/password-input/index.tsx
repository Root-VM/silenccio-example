import {FC, useState} from "react";
import {Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {UseFormRegister} from "react-hook-form";
import {passwordPattern} from "@/global/helpers/validation-patterns";
import {useTranslations} from "use-intl";

interface PasswordInputProps {
    isInvalid?: boolean;
    register: UseFormRegister<any>;
    name: string,
    validation: any
}
const PasswordInput: FC<PasswordInputProps> = ({ isInvalid, register, name, validation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const tCommon = useTranslations('COMMON');

    return (
        <InputGroup>
            <Input placeholder={tCommon('default_placeholder')} className="myInput" type={showPassword ? 'text' : 'password'}
                   isInvalid={isInvalid}  {...register(name, {...validation})} />

            <InputRightElement width='4.5rem'>
                {showPassword ?
                    <img src="/img/icons/eye-closed.svg" alt="eye"  onClick={() => setShowPassword(false)}/> :
                    <img src="/img/icons/eye.svg" alt="eye" onClick={() => setShowPassword(true)} />
                }
            </InputRightElement>
        </InputGroup>
    )
}

export default PasswordInput;
