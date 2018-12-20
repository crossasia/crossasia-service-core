/* Do not change, this code is generated from Golang structs */


export interface Service {
    //[Service:]


    //[end]
}
export interface TrackShipmentRequest {
    code: string;
    //[TrackShipmentRequest:]


    //[end]
}
export interface TrackShipmentResponse {
    code: string;
    current_status: string;
    statuses: {[key: string]: Date};
    from: string;
    to: string;
    //[TrackShipmentResponse:]


    //[end]
}
export interface RequestQuotationRequest {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    question: string;
    type: string;
    //[RequestQuotationRequest:]


    //[end]
}
export interface RequestQuotationResponse {
    id: string;
    //[RequestQuotationResponse:]


    //[end]
}
export interface RestorePasswordRequest {
    email: string;
    //[RestorePasswordRequest:]


    //[end]
}
export interface RestorePasswordResponse {
    //[RestorePasswordResponse:]


    //[end]
}
export interface CheckRestoreTokenRequest {
    token: string;
    //[CheckRestoreTokenRequest:]


    //[end]
}
export interface CheckRestoreTokenResponse {
    username: string;
    //[CheckRestoreTokenResponse:]


    //[end]
}
export interface ChangeUserPasswordRequest {
    restore_token: string;
    new_password: string;
    new_password_check: string;
    //[ChangeUserPasswordRequest:]


    //[end]
}
export interface ChangeUserPasswordResponse {
    //[ChangeUserPasswordResponse:]


    //[end]
}