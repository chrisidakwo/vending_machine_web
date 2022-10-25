import { Box, Button, FormControl, FormGroup, FormHelperText, TextField } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { asGuest, AuthContext } from "../../auth";
import { AuthLayout } from "../../components/layout";
import colors from "../../theme/definitions/colors";
import { FormField } from "../../ui-kit/form";

const StyledLink = styled(Link)`
  color: ${colors.grey.dark.lightest};
  font-size: 0.875rem;
`;

const Login = (): JSX.Element => {
  const { onLogin } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPasssword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setErrors({ username: '' });

    onLogin && onLogin({ username, password })
    .then(() => window.location.href = '/')
    .catch((error) => {
      const errors = error.response.data.errors ?? null;
      if (errors) {
        setErrors(errors);
      }
    });
  };

  return (
    <AuthLayout title={'Login'}>
      <form onSubmit={handleLogin}>
            <FormField>
              <FormGroup>
                <FormControl required>
                  <TextField
                    id={'username'}
                    type={'text'}
                    name={'username'}
                    label={'Username'}
                    placeholder={'Enter your username'}
                    value={username}
                    error={errors.username?.length > 0}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ color: colors.font }}
                    required
                  />
                </FormControl>
                <FormHelperText error={errors.username?.length > 0}>
                    {errors.username}
                </FormHelperText>
              </FormGroup>
            </FormField>

            <FormField>
              <FormGroup>
                <FormControl required>
                  <TextField
                    id={'password'}
                    type={'password'}
                    name={'password'}
                    label={'Password'}
                    placeholder={'Enter your password'}
                    value={password}
                    onChange={(e) => setPasssword(e.target.value)}
                    sx={{ color: colors.font }}
                    required
                  />
                </FormControl>
              </FormGroup>
            </FormField>

            <Button type='submit' variant={'contained'} color='primary' sx={{ marginBottom: '1rem' }} fullWidth>
              Login
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <StyledLink
                to={'/users/register'}
                onClick={(e) =>  {
                  e.preventDefault();
                  window.location.href = '/users/register';
                }}
              >
              Create Account
              </StyledLink>
            </Box>
          </form>
    </AuthLayout>
  );
}

export default asGuest(Login);