import JobList from "@/components/JobList";
import SearchForm from "@/components/SearchForm";
import { GetAllJobsAction } from "@/utils/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const JobsPage = async ({ searchParams }: { searchParams: { search?: string; 'job-status'?: string } }) => {
    const queryClient = new QueryClient();
    const search = searchParams.search || '';
    const jobStatus = searchParams['job-status'] || 'all';

    await queryClient.prefetchQuery({
        queryKey: ['jobs', search, jobStatus, 1],
        queryFn: () => GetAllJobsAction({ search, jobStatus })
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <SearchForm />
            <JobList />
        </HydrationBoundary>
    );
}

export default JobsPage;
