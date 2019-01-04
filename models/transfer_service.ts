/* Do not change, this code is generated from Golang structs */


export interface SortField {
    name: string;
    descending: boolean;
    //[SortField:]


    //[end]
}
export interface RequestMeta {
    page: number;
    sort_fields: SortField[];
    per_page: number;
    //[RequestMeta:]


    //[end]
}
export enum ShipmentStatus {
    Planning = 'planning',
    Preparation = 'preparation',
    Packed = 'packed',
    SentOut = 'sent_out',
    CustomsClearance = 'customs_clearance',
    OnTheWayToTp = 'on_the_way_to_tp',
    DeliveredToTp = 'delivered_to_tp',
    DeliveredToRecipient = 'delivered_to_recipient',
    InvalidStatus = 'invalid_status',
    //[ShipmentStatus:]


    //[end]
}
export interface GetShipmentListRequest {
    status: ShipmentStatus;
    meta: RequestMeta;
    //[GetShipmentListRequest:]


    //[end]
}
export interface ResponseMeta {
    page: number;
    count: number;
    total: number;
    //[ResponseMeta:]


    //[end]
}

export interface Expense {
    payment_on_deliver: Money;
    //[Expense:]


    //[end]
}


export interface WarehouseEntry {
    id: string;
    shipment_number: string;
    date_of_entry: Date;
    source: string;
    track_code: string;
    box_qty: number;
    pcs_qty: number;
    product_name: string;
    warehouse: string;
    image_urls: string[];
    //[WarehouseEntry:]


    //[end]
}
export interface Decimal {
    //[Decimal:]


    //[end]
}
export interface UnitLoad {
    sequence: number;
    quantity: number;
    product_name: string;
    weight: Decimal;
    length: number;
    height: number;
    width: number;
    //[UnitLoad:]


    //[end]
}

export interface Recipient {
    name: string;
    phone_numbers: string[];
    address: Address;
    //[Recipient:]


    //[end]
}
export interface Address {
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
    //[Address:]


    //[end]
}
export interface Sender {
    name: string;
    phone_numbers: string[];
    address: Address;
    //[Sender:]


    //[end]
}









export interface Money {
    //[Money:]


    //[end]
}


export enum PackageMethod {
    PackageNone = 'package_none',
    PackageBag = 'package_bag',
    PackageStandard = 'package_standard',
    PackageCarton = 'package_carton',
    PackageFoam = 'package_foam',
    PackageCartonFoam = 'package_carton_foam',
    PackageWoodenCrate = 'package_wooden_crate',
    PackageWoodenCrateFoam = 'package_wooden_crate_foam',
    PackageWoodenBox = 'package_wooden_box',
    PackageWoodenBoxFoam = 'package_wooden_box_foam',
    //[PackageMethod:]


    //[end]
}
export enum PaymentStatus {
    Unpaid = 'unpaid',
    OnCredit = 'on_credit',
    Paid = 'paid',
    //[PaymentStatus:]


    //[end]
}
export enum PaymentMethod {
    OnDelivery = 'on_delivery',
    PersonalTransfer = 'personal_transfer',
    LegalEntityTransfer = 'legal_entity_transfer',
    Other = 'other',
    //[PaymentMethod:]


    //[end]
}
export enum TransportMethod {
    Air = 'air',
    Auto = 'auto',
    Train = 'train',
    Express = 'express',
    Sea = 'sea',
    Local = 'local',
    //[TransportMethod:]


    //[end]
}

export enum ShipmentType {
    CommonShipment = 'common_shipment',
    ConsolidationShipment = 'consolidation_shipment',
    //[ShipmentType:]


    //[end]
}
export interface Shipment {
    id: string;
    code: string;
    type: ShipmentType;
    customer_code: string;
    packages_qty: number;
    pieces_qty: number;
    current_status: ShipmentStatus;
    transfer_point: number;
    transport_method: TransportMethod;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    package_method: PackageMethod;
    departure_warehouse: string;
    arrival_warehouse: string;
    transfer_point_warehouse: string;
    date_created: Date;
    date_modified: Date;
    value: Money;
    package_fee: Money;
    transfer_fee: Money;
    freight_rate: Money;
    prepayment: Money;
    discount: Money;
    commission_fee: Money;
    total_for_payment: Money;
    insurance_rate: number;
    insurance_fee: Money;
    payment_on_deliver: Money;
    sender: Sender;
    recipient: Recipient;
    unit_loads: UnitLoad[];
    entries: WarehouseEntry[];
    consolidation: Shipment[];
    expense: Expense;
    image_urls: string[];
    //[Shipment:]


    //[end]
}
export interface GetShipmentListResponse {
    shipments: Shipment[];
    meta: ResponseMeta;
    //[GetShipmentListResponse:]


    //[end]
}
export interface GetShipmentSingleRequest {
    code: string;
    //[GetShipmentSingleRequest:]


    //[end]
}
export interface GetShipmentSingleResponse {
    shipment: Shipment;
    //[GetShipmentSingleResponse:]


    //[end]
}
export interface ChangeShipmentStatusRequest {
    code: string;
    status: ShipmentStatus;
    //[ChangeShipmentStatusRequest:]


    //[end]
}
export interface ChangeShipmentStatusResponse {
    new_status: string;
    //[ChangeShipmentStatusResponse:]


    //[end]
}
export interface GetShipmentSummaryRequest {
    //[GetShipmentSummaryRequest:]


    //[end]
}
export interface GetShipmentSummaryResponse {
    not_arrived_count: number;
    not_claimed_count: number;
    //[GetShipmentSummaryResponse:]


    //[end]
}
export interface SResult {
    //[SResult:]


    //[end]
}
export interface GetTransactionSingleRequest {
    transaction_id: string;
    //[GetTransactionSingleRequest:]


    //[end]
}
export enum TransactionStatus {
    StatusUnapproved = 'status_unapproved',
    StatusApproved = 'status_approved',
    //[TransactionStatus:]


    //[end]
}
export enum TransactionCategory {
    CategoryPrepayment = 'category_prepayment',
    CategoryInternalTransfer = 'category_internal_transfer',
    CategoryPaymentFromCustomer = 'category_payment_from_customer',
    CategoryPaymentToPartner = 'category_payment_to_partner',
    CategoryRefundCashToCustomer = 'category_refund_cash_to_customer',
    CategoryRefundFromPartner = 'category_refund_from_partner',
    CategorySalary = 'category_salary',
    CategoryOtherExpense = 'category_other_expense',
    CategoryPayable = 'category_payable',
    CategoryReceivable = 'category_receivable',
    CategoryCashBack = 'category_cash_back',
    //[TransactionCategory:]


    //[end]
}
export enum TransactionType {
    TypeExpense = 'type_expense',
    TypeOutFlow = 'type_out_flow',
    TypeIncome = 'type_income',
    TypeInflow = 'type_inflow',
    //[TransactionType:]


    //[end]
}


export interface Transaction {
    id: string;
    relation_id: string;
    amount: Money;
    created_at: Date;
    type: TransactionType;
    category: TransactionCategory;
    status: TransactionStatus;
    transfer_id: string;
    note: string;
    exchange_rate: Decimal;
    //[Transaction:]


    //[end]
}
export interface GetTransactionSingleResponse {
    transaction: Transaction;
    //[GetTransactionSingleResponse:]


    //[end]
}
export interface GetTransactionListRequest {
    account_id: string;
    meta: RequestMeta;
    //[GetTransactionListRequest:]


    //[end]
}
export interface GetTransactionListResponse {
    transactions: Transaction[];
    meta: ResponseMeta;
    //[GetTransactionListResponse:]


    //[end]
}
export interface CreateTransactionRequest {
    account_id: string;
    relation_id: string;
    amount: Decimal;
    exchange_rate: Decimal;
    category: TransactionCategory;
    note: string;
    //[CreateTransactionRequest:]


    //[end]
}
export interface CreateTransactionResponse {
    transaction: Transaction;
    //[CreateTransactionResponse:]


    //[end]
}
export interface GetAccountSingleRequest {
    account_id: string;
    //[GetAccountSingleRequest:]


    //[end]
}
export interface Account {
    id: string;
    name: string;
    created_at: Date;
    //[Account:]


    //[end]
}
export interface GetAccountSingleResponse {
    account: Account;
    //[GetAccountSingleResponse:]


    //[end]
}
export interface GetAccountListRequest {
    meta: RequestMeta;
    //[GetAccountListRequest:]


    //[end]
}
export interface GetAccountListResponse {
    accounts: Account[];
    meta: ResponseMeta;
    //[GetAccountListResponse:]


    //[end]
}
export interface GetNoteListRequest {
    relation_id: string;
    meta: RequestMeta;
    //[GetNoteListRequest:]


    //[end]
}
export interface Note {
    id: string;
    relation_id: string;
    created_at: Date;
    modified_at: Date;
    created_by_account: string;
    created_by_full_name: string;
    text: string;
    fm_record_id: number;
    //[Note:]


    //[end]
}
export interface GetNoteListResponse {
    notes: Note[];
    meta: ResponseMeta;
    //[GetNoteListResponse:]


    //[end]
}
export interface GetNoteSingleRequest {
    note_id: string;
    //[GetNoteSingleRequest:]


    //[end]
}
export interface GetNoteSingleResponse {
    note: Note;
    //[GetNoteSingleResponse:]


    //[end]
}
export interface CreateNoteRequest {
    text: string;
    relation_id: string;
    //[CreateNoteRequest:]


    //[end]
}
export interface CreateNoteResponse {
    note: Note;
    //[CreateNoteResponse:]


    //[end]
}
export interface UpdateNoteRequest {
    note_id: string;
    text: string;
    relation_id: string;
    //[UpdateNoteRequest:]


    //[end]
}
export interface UpdateNoteResponse {
    note: Note;
    //[UpdateNoteResponse:]


    //[end]
}