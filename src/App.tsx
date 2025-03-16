import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Content from "./components/Content";
import SearchBox from "./components/SearchBox";

function App() {
  const [keySearch, setKeySearch] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [searchBYName, setSearchByName] = useState<string>("");

  useEffect(() => {
    if (keySearch) console.log("key : ", keySearch);
  }, [keySearch]);

  return (
    <div className="w-full min-h-screen bg-[#252836] flex justify-center items-center">
      <div className="w-full max-w-[1194px] min-h-[900px] p-6 space-y-6">
        <SearchBox handleSearch={setSearchByName} handleType={setSearchType} />
        <SearchBar handleSearch={setKeySearch} handleType={setSearchType} />
        <Content
          keySearch={keySearch}
          keyType={searchType}
          keyByName={searchBYName}
        />
      </div>
    </div>
  );
}

export default App;
