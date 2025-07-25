import type { IGuaranteeSystem } from './IGuaranteeSystem';
import type { IGuaranteeFailureType } from './IGuaranteeFailureType';

export interface IGuarantee {
  id?: string;

  companyId?: string;
  buildingId?: string;
  systemId?: string;

  description?: string;
  standardWarrantyPeriod?: number;

  startDate?: string;
  endDate?: string;

  createdAt?: string;
  updatedAt?: string;

  // company?: ICompany;
  // building?: IBuilding;
  system?: IGuaranteeSystem;

  // documents?: IGuaranteeDocument[];
  failureTypes?: { failureType: IGuaranteeFailureType }[];
}

// id String @id @default(uuid())

// companyId  String?
// buildingId String?
// systemId   String

// description            String
// standardWarrantyPeriod Int // in months, converted into years

// startDate DateTime
// endDate   DateTime

// company  Company?        @relation(fields: [companyId], references: [id], onDelete: Cascade)
// building Building?       @relation(fields: [buildingId], references: [id], onDelete: Cascade)
// system   GuaranteeSystem @relation(fields: [systemId], references: [id], onDelete: Cascade)

// documents    GuaranteeDocument[]
// failureTypes GuaranteeToFailureType[]

// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
