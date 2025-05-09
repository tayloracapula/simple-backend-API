export interface NewUserData {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    role?: string;
    department?: string;
    /**When creating a new user if omitted and role is "manager" then the user will be marked to manage themselves otherwise it will return an error*/
    managerID?: number;
}
