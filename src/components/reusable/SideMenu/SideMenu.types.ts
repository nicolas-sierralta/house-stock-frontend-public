import { NavigationProp, ParamListBase } from '@react-navigation/native';

export type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
  navigation: NavigationProp<ParamListBase>;
};
