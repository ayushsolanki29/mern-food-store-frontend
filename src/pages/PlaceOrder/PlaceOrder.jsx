import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const totalCartAmmt = getTotalCartAmmount() + 40 - 10;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "Gujarat",
    zipcode: "",
    country: "India",
    phone: "",

  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: totalCartAmmt,
    }
    let response = await axios.post(url + "/api/order/place-order", orderData, { headers: { token } });
    if (response.data.success) {
      toast.success(response.data.message);
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error(response.data.message);
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.info("You are Not Logged In");
      navigate("/cart")
    } else if (getTotalCartAmmount() === 0) {
      navigate("/cart")
      toast.info("You Did Not Select Any Product for Payment");
    }
  }, [token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required type="text" onChange={onChangeHandler} name="firstName" value={data.firstName} placeholder='First Name' />
          <input required type="text" onChange={onChangeHandler} name="lastName" value={data.lastName} placeholder='Last Name' />
        </div>
        <input required type="email" onChange={onChangeHandler} name="email" value={data.email} placeholder='Email address' />
        <input required type="text" onChange={onChangeHandler} name="street" value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" onChange={onChangeHandler} name="city" value={data.city} placeholder='City' />

          <select name="state" onChange={onChangeHandler} value={data.state}>
            <option value={"Gujarat"} defaultValue>Gujarat</option>
            <option value={"Maharastra"} >Maharastra</option>
          </select>
        </div>
        <div className="multi-fields">
          <input required type="text" onChange={onChangeHandler} name="zipcode" value={data.zipcode} placeholder='zipcode' />
          <select name="country" onChange={onChangeHandler} value={data.country} >
            <option value={"india"} defaultValue>India</option>
          </select>
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} required type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
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
              <p>Discount</p>
              <p> -{10}₹</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{totalCartAmmt} ₹</b>
            </div>
          </div>
          <button type='submit' >Proceed To Payment {totalCartAmmt}₹</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
