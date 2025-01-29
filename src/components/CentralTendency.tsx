import { Card } from "@/components/ui/card";

interface CentralTendencyProps {
  title: string;
  mean: number;
  median: number;
}

const CentralTendency = ({ title, mean, median }: CentralTendencyProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Mean</p>
          <p className="text-2xl font-bold">{mean.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Median</p>
          <p className="text-2xl font-bold">{median.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};

export default CentralTendency;