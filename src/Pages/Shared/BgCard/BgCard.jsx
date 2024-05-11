import PropTypes from "prop-types";

const BgCard = ({ Card }) => {
  const { img, title, desc } = Card;
  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-lg shadow-lg">
      <img src={img} alt="img" className="w-full h-full " />
      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center bg-opacity-75 bg-black text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2">{desc}</p>
      </div>
    </div>
  );
};

BgCard.propTypes = {
  Card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default BgCard;
