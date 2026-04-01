import React, { useContext } from 'react'
import { CartContext } from '../CONTEXT/CartContext'
import { Link } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    clearCart
  } = useContext(CartContext)

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/shop">Go Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h2>{item.name}</h2>
                  <p>{item.discription}</p>
                  <h3>${item.price}</h3>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

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