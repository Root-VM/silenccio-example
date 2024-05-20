import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import OnboardingOneForm from "@/modules/authentication/componets/forms/onboarding-one-form";
import {Show} from "@chakra-ui/react";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";

const OnboardingOnePage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock title='Lorem Ipsum...' /></Show>
                <OnboardingOneForm />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default OnboardingOnePage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
