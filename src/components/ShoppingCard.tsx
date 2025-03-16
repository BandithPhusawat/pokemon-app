import { useCartStore } from "../store/useCartStore";

export default function ShoppingCard() {
  const { isCartOpen, closeCart } = useCartStore();

  return (
    <div
      className={`absolute z-[999] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } flex justify-end`}
      onClick={closeCart}
    >
      <div
        className={`bg-white w-80 h-full p-6 shadow-lg transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">ตะกร้าสินค้า</h2>
        <button
          onClick={closeCart}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          ปิดตะกร้า
        </button>
      </div>
    </div>
  );
}
