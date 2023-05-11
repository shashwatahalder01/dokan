export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // [key: string]: string
            ADMIN: string;
            ADMIN_PASSWORD: string;
            VENDOR: string;
            VENDOR_PASSWORD: string;
            CUSTOMER: string;
            CUSTOMER_PASSWORD: string;
            GMAP: string;
            BASE_URL:string;
            QUERY:string;
            HEADLESS: string;
            SLOWMO: string;
            DEVTOOLS: string;
            RETRY_TIMES: string;
            TIME_OUT: string;
            SERVER_URL: string;
            ADMIN_AUTH: string;
            VENDOR_AUTH: string;
            CUSTOMER_AUTH: string;
            nonce: string;


        }
    }
}
