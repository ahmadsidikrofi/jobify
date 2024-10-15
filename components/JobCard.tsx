import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJobButton from "./DeleteJobButton";
import { JobType } from "@/utils/type";
import JobCardInfo from "./JobCardInfo";
import { Briefcase, CalendarClock, InfoIcon, MapPinCheckIcon } from "lucide-react";

const JobCard = ({ job }: { job: JobType }) => {
    const date = new Date(job.createdAt).toLocaleDateString()
    return (
        <Card className="bg-muted shadow-component">
            <CardHeader>
                <CardTitle>{job.position}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-2 gap-4 mt-4">
                <JobCardInfo icon={<Briefcase />} text={job.mode} />
                <JobCardInfo icon={<MapPinCheckIcon />} text={job.location} />
                <JobCardInfo icon={<CalendarClock />} text={date} />
                <Badge className="w-32 justify-center">
                    <JobCardInfo icon={<InfoIcon className="w-4 h-4" />} text={job.mode} />
                </Badge>
            </CardContent>
            <CardFooter className="flex gap-4">
                <Button asChild className="btn">
                    <Link href={`/jobs/${job.id}`}>Edit</Link>
                </Button>
                <DeleteJobButton id={job.id}/>
            </CardFooter>
        </Card>
    );
}

export default JobCard;