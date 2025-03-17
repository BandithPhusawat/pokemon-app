import clsx from "clsx";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { useCartStore } from "../store/useCartStore";

type Props = {
  handleSearch: (textSearch: string) => void;
  handleType: (type: string) => void;
};

export default function SearchBox({ handleSearch, handleType }: Props) {
  const { cartItems } = useCartStore();
  const [searchValue, setSearchValue] = useState("");
  const { toggleCart } = useCartStore();

  return (
    <div className="w-full h-[72px] border-b border-[#393C49]  text-white">
      <div className="flex justify-between">
        <div className="text-[26px]">Pokemon market</div>
        <div className="flex gap-4">
          <div className="relative w-[174px] hidden lg:block">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Name"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearch(searchValue);
                handleType("name");
              }}
              className={clsx(
                "w-full h-12 border border-[#393C49] rounded-lg p-3.5 pl-10 text-[#ABBBC2]",
                "placeholder-[#ABBBC2] focus:outline-none focus:ring-0 focus:border-[#393C49]",
                searchValue ? "truncate line-clamp-1" : "whitespace-normal"
              )}
            />
          </div>
          <div
            className="w-12 h-12 bg-[#EA7C69] rounded-lg flex justify-center items-center p-4 cursor-pointer relative"
            onClick={toggleCart}
          >
            <LuShoppingBag />
            {cartItems.length > 0 && (
              <div className="bg-white/30 w-12 h-12 rounded-lg absolute blur-lg z-0"></div>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full py-6 border-b border-white/10 lg:hidden block">
        <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by Name"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearch(searchValue);
            handleType("name");
          }}
          className={clsx(
            "w-full h-12 border border-[#393C49] rounded-lg p-3.5 pl-10 text-[#ABBBC2]",
            "placeholder-[#ABBBC2] focus:outline-none focus:ring-0 focus:border-[#393C49]",
            searchValue ? "truncate line-clamp-1" : "whitespace-normal"
          )}
        />
      </div>
    </div>
  );
}
