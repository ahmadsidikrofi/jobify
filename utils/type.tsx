import * as z from "zod"

export type JobType = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    clerkId: string,
    position: string,
    company: string,
    location: string,
    status: string,
    mode: string,
}

export enum JobStatus {
    Pending = 'pending',
    Interview = 'interview',
    Decline = 'decline'
}
export enum JobMode {
    FullTime = 'full-time',
    PartTime = 'part-time',
    Internship = 'internship'
}

export const CreateAndUpdateJobSchema = z.object({
    position: z.string().min(5, {
        message: 'Position must be at least 5 char'
    }),
    company: z.string().min(5, {
        message: 'Company must be at least 5 char'
    }),
    location: z.string().min(5, {
        message: 'Location must be at least 5 char'
    }),
    status: z.nativeEnum(JobStatus),
    mode: z.nativeEnum(JobMode)
})
export type CreateAndUpdateJobType = z.infer<typeof CreateAndUpdateJobSchema> 