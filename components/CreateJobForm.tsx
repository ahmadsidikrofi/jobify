'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "./ui/form";
import { CreateAndUpdateJobSchema, CreateAndUpdateJobType, JobMode, JobStatus } from "@/utils/type";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

const CreateJobForm = () => {
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
    const onSubmit = (values: CreateAndUpdateJobType) => {
        console.log(values)
    }
    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded-lg">
                <h1 className="capitalize text-5xl mb-6 font-semibold">add form</h1>
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
                    <Button className="capitalize mt-8">add job</Button>
                </div>
            </form>
        </Form>
     );
}
 
export default CreateJobForm;