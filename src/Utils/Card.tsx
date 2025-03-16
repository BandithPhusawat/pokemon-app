import { BsDot } from "react-icons/bs";
import { RiShoppingBag3Line } from "react-icons/ri";
import { CardType } from "../types/CardType";

type Props = {
  card: CardType;
};

export default function Card({ card }: Props) {
  return (
    <div className="lg:w-[176px] lg:h-[280px] w-[336px] h-[140px] relative flex items-start justify-center">
      <div className="bg-[#1F1D2B] h-[178.42px] w-full absolute rounded-2xl bottom-0 z-0 text-white">
        <div className="w-[176px] h-[138px] absolute bottom-0 flex flex-col items-center p-4">
          <div className="text-xs text-center h-9">{card?.name}</div>
          <div className="flex justify-center items-center text-xs text-[#ABBBC2] pb-2">
            $ {card?.cardmarket?.prices?.averageSellPrice}
            <BsDot className="text-white/5" />
            {card.set.total} Cards
          </div>
          <div className="h-[38px] w-[144px] rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs flex justify-center items-center gap-2 cursor-pointer">
            <RiShoppingBag3Line />
            Add to cart
          </div>
        </div>
      </div>
      <img
        alt="pokemon"
        src={card?.images?.large}
        className="w-[102px] h-[137px] object-cover bg-center bg-contain absolute rounded-xs"
      />
    </div>
  );
}
