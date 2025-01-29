import { ResponsiveHeatMap } from "@nivo/heatmap";

interface HeatMapProps {
  data: {
    id: string;
    data: {
      x: string;
      y: number;
    }[];
  }[];
}

const HeatMap = ({ data }: HeatMapProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Sales Heatmap by Category and Business</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveHeatMap
          data={data}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat=">-.2s"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "Business",
            legendPosition: "middle",
            legendOffset: 40
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Category",
            legendPosition: "middle",
            legendOffset: -70
          }}
          colors={{
            type: "sequential",
            scheme: "blues"
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
              title: "Value →",
              titleAlign: "start",
              titleOffset: 4
            }
          ]}
        />
      </div>
    </div>
  );
};

export default HeatMap;