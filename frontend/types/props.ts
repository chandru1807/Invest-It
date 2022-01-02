import { AppProps } from "next/app";
import { ReactElement } from "react";

export default interface Props {
  error?: any;
}

interface HomeProps extends Props {
  schemesProps?: any;
}

interface MutualFundsLandingProps extends Props {
  mutualFundTypesWithSubtypes?: {
    fundTypes: MutualFundsTypes[];
    fundSubTypes: MutualFundsSubTypes[];
  };
}

interface FundSubTypesPageProps extends Props {
  schemes?: any[];
  schemeId?: string;
  hasMore?: boolean;
}

interface FundTypesPageProps extends Props {
  schemes?: any[];
  schemeId?: string;
  hasMore?: boolean;
}

interface MutualFundsTypes {
  fundType: string;
  id: number;
}

interface MutualFundsSubTypes {
  fundSubtype: string;
  id: number;
  fundTypeId: string;
}

interface TabsProps {
  tabs: {
    id: number;
    name: string;
  }[];
  children: ReactElement;
  onTabChange: (input: number) => void;
}

export type {
  HomeProps,
  MutualFundsLandingProps,
  FundSubTypesPageProps,
  FundTypesPageProps,
  TabsProps,
};
