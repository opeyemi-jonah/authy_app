export class User {
    constructor(
        public email: string,
        public passwordHash: string,
        public role: string = "teacher"
    ) {}
}