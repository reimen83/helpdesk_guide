interface DataTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export default function DataTable({ headers, rows, caption }: DataTableProps) {
  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-border">
      <table className="w-full text-sm">
        {caption && (
          <caption className="p-4 text-left font-semibold text-primary bg-blue-50">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-blue-100 border-b border-border">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left font-semibold text-primary"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-border transition-colors ${
                rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-blue-50`}
            >
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
