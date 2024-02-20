import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import OnboardingOneForm from "@/modules/registration/componets/forms/onboarding-one-form";

const RegistrationPage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <TextsBlock />
                <OnboardingOneForm />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default RegistrationPage;
