import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAtom } from "jotai";
import { showEarnDetailAtom } from "~/config/atom";
import EarnDetail from "~/components/EarnDetail";

// import Navi from "~/components/Navi";

const EarnPage: NextPage = () => {
    const router = useRouter();
    const uid = router.query;
    
    const [showEarnDetail, setShowEarnDetail] = useAtom(showEarnDetailAtom)

    const tableContent = Array.from({length: 10}, (_, index) => index+1).map(
        (item, i) => 
        ( <tr key={i} className="border border-y-primary border-x-0">
            <td>Winter Fairy</td>
            <td>10300</td>
            <td>10300</td>
            <td>10300</td>
            <td>10300</td>
            <td>10300</td>
            <td>10300</td>
            <td>10300</td>
        </tr>)
    )

    const handleOpenHistory = () => {
        setShowEarnDetail(true);
        console.log("open history")
    }

    return (
        <div>
            {/* background img */}
            <div className="z-1 absolute left-0 top-0">
                <Image
                src={"/user/bg.png"}
                alt="earn page background"
                width={1920}
                height={1080}
                />
            </div>
            {/* <Navi></Navi> */}
            <div className="flex text-light mx-4">
                {/* profile info */}
                <div className="w-1/4 bg-black border-2 border-primary rounded-lg z-10 mx-2 flex flex-col px-6 py-10">
                    <div className="flex items-start justify-between">
                        <Image
                        src={"/user/avatar.png"}
                        alt="user avatar"
                        width={200}
                        height={200}
                        />
                        <button className="text-primary border-2 rounded-md border-primary font-second text-sm p-2">EDIT</button>
                    </div>
                    <div className="my-5">
                        <div className="text-primary font-second text-3xl">EMORY</div>
                        <div className="text-sm mb-4">@pfp-daolover</div>
                        <div>Lorem ipsum dolor sit amet consectetur. Quam dolor elit risus mauris. Tristique </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="text-primary font-second text-3xl">31</div>
                            <div className="text-sm">Seeds</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-primary font-second text-3xl">999+</div>
                            <div className="text-sm">Likes</div>
                            
                        </div>
                        <div className="flex flex-col">
                            <div className="text-primary font-second text-3xl">$999+</div>
                            <div className="text-sm">Earn</div>
                        </div>
                    </div>
                </div>
                {/* earn detail */}
                <div className="w-3/4 bg-black border-2 border-primary rounded-md z-10 mx-2 font-second px-6 py-8">
                    <div className="flex justify-between">
                        <div className="text-primary text-3xl">MY EARN</div>
                        <div>
                            <span>TOTAL 30 days: </span>
                            <span className="text-primary">2,222,222 </span>
                            <span>TOTAL Earning: </span>
                            <span className="text-primary">2,222,222 </span>
                            <button className="bg-primary text-black px-4 py-2 rounded" onClick={handleOpenHistory}>HISTORY</button>
                        </div>
                    </div>
                    <div>
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="border border-y-primary border-x-transparent">
                                    <th>Post</th>
                                    <th>Branch Post</th>
                                    <th>Direct Fork</th>
                                    <th>30 days earning</th>
                                    <th>Historical earning</th>
                                    <th>Sun</th>
                                    <th>Water</th>
                                    <th>Soil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableContent}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showEarnDetail && (
            <div
            className={
                showEarnDetail
                ? "fixed inset-0 z-50 flex items-center justify-around bg-black/[.5]"
                : ""
            }
            >
                <EarnDetail />
            </div>)}
        </div>
    )
}

export default EarnPage;