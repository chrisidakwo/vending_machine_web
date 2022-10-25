import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useProductsApi } from "../../api";
import { AuthContext } from "../../auth";
import { withAuth } from "../../auth/withAuth";
import { DefaultLayout, SectionContainer } from "../../components/layout";
import { ProductCard } from "../../components/product-card";
import colors from "../../theme/definitions/colors";
import { Modal } from "../../ui-kit/modal";
import { Product } from "../../utils/models";
import { ProductForm } from "./components";

const HomePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { getProducts } = useProductsApi();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleModalClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void => {
    if (reason === 'backdropClick') {
      return;
    }

    setOpenModal(false);
  }

  const onProductAdded = (product: Product): void => {
    setProducts((products) => [product, ...products]);
    setOpenModal(false);
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

        {products.length > 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '100%' }}>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
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
