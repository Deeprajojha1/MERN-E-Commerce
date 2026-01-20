import Footer from '../Footer/Footer.jsx'
import { Link } from 'react-router-dom'
import './Home.css'
import Navbar from '../Navbar/Navbar'

const Home = () => (
    <>
        <Navbar />
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                    alt="dresses to be noticed"
                    className="home-mobile-img"
                />
                <p className="home-description">
                    Fashion is part of the daily air and it does not quite help that it changes all the time. Clothes have always been a marker of the era and we are in a revolution. Your fashion makes you seen and heard for who you truly are. So, celebrate the season’s new and exciting trends in your own way.

                    From everyday essentials to standout styles, discover clothing that blends comfort, confidence, and individuality. Express yourself through designs that speak your story and make every moment a statement.
                </p>
                <Link to="/showProducts"><button type="button" className="shop-now-button">
                    Shop Now
                </button></Link>
            </div>
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="dresses to be noticed"
                className="home-desktop-img"
            />
        </div>
        <Footer />
    </>
)

export default Home
