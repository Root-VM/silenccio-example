import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import WarningsBlock from "../../global/components/warnings-block";
import EmployeesTestBlock from "../../global/components/employees-test-block";
import ItScanBlock from "../../global/components/it-scan-block";
import CyberInsuranceBlock from "../../global/components/cyber-insurance-block";
import CurentAlerts from "@/modules/alerts/components/curent-alerts";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/registration-wrap";

const AlertsPage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <CurentAlerts />
                <div>
                    <WarningsBlock />
                    <EmployeesTestBlock />
                    <ItScanBlock />
                    <CyberInsuranceBlock />
                </div>
            </MainWrap>
        </MailTemplate>
    )
};

export default AlertsPage;
