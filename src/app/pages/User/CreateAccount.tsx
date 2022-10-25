import { Box, Button, FormControl, FormGroup, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, styled, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useUserApi } from '../../api';
import { Auth, asGuest } from '../../auth';
import { AuthLayout } from '../../components/layout';
import colors from '../../theme/definitions/colors';
import { FormField } from '../../ui-kit/form';
import { UserRole } from '../../utils/models';

const StyledLink = styled(Link)`
  color: ${colors.grey.dark.lightest};
  font-size: 0.875rem;
`;

const MenuProps = {
  PaperProps: {
      style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
      },
  },
};

const CreateAccount = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    password_confirmation: [],
  });
  const [, setAuth] = useLocalStorage<Auth>('auth', {
    accessToken: null,
    user: null,
  });

  const { createAccount } = useUserApi();

  const handleRoleChange = (event: SelectChangeEvent): void => {
    setRole(event.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setErrors({ username: [], password: [], password_confirmation: [] });

    createAccount({
      username,
      password,
      password_confirmation: passwordConfirmation,
      role: role as UserRole,
    }).then((response: any) => {
      const user = response.data;
      const accessToken = response.meta.accessToken;

      setAuth({
        accessToken: accessToken,
        user: user,
      });

      setUsername('');
      setPassword('');
      setPasswordConfirmation('');
      setRole('');

      window.location.href = '/';
    }).catch((error) => {
      const errors = error.response.data.errors;
      setErrors(errors);
    });
  };

  return (
    <AuthLayout title={'Create New Account'}>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormGroup>
            <FormControl required>
              <TextField
                id='username'
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
                id='password'
                type={'password'}
                name={'password'}
                label={'Password'}
                placeholder={'Enter your password'}
                value={password}
                error={errors.password?.length > 0}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ color: colors.font }}
                required
              />
            </FormControl>
            <FormHelperText error={errors.password?.length > 0}>
                {errors.password}
            </FormHelperText>
          </FormGroup>
        </FormField>

        <FormField>
          <FormGroup>
            <FormControl required>
              <TextField
                id='password_confirmation'
                type={'password'}
                name={'password_confirmation'}
                label={'Confirm Password'}
                placeholder={'Confirm your password'}
                value={passwordConfirmation}
                error={errors.password?.length > 0}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                sx={{ color: colors.font }}
                required
              />
            </FormControl>
          </FormGroup>
        </FormField>

        <FormField>
          <FormGroup>
            <FormControl required>
              <InputLabel id="role-label" sx={{ color: colors.font }}>
                Role
              </InputLabel>
              <Select
                  labelId="role-label"
                  id="role"
                  name={'role'}
                  placeholder={'Are you a buyer or a seller?'}
                  value={role}
                  onChange={handleRoleChange}
                  input={<OutlinedInput label="Role"/>}
                  MenuProps={MenuProps}
                  sx={{color: colors.font}}
              >
                  <MenuItem value={'buyer'}>Buyer</MenuItem>
                  <MenuItem value={'seller'}>Seller</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </FormField>

        <Button type={'submit'} variant={'contained'} sx={{ marginBottom: '1rem' }}  fullWidth>
          Create Account
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <StyledLink
            to={'/login'}
            onClick={(e) =>  {
              e.preventDefault();
              window.location.href = '/login';
            }}
          >
            Back to Login
          </StyledLink>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default asGuest(CreateAccount);
