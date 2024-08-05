import React from 'react';
import { TouchableWithoutFeedback, Keyboard, ActivityIndicator, View } from 'react-native';
import { Container, Logo, Title, TextInput, Button, LinkFooter, DateInput } from '../../components/reusable';
import styles from './RegisterScreen.styles';
import useRegister from '../../hooks/useRegister';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * RegisterScreen component allows the user to create a new account.
 *
 * @returns {JSX.Element} The rendered RegisterScreen component.
 */
const RegisterScreen: React.FC = () => {
    const {
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        dateOfBirth,
        showDatePicker,
        setShowDatePicker,
        loading,
        handleRegister,
        onChangeDate,
    } = useRegister();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Logo source={require('../../assets/logo.png')} />
                <Title text="Create a new account" />
                <TextInput
                    placeholder="Full Name"
                    value={fullName ?? ''}
                    onChangeText={setFullName}
                />
                <TextInput
                    placeholder="Email"
                    value={email ?? ''}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder="Password"
                    value={password ?? ''}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword ?? ''}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <DateInput onPress={() => setShowDatePicker(true)} dateOfBirth={dateOfBirth} />
                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <Button onPress={handleRegister} text="Sign Up" />
                <LinkFooter text="Already have an account?" linkText="Login" linkRoute="Login" />
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default RegisterScreen;



