'use server'
import { auth } from "@clerk/nextjs/server"
import { JobType, CreateAndUpdateJobSchema, CreateAndUpdateJobType } from "./type"
import prisma from "./prisma"
import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

function AuthenticateAndRedirect(): string {
  const { userId } = auth()
  if (!userId) redirect('/')
  return userId
}

export async function createJobAction(values: CreateAndUpdateJobType): Promise<JobType | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const authUserId = AuthenticateAndRedirect()
  try {
    CreateAndUpdateJobSchema.parse(values)
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: authUserId,
      },
    })
    return job
  } catch (err) {
    console.error("Error in CreateJobAction: ", err)
  }
}

type GetAllJobsActionTypes = {
  search?: string
  jobStatus?: string
  page?: number,
  limit?: number
}

export async function GetAllJobsAction({
  search, jobStatus, page = 1, limit = 10
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[],
  count: number,
  page: number,
  totalPage: number
}> {
  const userId = AuthenticateAndRedirect()
  try {
    let searchParams: Prisma.JobWhereInput = {
      clerkId: userId
    }
    if (search) {
      searchParams = {
        ...searchParams,
        OR: [
          {
            position: {
              contains: search
            }
          },
          {
            location: {
              contains: search
            }
          }
        ]
      }
    }

    if (jobStatus && jobStatus !== 'all') {
      searchParams = {
        ...searchParams,
        status: jobStatus
      }
    }
    const jobs: JobType[] = await prisma.job.findMany({
      where: searchParams,
      orderBy: { createdAt: 'desc' }
    })
    return { jobs, count: 0, page: 1, totalPage: 0 }
  } catch (err) {
    console.error("Error muncu: ", err)
    return { jobs: [], count: 0, page: 1, totalPage: 0 }
  }
}

export async function DeleteJobAction(id: string): Promise<JobType | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const userId = AuthenticateAndRedirect()
  try {
    const deleteJob: JobType = await prisma.job.delete({
      where: {
        id, clerkId: userId
      }
    })
    if (deleteJob) return deleteJob
  } catch (err) {
    console.error("There was an error: ", err)
  }
}

export async function GetSingleJobAction(id: string): Promise<JobType | undefined> {
  const userId = AuthenticateAndRedirect()
  try {
    const singleJob = await prisma.job.findUnique({
      where: {
        id, clerkId: userId
      }
    })
    if (!singleJob) redirect('/jobs')
    console.log(singleJob)
    return singleJob as JobType | undefined
  } catch (err) {
    console.error("There was an error: ", err)
  }
}

export async function EditJobAction(id: string, values: CreateAndUpdateJobType): Promise<JobType | undefined> {
  const userId = AuthenticateAndRedirect()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const editJob = await prisma.job.update({
      where: {
        id, clerkId: userId
      },
      data: {
        ...values,
      }
    })
    return editJob
  } catch (err) {
    console.error("There is an error: ", err)
  }
}

export async function CountStatsAction(): Promise<{
  pending: number,
  interview: number,
  decline: number
}> {
  const userId = AuthenticateAndRedirect()
  try {
    const countStats = await prisma.job.groupBy({
      where: {
        clerkId: userId
      },
      by: ['status'],
      _count: {
        status: true
      }
    })
    const statsObject = countStats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status
      return acc
    }, {} as Record<string, number>)

    const defaultStats = {
      pending: 0,
      interview: 0,
      decline: 0,
      ...statsObject
    }
    return defaultStats
  } catch (err) {
    console.error(err)
    redirect('/jobs')
  }
}

export async function GetChartsDataAction (): Promise<
    Array<{ date: string; count: number }> | undefined
> {
  const userId = AuthenticateAndRedirect()
  const dateSixMonthAgo = dayjs().subtract(6, 'month').toDate()
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt:{
          gte: dateSixMonthAgo
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY')
      const existingEntry = acc.find((entry) => entry.date === date)

      if (existingEntry) {
        existingEntry.count += 1
      } else {
        acc.push({ date, count: 1 })
      }
      return acc
    }, [] as Array<{ date: string; count: number }>)

    return applicationsPerMonth
  } catch (err) {
    console.error(err)
  }
}