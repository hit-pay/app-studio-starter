import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

const AUGUST_2026 = new Date(2026, 7, 1);

function CalendarDemo() {
  const [single, setSingle] = useState<Date | undefined>(new Date(2026, 7, 28));
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 7, 24),
    to: new Date(2026, 7, 28),
  });
  const [multiple, setMultiple] = useState<Date[] | undefined>([
    new Date(2026, 7, 5),
    new Date(2026, 7, 12),
    new Date(2026, 7, 19),
  ]);

  return (
    <>
      <div className="grid items-start gap-8 xl:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Single
          </p>
          <Calendar
            mode="single"
            defaultMonth={AUGUST_2026}
            selected={single}
            onSelect={setSingle}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Range
          </p>
          <Calendar
            mode="range"
            defaultMonth={AUGUST_2026}
            selected={range}
            onSelect={setRange}
            showOutsideDays
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Multiple
          </p>
          <Calendar
            mode="multiple"
            defaultMonth={AUGUST_2026}
            selected={multiple}
            onSelect={setMultiple}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Month and year dropdown
          </p>
          <Calendar
            mode="single"
            defaultMonth={AUGUST_2026}
            captionLayout="dropdown"
            buttonVariant="outline"
            startMonth={new Date(2024, 0)}
            endMonth={new Date(2028, 11)}
          />
        </div>
      </div>
    </>
  );
}

export { CalendarDemo };
