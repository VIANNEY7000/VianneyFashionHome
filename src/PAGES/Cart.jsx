import React, { useContext } from 'react'
import { CartContext } from '../CONTEXT/CartContext'
import { Link } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    totalPrice,
    updateQuantity
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
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.productId?._id || item.productId}>
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                />

                <div className="cart-info">
                  <h2>{item.productId.name}</h2>
                  <p>{item.productId.discription}</p>
                  <h3>₦{item.productId.price}</h3>

                  {/* ✅ QUANTITY CONTROLS */}
                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* ✅ REMOVE BUTTON */}
                  <button
                    className="remove-btn"
                  onClick={() => {
                    console.log("CLICKED", item.productId?._id);
                    removeFromCart(item.productId?._id);
                  }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ SUMMARY */}
          <div className="cart-summary">
            <h2 style={{color:'green'}}>Total: ₦{totalPrice.toFixed(2)}</h2>

            <div className="cart-buttons">
              <button onClick={clearCart}
              style={{
                padding:'10px',
                background:'red',
                color:'white',
                border:'none',
                borderRadius:'10px'
              }}
              >
                Clear Cart
              </button>

              <Link to="/checkout">
                <button
                style={{
                  padding:'10px',
                  background:'green',
                  color:'white',
                  border:'none',
                  borderRadius:'10px'
                }}
                >Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart