import Link from "next/link";
import { useAtom } from "jotai";
import { langAtom } from "~/config/atom";

interface InfoCardProps {
    handleCloseInfoClick: () => void;
  }

const InfoCard: React.FC<InfoCardProps> = ({handleCloseInfoClick}) => {
    const [lang, setLang] = useAtom(langAtom);

    const handleSwitchLang = () => {
        lang == "EN"? setLang("中文"):setLang("EN");
    }

    return (
        <div className="bg-black p-4 opacity-100 w-1/4 border-primary border-2 rounded-lg flex flex-col">
            <button className="bg-primary p-1 rounded self-end font-second text-sm" onClick={handleSwitchLang}>{lang}</button>
            {lang == "中文"? 
            (<><p className="text-white">
            Every time you create a Fork, it costs $2.8 USDC to purchase this &ldquo;money-making machine.&rdquo; Under specific conditions, a single $2.8 USDC payment can trigger every post of the source inspiration to each earn $2.8 USDC. Yes, one expenditure of $2.8 USDC has the potential to trigger countless $2.8 USDC earnings.
            </p>
            <br />
            <p className="text-white">
            The specific condition is that the rewards a post can generate is limited to all the earnings associated with its third-largest Branch. To explain this in a gamified way:
            <ul>
                <li>- Forks’ branches contribute points to your post. </li>
                <li>- Each Branch from a direct Fork is scored separately. </li>
            </ul>
            </p>
            <p className="text-white">
            The branches with the most, second most, and third most Forks contribute points known as Sun, Water, and Soil respectively. 

            </p>
            <p className="text-white">
            Each time the author makes a post, Sun + Water + Soil are consumed, and the author can claim $USDC earnings which are transferred to their wallet.
            </p>
            <br />
            <p className="text-white">
            Consume 1Sun + 1Water + 1Soil = Rewards $1USDC
            </p>
            <Link className="text-second underline" target="_blank" href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents/creator-economic">Find out more</Link></>)
            :
            (<>
            <p className="text-white">
            每次分叉Fork都需要支付$2.8USDC来购买这个产生收益的“矿机”。在特定条件下，一次$2.8USDC会触发灵感来源的每个帖子都分别获得$2.8USDC。是的，一个$2.8USDC的支出可以触发无数个$2.8USDC的收益。
            </p>
            <br />
            <p className="text-white">
            特定条件是，帖子可获得的收益仅限于第三大树枝Branch关联的所有收益。用游戏化的方式说明：
            <ul>
                <li>- 分叉Fork的树枝为你的帖子提供积分 </li>
                <li>- 每一个直接分叉Fork出来的树枝Branch独立计算积分 </li>
            </ul>
            </p>
            <p className="text-white">
            分叉最多，第二多，第三多的树枝提供的积分叫太阳Sun，雨水Water，土壤Soil
            </p>
            <p className="text-white">
            作者每次发帖触发，消耗阳光+雨水+土壤，获得$USDC收益提现Claim转入钱包
            </p>
            <br />
            <p className="text-white">
            消耗 1阳光 + 1雨水 + 1土壤 = 获得$1USDC
            </p>
            <Link className="text-second underline" target="_blank" href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents/creator-economic">了解更多</Link>
            </>)
        }
            
            <button className="bg-primary p-2 rounded-lg self-end font-second" onClick={handleCloseInfoClick}>I GET IT</button>
        </div>
    )
}

export default InfoCard;