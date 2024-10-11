'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "./ui/form";
import { CreateAndUpdateJobSchema, CreateAndUpdateJobType, JobMode, JobStatus } from "@/utils/type";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createJobAction } from "@/utils/actions";
import { ReloadIcon } from "@radix-ui/react-icons"

function CreateJobForm () {
    const form = useForm<CreateAndUpdateJobType>({
        resolver: zodResolver(CreateAndUpdateJobSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            status: JobStatus.Pending,
            mode: JobMode.FullTime
        }
    })
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndUpdateJobType) => createJobAction(values),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your new jo.",
                })
                return;
            }
            toast({
                title: "Success make a job.",
                description: "Go get a new job.",
            })
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
            queryClient.invalidateQueries({ queryKey: ['charts'] })
            // form.reset()
            router.push('/jobs')
        },
        onError: (error) => {
            console.error('Error creating job:', error);
        }
    })
    function onSubmit(values: CreateAndUpdateJobType) {
        mutate(values)
    }
    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded-lg">
                <h1 className="capitalize text-5xl mb-6 font-semibold">form a new job</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                    {/* Position Field */}
                    <CustomFormField name="position" control={form.control} />
                    {/* Company Field */}
                    <CustomFormField name="company" control={form.control} />
                    {/* Location Field */}
                    <CustomFormField name="location" control={form.control} />
                    {/* Job mode */}
                    <CustomFormSelect
                        name="mode"
                        control={form.control}
                        labelText='mode pekerjaan'
                        items={Object.values(JobMode)}
                    />
                    {/* Job status */}
                    <CustomFormSelect 
                        name="status"
                        control={form.control}
                        labelText='status pekerjaan'
                        items={Object.values(JobStatus)}
                    />
                    <Button disabled={isPending} type='submit' className="capitalize mt-8">{isPending ?
                        <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> <span>Please wait</span></>
                        : 'create job'}
                    </Button>
                </div>
            </form>
        </Form>
     );
}
 
export default CreateJobForm;