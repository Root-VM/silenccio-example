import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import ConfirmationCodeForm from "@/modules/registration/componets/forms/confirmation-code-form";

const ConfirmationCodePage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <TextsBlock />
                <ConfirmationCodeForm />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default ConfirmationCodePage;
