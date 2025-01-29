import { ResponsiveLine } from "@nivo/line";
import { Card } from "./ui/card";

interface TrendAnalysisProps {
  data: {
    id: string;
    data: Array<{
      x: string;
      y: number;
    }>;
  }[];
}

const TrendAnalysis = ({ data }: TrendAnalysisProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sales Trends Over Time</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "Month",
            legendOffset: 40,
            legendPosition: "middle"
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Value",
            legendOffset: -40,
            legendPosition: "middle"
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: "circle"
            }
          ]}
        />
      </div>
    </Card>
  );
};

export default TrendAnalysis;