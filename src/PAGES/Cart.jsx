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
            {cartItems.map((item) => {
              if (!item.productId) return null

              const productId = item.productId?._id || item.productId

              return (
                <div
                  className="cart-item"
                  key={productId}
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                  />

                  <div className="cart-info">
                    <h2>{item.productId.name}</h2>
                    <p>{item.productId.description}</p>
                    <h3>N{item.productId.price}</h3>

                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          updateQuantity(productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(productId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="cart-summary">
            <h2 style={{ color: 'green' }}>Total: N{totalPrice.toFixed(2)}</h2>

            <div className="cart-buttons">
              <button
                onClick={clearCart}
                style={{
                  padding: '10px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px'
                }}
              >
                Clear Cart
              </button>

              <Link to="/checkout">
                <button
                  style={{
                    padding: '10px',
                    background: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px'
                  }}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
