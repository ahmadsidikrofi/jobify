'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input";
import { JobStatus } from "@/utils/type";
import { Button } from "./ui/button";
import { useRouter, useSearchParams, usePathname} from "next/navigation";

const SearchForm = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const search = searchParams.get('search') || ''
    const jobStatus = searchParams.get('job-status')|| 'all'
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let params = new URLSearchParams()
        const formData = new FormData(e.currentTarget)
        const search = formData.get('search') as string
        const jobStatus = formData.get('job-status') as string
        params.set('search', search)
        params.set('job-status', jobStatus)
        router.push(`${pathname}?${params.toString()}`)
    }
    
    return (
        <form onSubmit={handleSubmit} className="shadow-component bg-muted p-8 mb-16 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg">
            <Input placeholder="Search job" type="text" name="search" defaultValue={search} className="btn capitalize dark:bg-slate-200 dark:text-slate-800" />
            <Select name="job-status" defaultValue={jobStatus}>
                <SelectTrigger className="btn capitalize dark:bg-slate-200 dark:text-slate-800">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {["all", ...Object.values(JobStatus)].map((jobStats) => (
                        <SelectItem key={jobStats} value={jobStats} className="capitalize">{jobStats}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button type="submit" className="capitalize btn">search job</Button>
        </form>
    );
}

export default SearchForm;