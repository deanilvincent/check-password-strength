declare module 'check-password-strength' {
    function check_password_strength(password:any): {id: number, value: string};
    export = check_password_strength;
}
