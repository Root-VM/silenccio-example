import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import PersonalDataFrom from "@/modules/registration/componets/forms/personal-data-form";

const ConfirmationCodePage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <TextsBlock />
                <PersonalDataFrom />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default ConfirmationCodePage;
