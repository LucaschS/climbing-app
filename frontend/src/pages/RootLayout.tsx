import { Outlet, useSearchParams } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import AuthenticationPage from "./Authentication";

const RootLayout = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <MainNavigation />
      {searchParams.get("mode") === "auth" ||
      searchParams.get("mode") === "login" ||
      searchParams.get("mode") === "signup" ? (
        <AuthenticationPage />
      ) : null}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
