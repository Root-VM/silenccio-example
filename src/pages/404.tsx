import {NextPage} from "next";
import NotFoundComponent from "@/global/components/404";
const NotFoundPage: NextPage = () => {

    return <NotFoundComponent />
};

export default NotFoundPage;

import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
