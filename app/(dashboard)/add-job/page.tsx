import CreateJobForm from "@/components/CreateJobForm";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query"

const AddJobPage =  async () => {
    const queryClient = new QueryClient()
    return ( 
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CreateJobForm />
        </HydrationBoundary>
    );
}
 
export default AddJobPage;