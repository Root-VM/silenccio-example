import {NextPage} from "next";
import GotCatch from "@/modules/phishing/components/got-catch";

const PhishingGotCatchPage: NextPage = () => {
    return <GotCatch />
};

export default PhishingGotCatchPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
