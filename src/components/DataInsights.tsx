import { Card } from "./ui/card";
import { ProcessedData } from "../types/data";

interface DataInsightsProps {
  data: ProcessedData[];
}

const DataInsights = ({ data }: DataInsightsProps) => {
  // Calculate insights with null checks
  const totalSales = data?.reduce((sum, item) => sum + (item?.TOTAL_VALUE || 0), 0) || 0;
  const avgOrderValue = data?.length ? totalSales / data.length : 0;

  // Calculate top category with null checks
  const categoryData = data?.reduce((acc, item) => {
    if (item?.ANONYMIZED_CATEGORY) {
      acc[item.ANONYMIZED_CATEGORY] = (acc[item.ANONYMIZED_CATEGORY] || 0) + (item.TOTAL_VALUE || 0);
    }
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryData || {})
    .sort(([, a], [, b]) => (b || 0) - (a || 0))[0] || ['No Category', 0];

  // Calculate top business with null checks
  const businessData = data?.reduce((acc, item) => {
    if (item?.ANONYMIZED_BUSINESS) {
      acc[item.ANONYMIZED_BUSINESS] = (acc[item.ANONYMIZED_BUSINESS] || 0) + (item.TOTAL_VALUE || 0);
    }
    return acc;
  }, {} as Record<string, number>);

  const topBusiness = Object.entries(businessData || {})
    .sort(([, a], [, b]) => (b || 0) - (a || 0))[0] || ['No Business', 0];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Average Order Value</h3>
          <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Top Performing Category</h3>
          <p className="text-2xl font-bold">{topCategory[0]}</p>
          <p className="text-sm text-gray-500">${topCategory[1].toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Top Business</h3>
          <p className="text-2xl font-bold">{topBusiness[0]}</p>
          <p className="text-sm text-gray-500">${topBusiness[1].toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default DataInsights;