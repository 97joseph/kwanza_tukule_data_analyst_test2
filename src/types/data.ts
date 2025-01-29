export interface RawSalesData {
  DATE: number;
  "ANONYMIZED CATEGORY": string;
  "ANONYMIZED PRODUCT": string;
  "ANONYMIZED BUSINESS": string;
  "ANONYMIZED LOCATION": string;
  QUANTITY: number;
  "UNIT PRICE": number;
}

export interface ProcessedData {
  DATE: number;
  MONTH_YEAR: string;
  ANONYMIZED_CATEGORY: string;
  ANONYMIZED_PRODUCT: string;
  ANONYMIZED_BUSINESS: string;
  ANONYMIZED_LOCATION: string;
  QUANTITY: number;
  UNIT_PRICE: number;
  TOTAL_VALUE: number;
}