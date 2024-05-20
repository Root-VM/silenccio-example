import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import OnboardingFiveForm from "@/modules/authentication/componets/forms/onboarding-five-form";
import {Show} from "@chakra-ui/react";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";

const OnboardingFivePage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock title='Lorem Ipsum...' /></Show>
                <OnboardingFiveForm />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default OnboardingFivePage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
