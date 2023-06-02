export interface ResponseDataOptions {
    about?: string;
    title?: string;
    logo?: string;
    keywords?: string;
    typography?: string[];
    colors?: Array<Array<number>>
}

export interface ResponseBody {
    code: number;
    data: ResponseDataOptions | any;
    success: boolean;
    timestamp: string;
    message: string;
}