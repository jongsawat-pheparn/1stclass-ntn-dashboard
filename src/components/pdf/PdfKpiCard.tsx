interface PdfKpiCardProps {
  label: string;
  value: string;
  percent: string;
  targetLabel: string;
  color: string;
  breakdown: { icon: string; label: string; value: string; count?: string }[];
  diffLabel?: string;
  diffValue?: string;
  diffColor?: string;
}

export default function PdfKpiCard({
  label,
  value,
  percent,
  targetLabel,
  color,
  breakdown,
  diffLabel,
  diffValue,
  diffColor,
}: PdfKpiCardProps) {
  const bgColorMap: Record<string, string> = {
    '#00875a': '#e6f5f0',
    '#0052cc': '#e6f0ff',
    '#de350b': '#ffeae6',
  };
  const lightBg = bgColorMap[color] || `${color}15`;

  return (
    <div
      className="p-3 rounded-lg border h-full flex flex-col"
      style={{ backgroundColor: lightBg, borderColor: `${color}60` }}
    >
      <span className="block text-gray-500 font-bold text-xs mb-1">{label}</span>
      <h3 className="text-2xl font-bold mb-2" style={{ color }}>{value}</h3>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="text-gray-500">{targetLabel}</span>
        <span className="font-bold" style={{ color }}>{percent}%</span>
      </div>

      {diffLabel && diffValue && (
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-gray-500">{diffLabel}:</span>
          <span className="font-bold" style={{ color: diffColor }}>{diffValue}</span>
        </div>
      )}

      {breakdown && breakdown.length > 0 && (
        <div className="mt-auto space-y-1">
          {breakdown.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span>{item.icon} {item.label}</span>
              <span className="font-bold">
                {item.value}{item.count ? ` (${item.count})` : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}