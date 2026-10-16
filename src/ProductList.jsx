import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599593971489-244e45c4794e?w=300", cost: "$15", description: "Produces oxygen at night." },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-34301d3a4369?w=300", cost: "$12", description: "Great for filtering air toxins." },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593482892542-a6d15a978f65?w=300", cost: "$18", description: "Improves indoor air quality." },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", cost: "$14", description: "Adds lush tropical feel." },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", cost: "$20", description: "Sturdy plant with shiny leaves." },
        { name: "Bamboo Palm", image: "https://images.unsplash.com/photo-1615892606261-55ac11d37b7d?w=300", cost: "$25", description: "Excellent natural humidifier." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", cost: "$10", description: "Calming floral fragrance." },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592722928811-b1e367468169?w=300", cost: "$14", description: "Sweet nighttime aroma." },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300", cost: "$9", description: "Herbal and woody scent." },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d6d6d67a18e?w=300", cost: "$8", description: "Refreshing and fast-growing." },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300", cost: "$11", description: "Citrusy aroma for tea." },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", cost: "$22", description: "Clearing medicinal scent." }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Marigold", image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300", cost: "$7", description: "Naturally repels garden pests." },
        { name: "Citronella Grass", image: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=300", cost: "$13", description: "Keeps mosquitoes away." },
        { name: "Basil", image: "https://images.unsplash.com/photo-1618375531395-84061d7fb8bb?w=300", cost: "$8", description: "Culinary herb that repels flies." },
        { name: "Catnip", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300", cost: "$9", description: "Deters pests effectively." },
        { name: "Geraniums", image: "https://images.unsplash.com/photo-1565011522340-d29bcf87c7e6?w=300", cost: "$12", description: "Vibrant flowers with mosquito repellent properties." },
        { name: "Flossflower", image: "https://images.unsplash.com/photo-1526888494970-1372c6baf90b?w=300", cost: "$15", description: "Pretty blooms keeping bugs away." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo" onClick={() => setShowCart(false)}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)}>Home</span>
          <span onClick={() => setShowCart(false)}>Plants</span>
          <span onClick={() => setShowCart(true)}>
            🛒 Cart ({totalCartCount})
          </span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="price">{plant.cost}</p>
                    <p>{plant.description}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
