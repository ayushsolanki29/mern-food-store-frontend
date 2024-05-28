import React from 'react'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div id='footer' className='footer'>
            <div className="footer-content">
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non illum consectetur nostrum ex rerum dicta cum labore necessitatibus, praesentium quisquam ullam tenetur fugit eum est quo alias perferendis quia explicabo.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" /><img src={assets.linkedin_icon} alt="" /><img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className='footer-conent-center'>
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+123456789</li>
                        <li>abc@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copy">
                Copyright 2024 @ tomato.com - All right Resevred.
            </p>
        </div>
    )
}

export default Footer
