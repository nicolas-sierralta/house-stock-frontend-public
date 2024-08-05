export interface LinkFooterProps {
    text: string;
    linkText: string;
    linkRoute: keyof RootStackParamList;
}

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

