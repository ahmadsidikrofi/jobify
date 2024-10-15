'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "./ui/form";
import { CreateAndUpdateJobSchema, CreateAndUpdateJobType, JobMode, JobStatus } from "@/utils/type";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons"
import { EditJobAction, GetSingleJobAction } from "@/utils/actions";
import { useEffect } from "react";

const EditJobForm = ({ jobId }: { jobId: string }) => {
    const router = useRouter()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['job', jobId],
        queryFn: () => GetSingleJobAction(jobId)
    })
    
    const form = useForm<CreateAndUpdateJobType>({
        resolver: zodResolver(CreateAndUpdateJobSchema),
        defaultValues: {
            position: data?.position || '',
            company: data?.company || '',
            location: data?.location || '',
            mode: data?.mode as JobMode || JobMode.FullTime,
            status: data?.status as JobStatus || JobStatus.Pending
        }
    })

    useEffect(() => {
        if (data) {
            form.reset({
                position: data.position,
                company: data.company,
                location: data.location,
                mode: data.mode as JobMode,
                status: data.status as JobStatus
            })
        }
    }, [data, form])

    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndUpdateJobType) => EditJobAction(jobId, values),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your current job.",
                })
                return
            }
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
            queryClient.invalidateQueries({ queryKey: ['charts'] })
            toast({
                title: "Sucess updating job.",
                description: "Your job may success updated. Hope you got your employee as like you dream",
            })
            router.push('/jobs')
        }
    })

    const onSubmit = (values: CreateAndUpdateJobType) => {
        mutate(values)
    }
    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded-lg shadow-component">
                <h1 className="capitalize text-5xl mb-6 font-semibold">edit this job</h1>
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
                    <Button disabled={isPending} type='submit' className="capitalize mt-8 btn">{isPending ?
                        <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> <span>Please wait</span></>
                        : 'edit job'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
 
export default EditJobForm;