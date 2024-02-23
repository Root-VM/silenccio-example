import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import ConfirmationCodeForm from "@/modules/registration/componets/forms/confirmation-code-form";
import {Show} from "@chakra-ui/react";

const ConfirmationCodePage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock /></Show>
                <ConfirmationCodeForm />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default ConfirmationCodePage;
