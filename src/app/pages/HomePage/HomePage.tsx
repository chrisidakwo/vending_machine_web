/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, FormControl, FormGroup, FormHelperText, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocalStorage } from 'react-use';
import { useProductsApi } from "../../api";
import { Auth, AuthContext } from "../../auth";
import { withAuth } from "../../auth/withAuth";
import { DefaultLayout, SectionContainer } from "../../components/layout";
import { ProductCard } from "../../components/product-card";
import colors from "../../theme/definitions/colors";
import { FormField } from "../../ui-kit/form";
import { Modal } from "../../ui-kit/modal";
import { Product, User } from "../../utils/models";
import { ProductForm } from "./components";

const HomePage = (): JSX.Element => {
  const [, setAuth] = useLocalStorage<Auth>('auth');
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmPurchaseModal, setConfirmPurchaseModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState('0');
  const [errors, setErrors] = useState({
    quantity: [],
  });
  const { getProducts, buyProduct } = useProductsApi();

  /**
   * @param event 
   * @param reason 
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleModalClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void => {
    if (reason === 'backdropClick') {
      return;
    }

    setOpenModal(false);
    setConfirmPurchaseModal(false);
  }

  /**
   * @param product 
   */
  const onProductAdded = (product: Product): void => {
    setProducts((products) => [product, ...products]);
    setOpenModal(false);
  };

  const purchaseProduct = (): void => {
    if (parseInt(purchaseQuantity) == 0) {
      setErrors({
        // @ts-ignore
        quantity: ['Quantity should be at least 1'],
      });
    } else if (errors.quantity.length > 0 && parseInt(purchaseQuantity) > 0) {
      setErrors({
        quantity: [],
      });
    }

    buyProduct(selectedProduct as Product, parseInt(purchaseQuantity)).then((response: any) => {
      console.log('purchase response', response);

      setAuth((auth) => {
        return {
          accessToken: auth?.accessToken as string | null,
          user: { ...auth?.user, deposit: response.remainingDeposit } as User,
        }
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        setErrors(error.response.data.errors);
      }
    })
  };

  useEffect(() => {
    getProducts().then((products: Product[]) => {
      setProducts(products);
    });
  }, []);

  return (
    <DefaultLayout>
      <SectionContainer>
        {user?.role === 'seller' && (
          <React.Fragment>
            <Box sx={{ width: '100%', marginBottom: '15px', paddingBottom: '5px' }}>
              <Button type={'button'} variant={'contained'} color={'primary'} onClick={() => setOpenModal(true)}>
                Add Product
              </Button>
            </Box>

            <Modal
              open={openModal}
              onClose={handleModalClose}
              title={'New Product'}
            >
              <ProductForm onSuccess={onProductAdded} />
            </Modal>
          </React.Fragment>
        )}

        {user?.role === 'buyer' && selectedProduct && (
          <Modal
            open={confirmPurchaseModal}
            onClose={handleModalClose}
            title={`Buy Product: ${selectedProduct.productName}`}
          >
            <React.Fragment>
              <FormField>
                <FormGroup>
                  <FormControl required>
                    <TextField
                      type={'number'}
                      name={'quantity'}
                      label={'Purchase Quantity'}
                      placeholder={'Enter quantity'}
                      value={purchaseQuantity}
                      error={errors.quantity?.length > 0}
                      onChange={(e) => setPurchaseQuantity(e.target.value)}
                      sx={{ color: colors.font }}
                      required
                    />
                  </FormControl>
                  <FormHelperText error={errors.quantity?.length > 0}>
                      {errors.quantity}
                  </FormHelperText>
                </FormGroup>
              </FormField>

              <Button variant={'contained'} onClick={purchaseProduct}>Buy Product</Button>
            </React.Fragment>
          </Modal>
        )}

        {products.length > 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '100%' }}>
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onProductClicked={(product: Product) => {
                  setSelectedProduct(product);
                  setConfirmPurchaseModal(true);
                }}
              />
            ))}
          </Box>
        ): (
          <Box sx={{ width: '100%', textAlign: 'center', padding: '80px 0' }}>
            <Typography variant={'h6'} sx={{ color: colors.grey.light.darkest }}>There are no products</Typography>
          </Box>
        )}


      </SectionContainer>
    </DefaultLayout>
  );
};

export default withAuth(HomePage);
