import { useLocalStorage } from 'react-use';
import { FormGroup, FormControl, FormHelperText, Button, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { FormField } from "../../ui-kit/form";
import { Auth, AuthContext } from '../../auth';
import { FormEvent, useContext, useState } from 'react';
import colors from '../../theme/definitions/colors';
import { useUserApi } from '../../api';
import { User } from '../../utils/models';

export interface DepositFormProps {
  onDeposit: (user: User) => void;
}

const MenuProps = {
  PaperProps: {
      style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
      },
  },
};

export const DepositForm = ({ onDeposit }: DepositFormProps): JSX.Element => {
  const [auth, setAuth] = useLocalStorage<Auth>('auth');
  const { user } = useContext(AuthContext);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [errors, setErrors] = useState({
    deposit: [],
  });

  const { deposit, resetDeposit } = useUserApi();

  const resetDepositRequest = (): void => {
    if (confirm('Your deposit amount will be set to zero (0). This action cannot be reversed!')) {
      resetDeposit()
      .then((user) => {
        setAuth((auth) => {
          return {
            accessToken: auth?.accessToken as string | null,
            user,
          }
        });

        onDeposit(user);
      }).catch((error) => {
        setErrors(error.errors);
      });
    }
  }

  const handleDepositFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    deposit(depositAmount)
    .then((user) => {
      setAuth((auth) => {
        return {
          accessToken: auth?.accessToken as string | null,
          user,
        }
      });

      setDepositAmount(0);
      onDeposit(user);
    }).catch((error) => {
      setErrors(error.errors);
    });
  };

  return (
    <form onSubmit={handleDepositFormSubmit}>
      <FormField>
        <FormGroup>
          <FormControl required>
            <InputLabel id="role-label" sx={{ color: colors.font }}>
              Deposit Amount
            </InputLabel>
            <Select
              labelId="role-label"
              id="deposit"
              name={'deposit'}
              placeholder={'Select deposit amount'}
              value={depositAmount}
              onChange={(e) => setDepositAmount(parseInt(e.target.value.toString()))}
              input={<OutlinedInput label="Deposit Amount"/>}
              MenuProps={MenuProps}
              sx={{color: colors.font}}
              required
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText error={errors.deposit?.length > 0}>
              {errors.deposit}
          </FormHelperText>
        </FormGroup>
      </FormField>

      <Button type={'submit'} variant={'contained'}>Deposit</Button>
      <Button type={'button'} sx={{ marginLeft: '1rem' }} color={'warning'} onClick={resetDepositRequest}>
        Reset Deposit
      </Button>
    </form>
  );
};

