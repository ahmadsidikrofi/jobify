import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { DeleteJobAction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

const DeleteJobButton = ({ id }: { id: string }) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { toast } = useToast()
    const { mutate, isPending } = useMutation({
        mutationFn: ( id: string ) => DeleteJobAction(id),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    variant: 'destructive',
                    title: "Deleting Job",
                    description: "You just failed delete the job!"
                })
                return
            }
            queryClient.invalidateQueries({ queryKey: ["jobs"] })
            queryClient.invalidateQueries({ queryKey: ["stats"] })
            queryClient.invalidateQueries({ queryKey: ["charts"] })
            toast({
                title: "Deleting Job",
                description: "Success delete a job"
            })
            router.refresh()
        }
    })

    const handleDeleteJob = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.refresh()
        mutate(id)
    }
    return ( 
        <div>
            <Button disabled={isPending} onClick={handleDeleteJob} className="btn" variant="destructive">
                {isPending ?
                    <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> <span>Deleting...</span></>
                    : 'Delete job'
                }    
            </Button>
        </div>
     );
}
 
export default DeleteJobButton;