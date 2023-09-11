import './beerCard.css';
const BeerCard = ({ beerData }) => {
  return (
    <div className="card">
      <div className="card_title">{beerData.name}</div>
      <div className="card_body">
        {beerData.tagline}
        <div className="card_image"><img src={beerData.image_url}></img></div>
      </div>
    </div>
  )
};

export default BeerCard;