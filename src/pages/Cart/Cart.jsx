import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmmount ,url} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      <div className={getTotalCartAmmount() === 0 ? "empty-cart" : "cart-none"}>
        <h2>Cart is Empty</h2>
      </div>
      <div className={getTotalCartAmmount() === 0 ? "cart-none" : "cart"} >
        <div className="cart-items">
          <div className="cart-items-title">
            <p className='cart-img-item'>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <React.Fragment key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img className='cart-img-item' src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price}₹</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}₹</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </React.Fragment>
              )
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmmount()}₹</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{40}₹</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmmount() + 40}₹</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
          </div>
          <div className="cart-promo">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className='cart-promo-input'>
                <input type="text" placeholder="Enter Promo Code" />
                <button>Apply Code</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
