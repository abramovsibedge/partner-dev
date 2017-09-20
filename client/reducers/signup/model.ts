export class SignUpModel {
    companyName: string;
    email: string;
    firstName: string;
    lastName: string;
    message: string;
    numberOfUsers: any[];
    numberOfUsersSelected: string;
    password: string;
    passwordAgain: string;
    products: any[];
    productsSelected: string;
    success: boolean;
    tos: boolean;
    valid: boolean;
};

export type SignUpModelStatus = {
    statusSignUp: boolean,
    errorMessages: string,
};

export type IState = SignUpModelStatus;