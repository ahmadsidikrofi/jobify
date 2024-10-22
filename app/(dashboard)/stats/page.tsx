import ChartsJob from "@/components/ChartsJob";
import StatsJob from "@/components/StatsJob";
import { CountStatsAction, GetChartsDataAction } from "@/utils/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const StatsPage = async () => {
    const queryClient = new QueryClient()
    queryClient.prefetchQuery({
        queryKey: ['stats'],
        queryFn: () => CountStatsAction()
    })
    queryClient.prefetchQuery({
        queryKey: ['charts'],
        queryFn: () => GetChartsDataAction()
    })
    
    return ( 
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StatsJob />
            <ChartsJob />
        </HydrationBoundary>
    );
}
 
export default StatsPage;