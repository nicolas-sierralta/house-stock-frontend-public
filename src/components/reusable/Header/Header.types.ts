import { NavigationProp, ParamListBase } from '@react-navigation/native';

export type HeaderCommonProps = {
  title: string;
  toggleView: () => void;
};

export type HeaderProps = HeaderCommonProps & {
  navigation: NavigationProp<ParamListBase>;
};

export type RootStackParamList = {
    Profile: undefined;
    Inventory: undefined;
    ShoppingList: undefined;
    Login: undefined;
  };
  