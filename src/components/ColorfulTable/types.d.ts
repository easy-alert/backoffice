import { CSSProperties } from 'styled-components';

export interface IColorfulTableHeader {
  colsHeader: {
    label: string;
    cssProps?: CSSProperties;
    cssOnMedia?: CSSProperties;
  }[];
  children: React.ReactNode[] | React.ReactNode;
}

export interface IColorfulTableBody {
  colsBody: {
    cell: any;
    cssProps?: CSSProperties;
    cssOnMedia?: CSSProperties;
  }[];
  bgColor?: string;
}
