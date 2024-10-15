'use client'
import React from 'react';
import JobCard from './JobCard';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { GetAllJobsAction } from '@/utils/actions';

const JobList = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search') || ''
    const jobStatus = searchParams.get('job-status') || 'all'
    const pageNumber = Number(searchParams.get('page')) || 1

    const { data, isPending } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => GetAllJobsAction({
            search: search,
            jobStatus: jobStatus,
            page: pageNumber
        })
    })

    const jobs = data?.jobs || []
    if (isPending) return <h2 className='text-4xl'>Load jobs...</h2>
    if (jobs.length < 1) return <h2 className='text-4xl'>No job found</h2>
    return ( 
        <main className='grid sm:grid-cols-2 gap-8'>
            {jobs.map((job, i) => (
                <JobCard key={i} job={job}/>
            ))}
        </main>
     );
}
 
export default JobList;