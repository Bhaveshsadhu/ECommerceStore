import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1 py-4">
                <div className="container">{children}</div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
