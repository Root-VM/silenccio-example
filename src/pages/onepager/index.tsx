import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import OnePagerContent from "@/modules/onepager/components/onepager-content";

const OnePagerPage: NextPage = () => {

    return (
        <MailTemplate noPadding>
            <OnePagerContent />
        </MailTemplate>
    )
};

export default OnePagerPage;
