import { Queue } from "@/app/page";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatDateTime } from "@/utils/formateDateTime";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";


type QueueContentProps = {
  queue: Queue;
}

export function QueueContent({ queue }: QueueContentProps) {
  return (
    <SheetContent className="w-[5000px]">
      <SheetHeader>
        <SheetTitle>{queue.name}</SheetTitle>
        <SheetDescription className="flex flex-col">
          {queue.description}
          <span className="text-xs">{formatDateTime(queue.createdAt)}</span>
        </SheetDescription>

      </SheetHeader>
      <Accordion type="single" collapsible>
        {
          queue.tasks.map((task) => (
            <AccordionItem key={task.id} value={task.id}>
              <AccordionTrigger className="w-full flex gap-3 justify-between hover:no-underline">
                <span className="text-xs truncate w-full">
                  {JSON.parse(task.payload).url}
                </span>
                <span className={`
                text-xs 
                ${task.status === "Falha" && 'bg-red-500'} 
                ${task.status === "Pendente" && 'bg-orange-500'} 
                ${task.status === "Concluído" && 'bg-green-600'} 
                ${task.status === "Em Execução" && 'bg-sky-600'} 
                text-white rounded-full px-2`
                }>
                  {task.status}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <div className="w-full flex justify-between">
                  <span className="text-xs">
                    Retries: {task.attempts}/{task.maxRetries}
                  </span>
                  {
                    task.status === "Falha" && (
                      <Button size="sm" variant="outline" className="rounded-full text-xs flex items-center gap-2">
                        Retry
                        <RotateCcw size={12} className="cursor-pointer text-muted-foreground" />
                      </Button>
                    )
                  }
                </div>
                <pre className="bg-slate-100 p-4 rounded text-xs">
                  {JSON.stringify(JSON.parse(task.payload), null, 2)}
                </pre>
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </SheetContent>
  )
}
