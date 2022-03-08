const Hero = ({ restaurant }) => {
  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <img style={{ height: 100 }} src={restaurant.picture} alt="" />
    </div>
  );
};

export default Hero;
