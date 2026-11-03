import { useEffect, useState } from "react";

// Launch offer deadline: Friday, July 17 at 11:59:59 PM.
// Uses the current year; if July 17 has already passed this year, rolls to next year.
function getDeadline() {
  const now = new Date();
  let year = now.getFullYear();
  // Month is 0-indexed: June = 5, July = 6.
  let target = new Date(year, 6, 17, 23, 59, 59, 999);
  if (target.getTime() <= now.getTime()) {
    target = new Date(year + 1, 6, 17, 23, 59, 59, 999);
  }
  return target;
}

const DEADLINE = getDeadline();

function getTimeToDeadline() {
  const now = new Date();
  const diff = Math.max(0, DEADLINE.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer({
  labels = ["DAYS", "HRS", "MIN", "SEC"],
}: {
  labels?: [string, string, string, string];
}) {
  const [time, setTime] = useState(getTimeToDeadline);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeToDeadline()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const units: Array<{ value: string; label: string }> = [
    { value: pad(time.days), label: labels[0] },
    { value: pad(time.hours), label: labels[1] },
    { value: pad(time.minutes), label: labels[2] },
    { value: pad(time.seconds), label: labels[3] },
  ];

  return (
    <span
      className="inline-flex items-center gap-2 sm:gap-3"
      data-testid="text-countdown"
    >
      {units.map((u, i) => (
        <span key={u.label} className="inline-flex items-baseline gap-2">
          <span className="inline-flex flex-col items-center leading-none">
            <span className="font-serif text-base sm:text-lg font-semibold tabular-nums tracking-tight">
              {u.value}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] opacity-80 mt-0.5">
              {u.label}
            </span>
          </span>
          {i < units.length - 1 && (
            <span className="font-serif text-base sm:text-lg opacity-40 self-start leading-none">·</span>
          )}
        </span>
      ))}
    </span>
  );
}
