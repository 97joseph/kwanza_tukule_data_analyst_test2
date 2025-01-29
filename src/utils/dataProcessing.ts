import { RawSalesData, ProcessedData } from '../types/data';
import { format } from 'date-fns';

export const processData = (data: RawSalesData[]): ProcessedData[] => {
  return data.map(item => ({
    DATE: item.DATE,
    MONTH_YEAR: format(new Date(item.DATE), 'MMMM yyyy'),
    QUANTITY: item.QUANTITY || 0,
    UNIT_PRICE: item["UNIT PRICE"] || 0,
    TOTAL_VALUE: (item.QUANTITY || 0) * (item["UNIT PRICE"] || 0),
    ANONYMIZED_CATEGORY: item["ANONYMIZED CATEGORY"],
    ANONYMIZED_PRODUCT: item["ANONYMIZED PRODUCT"],
    ANONYMIZED_BUSINESS: item["ANONYMIZED BUSINESS"],
    ANONYMIZED_LOCATION: item["ANONYMIZED LOCATION"]
  }));
};

export const calculateCorrelation = (x: number[], y: number[]): number => {
  if (x.length !== y.length || x.length === 0) return 0;

  const n = x.length;
  const sum_x = x.reduce((a, b) => a + b, 0);
  const sum_y = y.reduce((a, b) => a + b, 0);
  const sum_xy = x.reduce((acc, curr, i) => acc + curr * y[i], 0);
  const sum_x2 = x.reduce((a, b) => a + b * b, 0);
  const sum_y2 = y.reduce((a, b) => a + b * b, 0);

  const numerator = n * sum_xy - sum_x * sum_y;
  const denominator = Math.sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));

  return denominator === 0 ? 0 : numerator / denominator;
};

export const calculateCentralTendency = (data: number[]) => {
  if (!data.length) return { mean: 0, median: 0 };

  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const sorted = [...data].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  
  return { mean, median };
};