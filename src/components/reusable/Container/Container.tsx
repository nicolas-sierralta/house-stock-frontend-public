import styled from 'styled-components/native';

/**
 * Container component.
 *
 * A styled View component that centers its children both vertically and horizontally.
 * It also applies padding and a background color.
 */
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f5;
`;

export default Container;
