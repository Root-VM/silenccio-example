import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import OnboardingTwoForm from "@/modules/authentication/componets/forms/onboarding-two-form";
import {Show} from "@chakra-ui/react";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";

const OnboardingTwoPage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock title='Lorem Ipsum...' /></Show>
                <OnboardingTwoForm />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default OnboardingTwoPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
