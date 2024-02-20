import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import OnboardingTwoForm from "@/modules/registration/componets/forms/onboarding-two-form";

const RegistrationPage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <TextsBlock />
                <OnboardingTwoForm />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default RegistrationPage;
