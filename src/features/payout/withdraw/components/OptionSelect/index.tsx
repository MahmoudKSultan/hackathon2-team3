export function OptionSelect(selected: any) {
    const { dateWork, commission, address, addressDes } = selected.selected;

    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <span
                    className={`block truncate text-[#9E9E9E] text-[8px] ${selected ? 'font-medium' : 'font-normal'
                        }`}
                >
                    {dateWork}
                </span>
                <span
                    className={`block truncate text-[#9E9E9E] text-[11px] ${selected ? 'font-medium' : 'font-normal'
                        }`}
                >
                    {commission}
                </span>
            </div>

            <div className="flex flex-col text-right mr-4">
                <span
                    className={`block truncate text-black text-[16px] ${selected ? 'font-bold' : 'font-bold'
                        }`}
                >
                    {address}
                </span>
                <span
                    className={`block truncate text-[#9E9E9E] text-[12px] ${selected ? 'font-medium' : 'font-normal'
                        }`}
                >
                    {addressDes}
                </span>
            </div>
        </div>
    )
}

export default OptionSelect;