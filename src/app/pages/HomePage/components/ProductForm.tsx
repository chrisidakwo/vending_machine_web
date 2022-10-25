import { FormGroup, FormControl, TextField, Button, FormHelperText } from "@mui/material";
import { FormEvent, useState } from "react";
import { useProductsApi } from "../../../api";
import colors from "../../../theme/definitions/colors";
import { FormField } from "../../../ui-kit/form";
import { Product } from "../../../utils/models";

export interface ProductFormProps {
  product?: Product;
  onSuccess: (product: Product) => void;
}

export const ProductForm = ({ product, onSuccess }: ProductFormProps): JSX.Element => {
  const [productName, setProductName] = useState(product?.productName ?? '');
  const [cost, setCost] = useState(product?.cost.toString() ?? '0');
  const [quantityAvailable, setQuantityAvailable] = useState(product?.amountAvailable.toString() ?? '0');

  const [errors, setErrors] = useState({
    product_name: [],
    cost: [],
    quantity_available: [],
  });

  const { createProduct } = useProductsApi();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    createProduct({
      product_name: productName,
      cost: parseInt(cost),
      quantity_available: parseInt(quantityAvailable),
    }).then((response: Product) => {
      setProductName('');
      setCost('');
      setQuantityAvailable('');

      onSuccess(response);
    }).catch((error) => {
      setErrors(error.errors);
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <FormGroup>
          <FormControl required>
            <TextField
              type={'text'}
              name={'product_name'}
              label={'Product Name'}
              placeholder={'Enter product name'}
              value={productName}
              error={errors.product_name?.length > 0}
              onChange={(e) => setProductName(e.target.value)}
              sx={{ color: colors.font }}
              required
            />
          </FormControl>
          <FormHelperText error={errors.product_name?.length > 0}>
              {errors.product_name}
          </FormHelperText>
        </FormGroup>
      </FormField>

      <FormField>
        <FormGroup>
          <FormControl required>
            <TextField
              type={'number'}
              name={'cost'}
              label={'Product Cost'}
              placeholder={'Enter product cost'}
              value={cost}
              error={errors.cost?.length > 0}
              onChange={(e) => setCost(e.target.value)}
              sx={{ color: colors.font }}
              required
            />
          </FormControl>
          <FormHelperText error={errors.cost?.length > 0}>
              {errors.cost}
          </FormHelperText>
        </FormGroup>
      </FormField>

      <FormField>
        <FormGroup>
          <FormControl required>
            <TextField
              type={'number'}
              name={'quantity_available'}
              label={'Available Quantity'}
              placeholder={'Product available quantity'}
              value={quantityAvailable}
              error={errors.quantity_available?.length > 0}
              onChange={(e) => setQuantityAvailable(e.target.value)}
              sx={{ color: colors.font }}
              required
            />
          </FormControl>
          <FormHelperText error={errors.quantity_available?.length > 0}>
              {errors.quantity_available}
          </FormHelperText>
        </FormGroup>
      </FormField>

      <Button type='submit' variant={'contained'} color={'primary'}>Add Product</Button>
    </form>
  );
};
