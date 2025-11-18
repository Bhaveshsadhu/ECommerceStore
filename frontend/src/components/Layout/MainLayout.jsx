import NavbarComp from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <NavbarComp />
      <main className="flex-grow-1 py-5">
        <div className="container-xxl px-3 px-md-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
