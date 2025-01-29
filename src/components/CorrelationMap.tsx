import { ResponsiveHeatMap } from "@nivo/heatmap";

interface CorrelationMapProps {
  correlationData: {
    id: string;
    data: {
      x: string;
      y: number;
    }[];
  }[];
}

const CorrelationMap = ({ correlationData }: CorrelationMapProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Correlation Matrix</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveHeatMap
          data={correlationData}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat=">-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "Metric",
            legendPosition: "middle",
            legendOffset: 40
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Metric",
            legendPosition: "middle",
            legendOffset: -70
          }}
          colors={{
            type: "diverging",
            scheme: "red_blue",
            divergeAt: 0.5,
            minValue: -1,
            maxValue: 1
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: "right",
              translateX: 30,
              translateY: 0,
              length: 120,
              thickness: 8,
              direction: "column",
              tickPosition: "after",
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              title: "Correlation →",
              titleAlign: "start",
              titleOffset: 4
            }
          ]}
        />
      </div>
    </div>
  );
};

export default CorrelationMap;