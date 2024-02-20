import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import WarningsBlock from "../../../global/components/warnings-block";
import EmployeesTestBlock from "../../../global/components/employees-test-block";
import ItScanBlock from "../../../global/components/it-scan-block";
import CyberInsuranceBlock from "../../../global/components/cyber-insurance-block";
import StepTwo from "@/modules/monitoring/components/step-two";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/registration-wrap";

const MonitoringPage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <StepTwo />
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

export default MonitoringPage;
