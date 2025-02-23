import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {


  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main
        className="flex-grow h-full max-w-5xl my-10"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
