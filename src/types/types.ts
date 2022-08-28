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