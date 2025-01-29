import { ResponsiveRadar } from "@nivo/radar";

interface SalesRadarChartProps {
  data: Array<{
    category: string;
    business: number;
    category_sales: number;
  }>;
}

const SalesRadarChart = ({ data }: SalesRadarChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Sales Comparison Radar</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveRadar
          data={data}
          keys={["business", "category_sales"]}
          indexBy="category"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: "color" }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          dotBorderColor={{ from: "color" }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-12}
          colors={{ scheme: "nivo" }}
          fillOpacity={0.25}
          blendMode="multiply"
          animate={true}
          motionConfig="wobbly"
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000"
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  );
};

export default SalesRadarChart;