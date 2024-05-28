import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {

    const {menu_list, url} = useContext(StoreContext);
    
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our Menu</h1>
            <p className="exlore-menu-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptas nesciunt vel nobis aspernatur corrupti? Ex nisi accusantium ipsa totam tenetur cupiditate repellendus, at architecto, quibusdam nemo atque sed iusto.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => { setCategory(prev => prev === item.category ? "All" : item.category) }} key={index} className='explore-menu-list-item'>
                            <img className={category === item.category ? "active" : ""} src={url+ "/images/"+  item.image} alt="" />
                            <p>{item.category}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu
