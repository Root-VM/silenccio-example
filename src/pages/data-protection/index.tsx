import {NextPage} from "next";
import DataProtection from "@/global/components/data-protection";
import OnePagerContent from "@/modules/onepager/components/onepager-content";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
const DataProtectionPage: NextPage = () => {

    return <MailTemplate hideNavigation noPadding hideAxa>
        <DataProtection />
    </MailTemplate>
};

export default DataProtectionPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
