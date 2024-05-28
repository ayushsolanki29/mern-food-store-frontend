import axios from "axios";
import { toast } from 'react-toastify';
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContexProvider = (props) => {

    const [cartItems, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [menu_list, setMenuList] = useState([]);

    const url = "http://localhost:4000"

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            const response = await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message);
                
            }
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            const response = await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message);
                
            }
        }
    }

    const getTotalCartAmmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }

        }
        return totalAmount;
    }
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }
    const fetchMenuList = async () => {
        const responseCat = await axios.get(url + "/api/food/fetch-category");
        setMenuList(responseCat.data.data)
    }
    const loadCartData = async (token)=>{
        const response = await axios.post(url + "/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData);
    }
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchMenuList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])
    const contextValue = {
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmmount,
        url,
        token,
        setToken,
        menu_list,
        setMenuList
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContexProvider;