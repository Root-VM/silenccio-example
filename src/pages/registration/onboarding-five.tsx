import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import OnboardingFiveForm from "@/modules/registration/componets/forms/onboarding-five-form";
import {Show} from "@chakra-ui/react";

const RegistrationPage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock /></Show>
                <OnboardingFiveForm />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default RegistrationPage;
