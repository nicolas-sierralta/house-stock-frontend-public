import React from 'react';
import { ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import SideMenu from '../../components/reusable/SideMenu/SideMenu';
import HeaderCommon from '../../components/reusable/Header/Header';
import useProfile from '../../hooks/useProfile';
import { User } from '../../types/types';
import {
  Container,
  ContentContainer,
  ProfileDetail,
  Label,
  AvatarLabel,
  InputContainer,
  Input,
  EditButton,
  ButtonText,
  ButtonContainer,
  ProfileImage,
} from './ProfileScreen.styles';

type ProfileScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const {
    userData,
    setUserData,
    datePickerVisible,
    setDatePickerVisible,
    passwordModalVisible,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    sideMenuVisible,
    handleSaveChanges,
    handleChangePassword,
    openPasswordModal,
    closePasswordModal,
    toggleSideMenu,
    hasChanges,
  } = useProfile();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${selectedDate.getFullYear()}`;
      setUserData({ ...userData, dateOfBirth: formattedDate } as User);
    }
  };

  if (!userData) {
    return (
      <Container>
        <HeaderCommon title="Profile" toggleView={toggleSideMenu} />
        <ProfileDetail>
          <Label>Loading...</Label>
        </ProfileDetail>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderCommon title="Profile" toggleView={toggleSideMenu} />
      <ContentContainer>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ProfileDetail>
            <ProfileImage source={require('../../assets/profile-picture-example.png')} />
            <AvatarLabel>Avatar</AvatarLabel>
            <Label>Full Name</Label>
            <InputContainer>
              <Icon name="account" size={24} color="#050315" />
              <Input
                value={userData.fullName}
                placeholder="Enter your name"
                onChangeText={(text) => setUserData({ ...userData, fullName: text } as User)}
              />
            </InputContainer>
            <Label>Email</Label>
            <InputContainer style={{ backgroundColor: '#f0f0f0' }}>
              <Icon name="email" size={24} color="#050315" />
              <Input value={userData.email} placeholder="Enter your email" editable={false} />
            </InputContainer>
            <Label>Password</Label>
            <InputContainer style={{ backgroundColor: '#f0f0f0' }}>
              <Icon name="lock" size={24} color="#050315" />
              <Input value="********" placeholder="Enter your password" secureTextEntry editable={false} />
            </InputContainer>
            <Label>Date of Birth</Label>
            <InputContainer>
              <Icon name="calendar" size={24} color="#050315" />
              <Input
                value={userData.dateOfBirth}
                placeholder="Enter your date of birth"
                onFocus={() => setDatePickerVisible(true)}
              />
            </InputContainer>
            {datePickerVisible && (
              <DateTimePicker
                value={userData.dateOfBirth ? new Date(userData.dateOfBirth.split('/').reverse().join('-')) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <ButtonContainer>
              <EditButton onPress={handleSaveChanges} disabled={!hasChanges} style={{ backgroundColor: hasChanges ? '#2f27ce' : '#b0b0b0' }}>
                <ButtonText>Save changes</ButtonText>
              </EditButton>
              <EditButton onPress={openPasswordModal}>
                <ButtonText>Change Password</ButtonText>
              </EditButton>
            </ButtonContainer>
          </ProfileDetail>
        </ScrollView>
        <Modal isVisible={passwordModalVisible} onBackdropPress={closePasswordModal}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Label>Old Password</Label>
            <InputContainer>
              <Icon name="lock" size={24} color="#050315" />
              <Input
                value={oldPassword}
                placeholder="Enter old password"
                secureTextEntry
                onChangeText={setOldPassword}
              />
            </InputContainer>
            <Label>New Password</Label>
            <InputContainer>
              <Icon name="lock" size={24} color="#050315" />
              <Input
                value={newPassword}
                placeholder="Enter new password"
                secureTextEntry
                onChangeText={setNewPassword}
              />
            </InputContainer>
            <Label>Confirm New Password</Label>
            <InputContainer>
              <Icon name="lock" size={24} color="#050315" />
              <Input
                value={confirmPassword}
                placeholder="Confirm new password"
                secureTextEntry
                onChangeText={setConfirmPassword}
              />
            </InputContainer>
            <ButtonContainer>
              <EditButton onPress={handleChangePassword}>
                <ButtonText>Save changes</ButtonText>
              </EditButton>
              <EditButton onPress={closePasswordModal}>
                <ButtonText>Cancel</ButtonText>
              </EditButton>
            </ButtonContainer>
          </View>
        </Modal>
        <SideMenu
          visible={sideMenuVisible}
          onClose={toggleSideMenu}
          navigation={navigation}
        />
      </ContentContainer>
    </Container>
  );
};

export default ProfileScreen;
