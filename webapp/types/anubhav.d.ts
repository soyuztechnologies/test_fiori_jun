export type Mode = 'Create' | 'Update';

export interface ODataV2Metadata {
    id: string;
    uri: string;
    type: string;
    etag?: string;
}

export interface ODataV2Deferred{
    __deferred: {
        uri: string
    }
}

export interface ODataV2Entity{
    __metadata: ODataV2Metadata;
}

export interface ODataV2ResponseSet<T extends ODataV2Entity>{
    d: {
        results : T[]
    };
}

export interface ODataV2Response<T extends ODataV2Entity>{
    d: T;
}

export interface ToSupplier {
  __deferred: Deferred;
}

export interface Product extends ODataV2Entity {
  PRODUCT_ID: string;
  TYPE_CODE: string;
  CATEGORY: string;
  NAME: string;
  DESCRIPTION: string;
  SUPPLIER_ID: string;
  SUPPLIER_NAME: string;
  TAX_TARIF_CODE: string;
  PRICE: string;
  CURRENCY_CODE: string;
  DIM_UNIT: string;
  PRODUCT_PIC_URL: string;
  To_Supplier: ODataV2Deferred | Supplier;
}

export interface Supplier {
  BP_ID: string;
  BP_ROLE: string;
  EMAIL_ADDRESS: string;
  PHONE_NUMBER: string;
  WEB_ADDRESS: string;
  COMPANY_NAME: string;
  CITY: string;
  COUNTRY: string;
}
