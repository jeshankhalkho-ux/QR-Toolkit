import { QRCodeCanvas } from "qrcode.react";

export type QRType = "url" | "text" | "email" | "wifi" | "vcard" | "sms" | "social";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export interface QRData {
  type: QRType;
  value: string; // The formatted string to be encoded
  raw: any; // Raw input data fields for the UI
}

export interface QRDesign {
  fgColor: string;
  bgColor: string;
  logoImage: string | null;
  includeMargin: boolean;
  size: number;
  errorCorrection: ErrorCorrectionLevel;
}

export interface SavedQRCode {
  id: string;
  createdAt: number;
  name: string;
  data: QRData;
  design: QRDesign;
  tags: string[];
  scans: number; // Will start at 0
}
