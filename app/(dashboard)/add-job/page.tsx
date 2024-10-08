import CreateJobForm from "@/components/CreateJobForm";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query"

const AddJobPage = () => {
    // const queryClient = new QueryClient()
    return ( 
        <CreateJobForm />
        // <HydrationBoundary state={dehydrate(queryClient)}>
        // </HydrationBoundary>
    );
}
 
export default AddJobPage;