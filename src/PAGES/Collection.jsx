import React from 'react'
import { Link } from 'react-router-dom'
import '../STYLES/Collection.css'

const collections = [
  { id: "01", tag: "Signature", title: "Maison Vianney", sub: "The Signature Collection", desc: "Where heritage meets modernity. Our flagship line — timeless silhouettes reimagined for the contemporary wardrobe.", featured: true },
  { id: "02", tag: "Men", title: "Noir Élite", sub: "Men's Luxury", desc: "Sharp. Commanding. Unapologetic." },
  { id: "03", tag: "Women", title: "Velvet Empire", sub: "Women's Luxury", desc: "Soft power. Quiet opulence." },
  { id: "04", tag: "Formal", title: "The Crown Edit", sub: "Premium Formals", desc: "Dressed for every throne room." },
  { id: "05", tag: "Street", title: "Obsidian", sub: "Street & Urban", desc: "Raw edge. Refined finish." },
  { id: "06", tag: "Family", title: "L'Or Blanc", sub: "Kids & Family", desc: "Pure. Playful. Precious." },
]

const Collection = () => {
  return (
    <div className="col-page">
      <div className="col-hero">
        <p className="col-hero-tag">VFashionHome — Curated Collections</p>
        <h1>The Art of <span>Refined</span> Style</h1>
        <p>Six exclusive collections. Each one a world of its own — crafted for those who wear their identity with intention.</p>
      </div>

      <div className="col-divider">
        <div className="col-divider-line"></div>
        <span className="col-divider-text">Our Collections</span>
        <div className="col-divider-line"></div>
      </div>

      <div className="col-grid">
        {collections.map((col) => (
          <div className={`col-card ${col.featured ? "featured" : ""}`} key={col.id}>
            <div>
              <p className="col-card-num">{col.id} — {col.tag}</p>
              <h2 className="col-card-title">{col.title}</h2>
              <p className="col-card-sub">{col.sub}</p>
              <p className="col-card-desc">{col.desc}</p>
            </div>
            <div className="col-card-arrow">→</div>
          </div>
        ))}
      </div>

      <div className="col-banner">
        <div className="col-banner-left">
          <h2>New season. New story.</h2>
          <p>Each collection drops seasonally. Sign up to be the first to access exclusive pieces before they go public.</p>
        </div>
        <Link to="/customer/shop">
          <button className="col-banner-btn">Shop All Collections</button>
        </Link>
      </div>
    </div>
  )
}

export default Collection