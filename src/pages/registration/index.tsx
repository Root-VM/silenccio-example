import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import RegistrationForm from "@/modules/registration/componets/forms/registration-form";

const RegistrationPage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <TextsBlock />
                <RegistrationForm />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default RegistrationPage;
