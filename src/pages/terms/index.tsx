import {NextPage} from "next";
import TermsProtection from "@/global/components/terms";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
const TermsPage: NextPage = () => {

    return <MailTemplate hideNavigation noPadding hideAxa>
        <TermsProtection />
    </MailTemplate>
};

export default TermsPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
