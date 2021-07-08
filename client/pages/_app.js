import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/auth-context";
import "../public/MainIndex.css";
import AntLayout from "../components/layout/AntLayout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" />
      <AntLayout>
        <Component {...pageProps} />
      </AntLayout>
    </AuthProvider>
  );
}

export default MyApp;
