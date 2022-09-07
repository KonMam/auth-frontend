export type Users = [{
    id: number,
    email: string,
    password: string
}];

export type TApiResponse<T> = {
    status: Number;
    statusText: String;
    data: T;
    error: any;
    loading: Boolean;
};

export type ToDos = [{
    id: number,
    userId: number
    text: string,
    status: boolean
}];

export type Credentials = {
    username?: string
    email: string
    password: string
}