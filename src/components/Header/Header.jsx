import TopBanner from "./TopBanner";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import "./Header.css";

function Header() {
    return (
        <div className="header-container">
            <TopBanner />
            <DesktopHeader />
            <MobileHeader />
        </div>
    );
}
export default Header;