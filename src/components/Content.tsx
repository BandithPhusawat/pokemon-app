import { useEffect, useState } from "react";
import Card from "../Utils/Card";
import { GetCards } from "../api/pokemonAPI";
import { CardType } from "../types/CardType";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  keySearch: string;
  keyType: string;
  keyByName: string;
};

export default function Content({ keySearch, keyType, keyByName }: Props) {
  const [cardList, setCardList] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const cardsPerPage = 20;

  useEffect(() => {
    // reload data when new keySearch
    if (keySearch || keyType !== "") {
      setPage(1);
      getCardList(1, true); // load new data
    } else {
      getCardList(page, false);
    }
  }, [page, keySearch, keyType]);

  const getCardList = async (currentPage: number, reset: boolean) => {
    setLoading(true);
    try {
      const response = await GetCards();
      if (response?.status === 200 && Array.isArray(response?.data?.data)) {
        const allData = response.data.data;
        if (reset) {
          setCardList(allData); // new load every time to search
        } else {
          const newData = allData.slice(
            (currentPage - 1) * cardsPerPage,
            currentPage * cardsPerPage
          );
          setCardList((prev) => [...prev, ...newData]);
        }
      } else {
        console.error("Invalid data format:", response?.data);
      }
    } catch (error) {
      console.error("Error fetching Rarity:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCards = cardList.filter((card) => {
    switch (keyType) {
      case "type":
        return card.types?.includes(keySearch);

      case "rarity":
        return card.rarity?.includes(keySearch);

      case "set":
        return card?.set?.name === keySearch;

      case "name":
        return card?.name?.toLowerCase().includes(keyByName.toLowerCase());

      default:
        return true;
    }
  });
  const loadMoreCards = () => {
    if (!loading && keySearch === "") {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-[900px] overflow-x-auto scrollbar-hidden text-white flex flex-col items-center">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <Card key={`${card.id}-${index}`} card={card} />
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center col-span-full mt-20">
            <AiOutlineLoading3Quarters className="animate-spin duration-500 transition-all scale-200" />
          </div>
        )}
      </div>

      {/* Load More (hidden if search by logic) */}
      {loading ? (
        <div className="mt-20 flex items-center">
          <span className="ml-2 text-sm text-[#ABBBC2]">Loading...</span>
        </div>
      ) : (
        keySearch === "" &&
        page * cardsPerPage < cardList.length && (
          <button
            onClick={loadMoreCards}
            className="mt-6 px-6 py-2 bg-[#EA7C69] hover:opacity-80 text-white rounded-lg text-sm transition cursor-pointer"
          >
            Load More
          </button>
        )
      )}
    </div>
  );
}
