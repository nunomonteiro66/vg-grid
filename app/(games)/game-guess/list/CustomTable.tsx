import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Column = {
  label: string;
  key: string;
};

type CustomTableProps = {
  data: Record<string, React.ReactNode>[];
  columns: Column[];
};

export default function CustomTable({ data, columns }: CustomTableProps) {
  const router = useRouter();
  const goTo = (dayId: string) => router.push(`/game-guess/${dayId}`);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={`column-header-${column.key}`}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            onClick={() => goTo(String(row.id))}
            className="cursor-pointer"
          >
            {columns.map((column) => (
              <TableCell key={column.key}>{row[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
