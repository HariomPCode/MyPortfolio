import type { GitHubActivityData } from "@/lib/github/contributions";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEVEL_STYLES = {
  0: {
    fill: "rgb(var(--surface))",
    stroke: "rgb(var(--line) / 0.45)",
  },
  1: {
    fill: "rgb(var(--accent) / 0.25)",
    stroke: "rgb(var(--accent) / 0.35)",
  },
  2: {
    fill: "rgb(var(--accent) / 0.5)",
    stroke: "rgb(var(--accent) / 0.55)",
  },
  3: {
    fill: "rgb(var(--accent) / 0.75)",
    stroke: "rgb(var(--accent) / 0.8)",
  },
  4: {
    fill: "rgb(var(--accent))",
    stroke: "rgb(var(--accent))",
  },
} as const;

function formatDateTooltip(dateStr: string): string {
  try {
    const d = new Date(`${dateStr}T00:00:00Z`);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

export function GitHubHeatmap({ data }: { data: GitHubActivityData }) {
  const { username, totalContributions, weeks } = data;

  const SQUARE_SIZE = 10;
  const SQUARE_GAP = 3;
  const SQUARE_STEP = SQUARE_SIZE + SQUARE_GAP;
  const LEFT_PAD = 28;
  const TOP_PAD = 18;

  const gridWidth = weeks.length * SQUARE_STEP;
  const totalWidth = LEFT_PAD + gridWidth + 8;
  const totalHeight = TOP_PAD + 7 * SQUARE_STEP + 22;

  // Month labels
  const monthLabels: { label: string; x: number }[] = [];
  let lastMonth = -1;
  let lastX = -100;

  weeks.forEach((week, weekIndex) => {
    const validDay = week.days.find((d) => d.date);
    if (validDay) {
      const month = new Date(`${validDay.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        const x = LEFT_PAD + weekIndex * SQUARE_STEP;
        if (x - lastX >= 32) {
          monthLabels.push({ label: MONTH_NAMES[month], x });
          lastMonth = month;
          lastX = x;
        }
      }
    }
  });

  const legendX = Math.max(LEFT_PAD, totalWidth - 145);
  const legendY = totalHeight - 12;

  return (
    <div className="w-full min-w-0">
      <div className="sr-only">
        GitHub contribution calendar: {totalContributions} contributions in the
        last year across {weeks.length} weeks.
      </div>
      <div className="overflow-x-auto pb-2 pt-1 -mx-1 px-1">
        <svg
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className="min-w-[680px] w-full max-w-full h-auto select-none"
          role="img"
          aria-labelledby="github-heatmap-title"
        >
          <title id="github-heatmap-title">{`Contribution graph for ${username}: ${totalContributions} contributions in the last year`}</title>

          {/* Month labels */}
          {monthLabels.map((m) => (
            <text
              key={`${m.label}-${m.x}`}
              x={m.x}
              y={12}
              fill="rgb(var(--muted))"
              fontSize={9}
              fontFamily="var(--font-mono)"
            >
              {m.label}
            </text>
          ))}

          {/* Day labels (Mon, Wed, Fri) */}
          <text
            x={4}
            y={TOP_PAD + 1 * SQUARE_STEP + 8}
            fill="rgb(var(--muted))"
            fontSize={8}
            fontFamily="var(--font-mono)"
          >
            Mon
          </text>
          <text
            x={4}
            y={TOP_PAD + 3 * SQUARE_STEP + 8}
            fill="rgb(var(--muted))"
            fontSize={8}
            fontFamily="var(--font-mono)"
          >
            Wed
          </text>
          <text
            x={4}
            y={TOP_PAD + 5 * SQUARE_STEP + 8}
            fill="rgb(var(--muted))"
            fontSize={8}
            fontFamily="var(--font-mono)"
          >
            Fri
          </text>

          {/* Day squares */}
          {weeks.map((week, weekIndex) => {
            const x = LEFT_PAD + weekIndex * SQUARE_STEP;
            return week.days.map((day, dayIndex) => {
              const y = TOP_PAD + dayIndex * SQUARE_STEP;
              const style = LEVEL_STYLES[day.level];
              const tooltip = `${day.count} contribution${
                day.count === 1 ? "" : "s"
              } on ${formatDateTooltip(day.date)}`;

              return (
                <rect
                  key={day.date || `${weekIndex}-${dayIndex}`}
                  x={x}
                  y={y}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  rx={2}
                  ry={2}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={1}
                >
                  <title>{tooltip}</title>
                </rect>
              );
            });
          })}

          {/* Legend */}
          <g transform={`translate(${legendX}, ${legendY})`}>
            <text
              x={0}
              y={8}
              fill="rgb(var(--muted))"
              fontSize={8}
              fontFamily="var(--font-mono)"
            >
              Less
            </text>
            {([0, 1, 2, 3, 4] as const).map((lvl, idx) => (
              <rect
                key={lvl}
                x={26 + idx * 13}
                y={0}
                width={9}
                height={9}
                rx={1.5}
                ry={1.5}
                fill={LEVEL_STYLES[lvl].fill}
                stroke={LEVEL_STYLES[lvl].stroke}
                strokeWidth={1}
              />
            ))}
            <text
              x={96}
              y={8}
              fill="rgb(var(--muted))"
              fontSize={8}
              fontFamily="var(--font-mono)"
            >
              More
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
