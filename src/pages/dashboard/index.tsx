import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import ItSecurity from "@/modules/dashboard/componets/it-security";
import WarningsBlock from "../../global/components/warnings-block";
import EmployeesTestBlock from "../../global/components/employees-test-block";
import ItScanBlock from "../../global/components/it-scan-block";
import CyberInsuranceBlock from "../../global/components/cyber-insurance-block";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/registration-wrap";

const DashboardPage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <ItSecurity />
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

export default DashboardPage;
