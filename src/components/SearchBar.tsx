import { useEffect, useState } from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { getRarity, getSets, getTypes } from "../api/pokemonAPI";
import DropdownSelect from "../Utils/DropdownSelect";
import clsx from "clsx";
import { SetType } from "../types/SetsType";

type Props = {
  handleSearch: (keySearch: string) => void;
  handleType: (type: string) => void;
};

export default function SearchBar({ handleSearch, handleType }: Props) {
  const [isSetSelector, setIsSetSelector] = useState<boolean>(false);
  const [isRaritySelector, setIsRaritySelector] = useState<boolean>(false);
  const [isTypeSelector, setIsTypeSelector] = useState<boolean>(false);
  const [dataTypes, setDataTypes] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [dataRarity, setDataRarity] = useState([]);

  useEffect(() => {
    getSetsData();
    getRarityData();
    getTypeData();
  }, []);

  const getSetsData = async () => {
    try {
      const response = await getSets();
      if (response?.status === 200 && Array.isArray(response?.data?.data)) {
        const namesList = response.data.data.map((set: SetType) => set?.name);
        setDataSets(namesList);
      }
    } catch (error) {
      console.error("Error fetching sets", error);
    }
  };

  const getRarityData = async () => {
    try {
      const response = await getRarity();
      if (response?.status === 200 && Array.isArray(response?.data?.data)) {
        setDataRarity(response.data.data);
      } else {
        console.error("Invalid data format:", response?.data);
        setDataTypes([]);
      }
    } catch (error) {
      console.error("Error fetching Rarity:", error);
      setDataTypes([]);
    }
  };

  const getTypeData = async () => {
    try {
      const response = await getTypes();
      if (response?.status === 200 && Array.isArray(response?.data?.data)) {
        setDataTypes(response.data.data);
      } else {
        console.error("Invalid data format:", response?.data);
        setDataTypes([]);
      }
    } catch (error) {
      console.error("Error fetching types:", error);
      setDataTypes([]);
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-9 text-white">
      <div className="text-lg">Choose Card</div>
      <div className="flex justify-between items-center gap-4">
        <div
          className="flex gap-1 justify-center items-center bg-[#1F1D2B] rounded-lg border border-[#393C49] px-4 py-2 cursor-pointer relative"
          onClick={() => {
            setIsSetSelector(!isSetSelector);
            setIsRaritySelector(false);
            setIsTypeSelector(false);
          }}
        >
          Set
          <RiArrowDownWideLine
            className={clsx(
              isSetSelector ? "rotate-180" : "rotate-0",
              "duration-200 transition-all"
            )}
          />
          {isSetSelector && (
            <DropdownSelect
              data={dataSets}
              handleSelectKey={handleSearch}
              handleType={handleType}
              keyType="set"
            />
          )}
        </div>
        <div
          className="flex gap-1 justify-center items-center bg-[#1F1D2B] rounded-lg border border-[#393C49] px-4 py-2 cursor-pointer relative"
          onClick={() => {
            setIsRaritySelector(!isRaritySelector);
            setIsSetSelector(false);
            setIsTypeSelector(false);
          }}
        >
          Rarity
          <RiArrowDownWideLine
            className={clsx(
              isRaritySelector ? "rotate-180" : "rotate-0",
              "duration-200 transition-all"
            )}
          />
          {isRaritySelector && (
            <DropdownSelect
              data={dataRarity}
              handleSelectKey={handleSearch}
              handleType={handleType}
              keyType="rarity"
            />
          )}
        </div>
        <div
          className="flex gap-1 justify-center items-center bg-[#1F1D2B] rounded-lg border border-[#393C49] px-4 py-2 cursor-pointer relative"
          onClick={() => {
            setIsTypeSelector(!isTypeSelector);
            setIsSetSelector(false);
            setIsRaritySelector(false);
          }}
        >
          Type
          <RiArrowDownWideLine
            className={clsx(
              isTypeSelector ? "rotate-180" : "rotate-0",
              "duration-200 transition-all"
            )}
          />
          {isTypeSelector && dataTypes && (
            <DropdownSelect
              data={dataTypes}
              handleSelectKey={handleSearch}
              handleType={handleType}
              keyType="type"
            />
          )}
        </div>
      </div>
    </div>
  );
}
