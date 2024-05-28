import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");

    const { getTotalCartAmmount, setToken, token } = useContext(StoreContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.success("Logout success!");
        setShowLogin(true)
    }
    return (
        <div className='navbar'>
            <Link to={"/"}> <img className='logo' src={assets.logo} alt='' /></Link>
            <ul className='navbar-menu'>
                <Link to={"/"} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='/#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='/#app-download' onClick={() => setMenu("mobile")} className={menu === "mobile" ? "active" : ""}>mobile-app</a>
                <a href='/#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to={"/cart"}><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> :
                    <div className='navabar-profile'>
                        <img src={assets.profile_icon} alt="profile" />
                        <ul className='nav-profile-dropdown'>
                            <Link to={"/order/myorders"}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </Link>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>

                    </div>}

            </div>
        </div>
    )
}

export default Navbar
