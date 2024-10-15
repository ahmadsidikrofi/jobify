import { CountStatsAction, GetChartsDataAction } from "@/utils/actions";

const StatsPage = async () => {
    const countStats = await CountStatsAction()
    const charts = await GetChartsDataAction()
    console.log(charts);
    
    return ( 
        <main>
            <div>
                <p className="text-5xl">Status Page</p>
            </div>
        </main>
    );
}
 
export default StatsPage;