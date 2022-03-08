import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Category from "./components/Category";
import Hero from "./components/Hero";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  let subTotal = 0;

  cart.forEach((cartItem) => {
    console.log(cartItem);
    subTotal = subTotal + Number(cartItem.price) * cartItem.quantity;
  });

  let total = subTotal + 2.5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroobackendrevisions.herokuapp.com/"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addToCart = (meal) => {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem.id === meal.id);

    if (exist) {
      exist.quantity++;
    } else {
      meal.quantity = 1;
      newCart.push(meal);
    }
    setCart(newCart);
  };

  const substractFromCart = (meal) => {
    const newCart = [...cart];
    // On cherche dans newCart l'objet pour lequel on veut décrémenter la quantité
    const exist = newCart.find((elem) => elem.id === meal.id);
    if (exist.quantity === 1) {
      // supprimer l'élément du tableau
      // trouver l'index de l'élément à supprimer
      const index = newCart.indexOf(exist);
      newCart.splice(index, 1);
    } else {
      exist.quantity--;
    }

    setCart(newCart);
  };

  return isLoading ? (
    <div> En cours de chargement...</div>
  ) : (
    <div>
      <div className="Header">
        <header>
          <div className="Image">
            <img
              style={{ width: 200, height: 60 }}
              src="https://upload.wikimedia.org/wikipedia/fr/f/f7/Deliveroo_logo.svg"
              alt=""
            ></img>
          </div>
          <div className="Main">
            <div className="Left">
              <h1>Le pain Quotidien - Montorgueil</h1>
              <p>
                Profitez de chaque plaisir de la vie quotidienne. Le Pain
                Quotidien propose des ingrédients simples et sains, du bon pain,
                des fruits et des légumes frais et de saison issus de
                l’agriculture biologique.
              </p>
            </div>
            <div className="Right"></div>
            <img
              style={{ width: 350, height: 180, borderRadius: 10 }}
              src="https://f.roocdn.com/images/menus/17697/header-image.jpg"
              alt=""
            ></img>
          </div>
        </header>
      </div>
      <div>
        <Hero restaurant={data.restaurant} />

        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {data.categories.map((category, index) => {
              return (
                category.meals.length > 0 && (
                  <Category
                    addToCart={addToCart}
                    key={index}
                    category={category}
                  />
                )
              );
            })}
          </div>
          <div className="cart">
            {cart.map((elem, index) => {
              return (
                <>
                  <div key={elem.id} style={{ display: "flex" }}>
                    <div>
                      <button onClick={() => substractFromCart(elem)}>-</button>
                      <span>{elem.quantity}</span>
                      <button onClick={() => addToCart(elem)}>+</button>
                    </div>
                    <span> {elem.title}</span>
                    <span> {Number(elem.price) * elem.quantity}</span>
                  </div>
                </>
              );
            })}
            <div>
              <p>Sous-total : {subTotal.toFixed(2)} €</p>
              <p>Frais de livraison : 2.50€</p>
              <p>Total : {total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
