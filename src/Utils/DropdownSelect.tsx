import clsx from "clsx";

type Props = {
  data: string[];
  handleSelectKey: (keySearch: string) => void;
  handleType: (keyType: string) => void;
  keyType: string;
};

export default function DropdownSelect({
  data,
  handleSelectKey,
  handleType,
  keyType,
}: Props) {
  return (
    <div
      className={clsx(
        data && "min-h-[180px]",
        "min-w-[155px] h-full  w-full absolute top-[110%] right-0 bg-[#1F1D2B] border border-[#252836] rounded-lg overflow-auto scrollbar-hidden  text-white z-[999]"
      )}
    >
      {data?.length > 0 ? (
        data.map((d: string, i: number) => (
          <p
            key={i}
            className={clsx(
              "h-9 hover:bg-[#252836] py-2 px-4 border-t border-r border-l border-[#393C49] text-nowrap text-sm w-full truncate"
            )}
            onClick={() => {
              handleSelectKey(d);
              handleType(keyType);
            }}
          >
            {d}
          </p>
        ))
      ) : (
        <p className="px-2  text-center w-full h-full flex justify-center items-center">
          No data available
        </p>
      )}
    </div>
  );
}
