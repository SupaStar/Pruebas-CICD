export class LoginResponse {
    token: string

    constructor(data: any) {
        this.token = data.token;
    }
}