import { Day } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { IconButton } from "@radix-ui/themes";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps } from "react";

type GamePaginatorProps = ComponentProps<"div"> & {
  day: Day;
  lastDayId: number;
};

export default function GamePaginator({
  day,
  lastDayId,
  className,
}: GamePaginatorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const basePath = pathname.split("/")[1];

  const goToPreviousDay = () => {
    router.push(`/${basePath}/${day.id - 1}`);
  };

  const goToNextDay = () => {
    router.push(`/${basePath}/${day.id + 1}`);
  };

  const goToList = () => {
    router.push(`/${basePath}/list`);
  };

  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <IconButton onClick={goToPreviousDay} disabled={day.id === 1}>
        <ChevronLeft></ChevronLeft>
      </IconButton>
      <p>
        {day && day?.date.toDateString()} - #{day.id}
      </p>
      <IconButton onClick={goToNextDay} disabled={lastDayId === day?.id}>
        <ChevronRight></ChevronRight>
      </IconButton>
      <IconButton onClick={goToList}>
        <Calendar></Calendar>
      </IconButton>
    </div>
  );
}
