import { IoCloseOutline } from "react-icons/io5";
import { useCartStore, CartItem as CartItemType } from "../store/useCartStore";

export default function Cart() {
  const { isCartOpen, closeCart, cartItems } = useCartStore();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`absolute z-[] inset-0 bg-white/45 bg-opacity-50 transition-opacity ${
        isCartOpen ? "opacity-100 visible" : "opacity-0 invisible min-h-screen"
      } flex justify-end`}
      onClick={closeCart}
    >
      <div
        className={`bg-[#1F1D2B] h-full p-6 shadow-lg transform transition-transform duration-300 lg:w-[396px] w-full  ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-14 flex justify-between border-white items-center">
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Card</h2>
            <p
              className="underline text-xs text-[#ABBBC2] cursor-pointer"
              onClick={() => {
                useCartStore.setState({ cartItems: [] });
              }}
            >
              Clear all
            </p>
          </div>
          <div>
            <button
              className="w-12 h-12 bg-[#EA7C69] rounded-lg flex justify-center items-center text-white cursor-pointer"
              onClick={closeCart}
            >
              <IoCloseOutline className="scale-[2]" />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-between items-center text-white pt-5 text-sm border-white/20 border-b pb-1">
          <div className="1/3 text-left">
            <p>Item Qty</p>
          </div>
          <div className="2/3 text-right">Price</div>
        </div>
        <div className="pt-[23px] w-full h-auto text-white items-center flex justify-center flex-col gap-5">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className="text-center text-white/10">No items in cart</p>
          )}
        </div>
        <div className="flex justify-between items-center py-6 gap-2">
          <div className="text-[#ABBBC2]">Total card amount</div>
          <div className="text-white">{cartItems.length}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#ABBBC2]">Total price</div>
          <div className="text-white">$ {totalPrice.toFixed(2)}</div>
        </div>
        <div className="pt-3.5">
          <button className="cursor-pointer bg-[#EA7C69] rounded-lg flex justify-center items-center text-white w-full h-12">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
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
};
