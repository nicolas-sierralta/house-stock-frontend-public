import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Container, Logo, Title, TextInput, Button, LinkFooter } from '../../components/reusable';
import styles from './LoginScreen.styles';
import useLogin from '../../hooks/useLogin';

/**
 * LoginScreen component provides the UI for user login.
 *
 * 
 * @returns {JSX.Element} The rendered LoginScreen component.
 */
const LoginScreen: React.FC = () => {
  const { email, setEmail, password, setPassword, loading, handleLogin } = useLogin();

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
        <Title text="Welcome to House Stock" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          onPress={handleLogin}
          text="Login"
          disabled={loading}
        />
        <LinkFooter
          text="Don't have an account?"
          linkText="Sign up"
          linkRoute="Register"
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;