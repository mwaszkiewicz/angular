declare module namespace {

    export interface Subject {
        OU: string[];
        CN: string;
    }

    export interface Issuer {
        C: string;
        ST: string;
        L: string;
        O: string;
        CN: string;
    }

    export interface InfoAccess {
        CA_Issuers_URI: string[];
        OCSP_URI: string[];
    }

    export interface CertificateDTO {
        subject: Subject;
        issuer: Issuer;
        subjectaltname: string;
        infoAccess: InfoAccess;
        modulus: string;
        exponent: string;
        pubkey: string;
        valid_from: string;
        valid_to: string;
        fingerprint: string;
        fingerprint256: string;
        ext_key_usage: string[];
        serialNumber: string;
        raw: string;
    }

}
