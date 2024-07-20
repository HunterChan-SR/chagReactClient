export type BeanUser = {
    id: number;
    username: string;
    password: string;
    nickname: string;
    rating: number;
    ranking: number;
}
export type BeanModifyPassword = {
    id: string,
    password: string,
    newPassword: string,
}
