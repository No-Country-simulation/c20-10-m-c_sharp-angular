export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    nombre?: string;
    imagen?: string;
}

export interface User {
    fecha: Date;
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}
