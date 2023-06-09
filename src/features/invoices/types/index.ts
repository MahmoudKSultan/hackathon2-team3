import type { FC } from "react";
import type { StepperOnChangeType } from "components/types";
import type { APIResponseType, Children } from "types";

interface PayInvoiceProps {
  className?: string;
  cardClassName?: string;
}

export type PayInvoiceType = FC<PayInvoiceProps>;

export interface ConfirmDetailsProps {
  onSubmit: (data: ConfirmDetailsInputsType) => void;
}

export type ConfirmDetailsInputsType = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

export type PayInvoiceStepType = {
  title: string;
  id: "step1" | "step2" | "step3" | "step4";
  active: boolean;
  completed: boolean;
};

export type PayInvoiceStepsType = PayInvoiceStepType[];

export type PaymentMethodValue = "creditCard" | "paypal" | "bankTransfer";

export type ClientFeesValue = 100 | 50 | 0;

export type PaymentMethodType = {
  id: number;
  label: string;
  caption: string;
  value: PaymentMethodValue;
  icon: string;
};

export type ClientFeesType = Omit<PaymentMethodType, "value"> & {
  value: ClientFeesValue;
};

export interface PayInvoiceStateProps {
  children: Children;
}

export type PayInvoiceStateType = FC<PayInvoiceStateProps>;

export type PayInvoiceContextType = {
  invoiceId: string | undefined;
  stepsData: {
    steps: PayInvoiceStepsType;
    activeStepIndex: number;
    stepContent: JSX.Element;
    currentStep: PayInvoiceStepType;
    nextStep: PayInvoiceStepType | undefined;
    previousStep: PayInvoiceStepType | undefined;
    isLastStep: boolean;
  };
  onStepperChange: StepperOnChangeType;
  invoiceDetails: {
    data: InvoiceDetailsData | undefined | null;
    isLoading: boolean;
    error: string;
  };
  nextButton: {
    label: string;
    isLoading: boolean;
  };
};

export type ClientType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    country: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type FreelancerType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type InvoiceItemType = {
  _id: string;
  itemName: string;
  description: string;
  price: number;
};

type InvoiceStatusType = "unpaid" | "paid";

export type InvoiceType = {
  _id: string;
  client: ClientType;
  fixed: InvoiceItemType[];
  freelancer?: FreelancerType;
  subTotal: number;
  hashCode: string;
  status: InvoiceStatusType;
};

type InvoiceVariantType = "invoice" | "service";

export type InvoiceDetailsData = {
  invoice: InvoiceType;
  type: InvoiceVariantType;
};

export type InvoiceDetailsResponse = APIResponseType<InvoiceDetailsData>;

interface InvoiceDetailsProps {
  details: InvoiceType | undefined;
  loading: boolean;
  error: string | undefined;
}

export type InvoiceDetailsType = FC<InvoiceDetailsProps>;

export type CompleteClientInvoiceArgType = {
  client: Omit<ClientType, "_id">;
  type: InvoiceVariantType;
  hashCode: string;
};

export type CompleteClientInvoiceResponse = APIResponseType<{
  invoiceId: string;
}>;

type JobType = "fixed" | "hourly";

export type InvoicePreviewData = {
  _id: string;
  client: ClientType;
  jobType: JobType;
  currency: string;
  fixed: InvoiceItemType[];
  subTotal: number;
  hashCode: string;
  invoiceNo: string;
  status: InvoiceStatusType;
  createdAt: string;
  updatedAt: string;
  paymentDetails: string;
  otherPaymentMethod: null; // for now
  paymentMethod: null; // for now
};

export type InvoicePreviewResponse = APIResponseType<InvoicePreviewData>;
