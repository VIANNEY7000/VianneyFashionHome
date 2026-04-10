import React, { useContext } from 'react'
import { CartContext } from '../CONTEXT/CartContext'
import { Link } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    totalPrice,
    clearCart
  } = useContext(CartContext)

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/customer/shop">Go Shopping</Link>
        </div>
      ) : (
        <>
         {cartItems.map((item) => (
          <div className="cart-item" key={item.productId._id}>
            <img src={item.productId.image} alt="" />

            <div className="cart-info">
              <h2>{item.productId.name}</h2>
              <p>{item.productId.discription}</p>
              <h3>₦{item.productId.price}</h3>

              <p>Qty: {item.quantity}</p>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.productId._id)}
              >
                Remove
              </button>
            </div>
          </div>

            ))}


          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>

            <div className="cart-buttons">
              <div>
                <button onClick={clearCart}>Clear Cart</button>
              </div>
               <div>
              <Link to="/checkout">
                <button>Proceed to Checkout</button>
              </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart