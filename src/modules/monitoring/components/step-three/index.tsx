import {FC, useEffect} from "react";
import {Spinner} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getMonitoringUrl} from "@/global/helpers/url-generator";
import {useSelector} from "react-redux";
import {successAlert} from "@/global/helpers/success-alert";
import {getPaymentMethodApi} from "@/global/api/payment";
import {paymentIDSelector} from "@/global/store/payment/selector";
import {errorAlert} from "@/global/helpers/error-alert";

import css from "./step-three.module.scss";

const StepThree: FC = () => {
    const router = useRouter();
    const paymentID = useSelector(paymentIDSelector);


    useEffect(() => {
        let timeoutId: any;

        const loadPayment = async () => {
            if (paymentID) {
                try {
                    const response = await getPaymentMethodApi(paymentID);

                    if (!response?.cardNumber) {
                        timeoutId = setTimeout(() => {
                            loadPayment();
                        }, 5000);
                    } else {
                        successAlert('Credit card was successfully added');
                        router.push(getMonitoringUrl()).then();
                    }
                } catch (e) {
                    errorAlert('Credit card was not added');
                    router.push(getMonitoringUrl()).then();
                }
            }
        };

        timeoutId = setTimeout(() => {
            loadPayment();
        }, 5000);

        const cleanup = () => {
            clearTimeout(timeoutId);
        };

        router.events.on("routeChangeStart", cleanup);

        return () => {
            clearTimeout(timeoutId);
            router.events.off("routeChangeStart", cleanup);
        };
    }, [paymentID, router]);

    return (
        <form className={css.wrap}>
            <img onClick={() => router.push(getMonitoringUrl())}
                 className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>

            <h2>Monitoring KK & Tel. Nr. einrichten</h2>
            <p className={css.title}>Monitoring - Step 3/5</p>
            <p className={css.text}>Geben Sie einen Namen für die Kreditkarte ein (z.B. Visa).</p>

            <div className={css.load}><Spinner size='xl'/></div>
        </form>
    )
}

export default StepThree;
