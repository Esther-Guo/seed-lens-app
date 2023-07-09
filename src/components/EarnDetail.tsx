import { useSetAtom } from "jotai";
import Image from "next/image";
import { showEarnDetailAtom } from "~/config/atom";

const EarnDetail: React.FC = () => {
    const setShowEarnDetail = useSetAtom(showEarnDetailAtom);
    const tableContent = Array.from({length: 10}, (_, index) => index+1).map(
        (item, i) => 
        ( <tr key={i} className="border border-y-primary border-x-0">
            <td>Winter Fairy</td>
            <td>25 Jun 2023 - 05:15</td>
            <td>-12</td>
            <td>-12</td>
            <td>-12</td>
            <td>10300</td>
        </tr>)
    )

    const handleCloseButtonClick = () => {
        setShowEarnDetail(false);
    };

    return (
        <div className="flex h-3/4 w-1/2 flex-col items-center rounded-[54px] border-2 border-primary bg-black p-4 z-10 font-second overflow-auto">
            <div className="self-end">
                <button onClick={handleCloseButtonClick}>
                  <Image
                    src="/close.png"
                    alt="close button"
                    width={40}
                    height={40}
                  />
                </button>
            </div>
            <div className="text-primary text-3xl mb-4">History</div>
            <div className="text-light">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="border border-y-primary border-x-transparent">
                            <th>Post</th>
                            <th>Time</th>
                            <th>Sun</th>
                            <th>Water</th>
                            <th>Soil</th>
                            <th>+Metic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default EarnDetail;