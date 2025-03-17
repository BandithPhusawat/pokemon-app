import { useCartStore, CartItem as CartItemType } from "../store/useCartStore";

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  const { removeFromCart, addToCart } = useCartStore();

  return (
    <div className="w-full h-auto">
      <div className="w-full h-[60px] flex items-center justify-start gap-4">
        <div className="w-11 flex justify-center items-center h-full">
          <img alt={item.name} src={item.image} className="w-11 h-[60px]" />
        </div>
        <div className="w-full h-full">
          <div>
            <div className="flex justify-between items-start">
              <p>{item.name}</p>
              <p>$ {item.price.toFixed(2)}</p>
            </div>
            <p>$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[54px] gap-2 flex justify-between items-center pt-2.5">
        <div
          className="w-[54px] h-[54px] rounded-lg bg-white/10 flex justify-center items-center cursor-pointer hover:bg-white/5"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </div>
        <div className="w-[219px] h-[54px] text-center rounded-lg bg-white/10 flex justify-center items-center">
          {item.quantity}
        </div>
        <div
          className="w-[54px] h-[54px] rounded-lg bg-white/10 flex justify-center items-center cursor-pointer hover:bg-white/5"
          onClick={() => addToCart({ ...item, quantity: 1 })}
        >
          +
        </div>
      </div>
    </div>
  );
}
