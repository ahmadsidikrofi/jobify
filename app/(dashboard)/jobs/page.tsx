import JobList from "@/components/JobList";
import SearchForm from "@/components/SearchForm";
import { GetAllJobsAction } from "@/utils/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const JobsPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['jobs', '', 'all', 1],
        queryFn: () => GetAllJobsAction({
            
        })
    })
    return ( 
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SearchForm />
            <JobList />
        </HydrationBoundary>
     );
}
 
export default JobsPage;