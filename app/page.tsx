import axiosInstance from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { formatDateTime } from "@/utils/formateDateTime";
import { QueueContent } from "@/components/modules/dashboard/components/QueueContent";

export interface Queue {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  tasks: {
    id: string;
    status: string;
    payload: string;
    attempts: number;
    maxRetries: number;
  }[]
}

export default async function Home() {

  const { data: queues } = await axiosInstance.post
    <{ data: { getQueues: Queue[] } }>
    ('/', {
      query: `
          query {
            getQueues {
              id
              name
              description
              createdAt
              tasks {
                id
                status
                payload
                attempts
                maxRetries
              }
            }
          }
        `,
    })

  const checkIfExistisFailedTasks = (tasks: { status: string }[]) => {
    return tasks.some(task => task.status === "Falha");
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Table className="border rounded">
        <TableHeader className="text-xs">
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tasks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {
            queues.data.getQueues.map((queue) => (
              <Sheet key={queue.id}>
                <SheetTrigger asChild>
                  <TableRow>
                    <TableCell>{queue.name}</TableCell>
                    <TableCell>{queue.description}</TableCell>
                    <TableCell>{
                      formatDateTime(queue.createdAt)
                    }
                    </TableCell>
                    <TableCell
                      className={`${checkIfExistisFailedTasks(queue.tasks) ? "text-red-500" : "text-green-500"}`}
                    >
                      {queue.tasks.length}
                    </TableCell>
                  </TableRow>
                </SheetTrigger>
                <QueueContent queue={queue} />
              </Sheet>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}
