import { Logo, Luna, Sol } from "./Icons";
import './Navbar.css'

const Navbar=()=>{
    return (
        <nav>
            <Logo />
            <div className="switch">
            <Sol/>
                <label >
                    <input type="checkbox" hidden className="check-switch"/>
                    <span className="slider"></span>
                </label>
            <Luna></Luna>
            </div>
        </nav>
    )
}
export default Navbar;