import { BsDot } from "react-icons/bs";
import { RiShoppingBag3Line } from "react-icons/ri";
import { CardType } from "../types/CardType";
import { useCartStore } from "../store/useCartStore";

type Props = {
  card: CardType;
};

export default function Card({ card }: Props) {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      id: card?.id,
      name: card?.name,
      price: card?.cardmarket?.prices?.averageSellPrice || 0,
      quantity: 1,
      image: card?.images?.small,
    });
  };

  return (
    <div className="relative flex items-center justify-center w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
      <div className="bg-[#1F1D2B] w-full h-auto rounded-2xl p-4 relative text-white">
        {/* Card Image */}
        <div className="flex justify-center">
          <img
            alt="pokemon"
            src={card?.images?.large}
            className="w-24 h-32 object-contain"
          />
        </div>

        {/* Card detail */}
        <div className="text-center">
          <p className="text-sm font-semibold truncate py-4">{card?.name}</p>
          <div className="flex justify-center items-center text-xs text-[#ABBBC2] my-1">
            ${card?.cardmarket?.prices?.averageSellPrice}
            <BsDot className="text-white/5" />
            {card.set.total} Cards
          </div>
        </div>

        {/* Add Card to Cart */}
        <button
          className="mt-3 w-full bg-white/10 hover:bg-white/5 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
          onClick={handleAddToCart}
        >
          <RiShoppingBag3Line />
          Add to cart
        </button>
      </div>
    </div>
  );
}
