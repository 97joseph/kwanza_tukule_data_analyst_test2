import { useEffect, useState } from "react";
import salesData from "../data/sales-data.json";
import { ProcessedData, RawSalesData } from "../types/data";
import { processData, calculateCorrelation, calculateCentralTendency } from "../utils/dataProcessing";
import HeatMap from "../components/HeatMap";
import CorrelationMap from "../components/CorrelationMap";
import CentralTendency from "../components/CentralTendency";
import TrendAnalysis from "../components/TrendAnalysis";
import DataInsights from "../components/DataInsights";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Index = () => {
  const [data, setData] = useState<ProcessedData[]>([]);
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [correlationData, setCorrelationData] = useState<any[]>([]);
  const [quantityStats, setQuantityStats] = useState({ mean: 0, median: 0 });
  const [valueStats, setValueStats] = useState({ mean: 0, median: 0 });
  const [trendData, setTrendData] = useState<any[]>([]);

  useEffect(() => {
    try {
      const processed = processData(salesData as RawSalesData[]);
      setData(processed);

      // Calculate trend data
      const monthlyData = processed.reduce((acc, item) => {
        const month = item.MONTH_YEAR;
        acc[month] = (acc[month] || 0) + item.TOTAL_VALUE;
        return acc;
      }, {} as Record<string, number>);

      const trendDataArray = [{
        id: "Monthly Sales",
        data: Object.entries(monthlyData)
          .map(([x, y]) => ({ x, y }))
          .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime())
      }];
      setTrendData(trendDataArray);

      // Calculate heatmap data
      const categories = [...new Set(processed.map(item => item.ANONYMIZED_CATEGORY))];
      const businesses = [...new Set(processed.map(item => item.ANONYMIZED_BUSINESS))];
      
      const heatmapData = categories.map(category => ({
        id: category,
        data: businesses.map(business => ({
          x: business,
          y: processed
            .filter(item => item.ANONYMIZED_CATEGORY === category && item.ANONYMIZED_BUSINESS === business)
            .reduce((sum, item) => sum + item.TOTAL_VALUE, 0)
        }))
      }));
      setHeatmapData(heatmapData);

      // Calculate correlation data
      const metrics = ["QUANTITY", "UNIT_PRICE", "TOTAL_VALUE"];
      const correlationMatrix = metrics.map(metric1 => ({
        id: metric1,
        data: metrics.map(metric2 => ({
          x: metric2,
          y: calculateCorrelation(
            processed.map(item => item[metric1 as keyof ProcessedData] as number),
            processed.map(item => item[metric2 as keyof ProcessedData] as number)
          )
        }))
      }));
      setCorrelationData(correlationMatrix);

      // Calculate central tendency
      const quantities = processed.map(item => item.QUANTITY);
      const values = processed.map(item => item.TOTAL_VALUE);
      setQuantityStats(calculateCentralTendency(quantities));
      setValueStats(calculateCentralTendency(values));
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sales Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-8 mb-8">
          <DataInsights data={data} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <CentralTendency
            title="Quantity Statistics"
            mean={quantityStats.mean}
            median={quantityStats.median}
          />
          <CentralTendency
            title="Value Statistics"
            mean={valueStats.mean}
            median={valueStats.median}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <TrendAnalysis data={trendData} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Sales Data</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.slice(0, 15).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(item.DATE).toLocaleDateString()}</TableCell>
                    <TableCell>{item.ANONYMIZED_CATEGORY}</TableCell>
                    <TableCell>{item.ANONYMIZED_PRODUCT}</TableCell>
                    <TableCell>{item.ANONYMIZED_BUSINESS}</TableCell>
                    <TableCell>{item.ANONYMIZED_LOCATION}</TableCell>
                    <TableCell>{item.QUANTITY}</TableCell>
                    <TableCell>${item.UNIT_PRICE.toFixed(2)}</TableCell>
                    <TableCell>${item.TOTAL_VALUE.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <HeatMap data={heatmapData} />
          <CorrelationMap correlationData={correlationData} />
        </div>
      </div>
    </div>
  );
};

export default Index;