import EditJobForm from "@/components/EditJobForm";
import { GetSingleJobAction } from "@/utils/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const SingleJobPage = async ({ params }: { params: { id: string } }) => {
    const queryClient = new QueryClient()
    const { id } = params
    await queryClient.prefetchQuery({
        queryKey: ['jobs', params.id],
        queryFn: () => GetSingleJobAction(params.id)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditJobForm jobId={id} />
        </HydrationBoundary>
    );
}
 
export default SingleJobPage;