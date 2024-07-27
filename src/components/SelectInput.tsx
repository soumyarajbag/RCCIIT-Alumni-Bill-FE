import React from "react";

const SelectInput = ({
  options,
  onChange,
  id,
  name,
  value,
  width,
}: {
  options: any;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
}) => {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2 relative">
      <label htmlFor="event" className="font-semibold text-sm md:text-xl ">
        {name} :
      </label>
      <select
        name={id}
        id={id}
        className={`py-2 px-4 w-[${
          width ? width : "100%"
        }] rounded-xl border bg-transparent border-regalia text-regalia active:border-regalia  focus:border-regalia font-semibold`}
        onChange={onChange}
      >
        <option id={id} value=""></option>
        {options && options.map((option: any, index: number) => {
          return (
            <option key={index} value={option} className="text-black">
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;