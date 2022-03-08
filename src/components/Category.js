const Category = ({ category, addToCart }) => {
  return (
    <div>
      <h2>{category.name}</h2>
      <div style={{ display: "flex", flexwrap: "wrap" }}>
        {category.meal.map((meal, index) => {
          return (
            <div
              key={meal.id}
              onClick={() => {
                addToCart(meal);
              }}
              className="card"
            >
              <h3>{meal.title}</h3>
              <p>{meal.description.slice(0, 50)}...</p>
              {meal.picture && (
                <img style={{ height: 100 }} src={meal.picture} alt=""></img>
              )}
              <span>{meal.price} €</span>
              {meal.popular && <span>★ Populaire</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
