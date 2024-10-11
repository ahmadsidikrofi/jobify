'use server'
import { auth } from "@clerk/nextjs/server"
import { JobType, CreateAndUpdateJobSchema, CreateAndUpdateJobType } from "./type"
import prisma from "./prisma"
import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"

function AuthenticateAndRedirect (): string {
    const { userId } = auth()
    if (!userId) redirect('/')
    return userId
}

export async function createJobAction ( values: CreateAndUpdateJobType ): Promise<JobType | undefined> {
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
      orderBy:{ createdAt: 'desc' }
    })
    return { jobs, count: 0, page: 1, totalPage: 0  }
  } catch (err) {
    console.error("Error muncu: ", err)
    return { jobs: [], count: 0, page: 1, totalPage: 0  }
  }
}