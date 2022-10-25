import { Box, Card } from "@mui/material";
import styled from "styled-components";
import { Product } from "../../utils/models";

export interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  height: 95px;
  width: 150px;
  margin: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const ProductName = styled.div`
  display: block;
  text-align: center;
  font-size: 0.875rem;
  max-height: 40px;
  margin-bottom: 10px;
  overflow-y: hidden;
  text-overflow: ellipsis;
`;

const ProductCost = styled.span`
  display: block;
  text-align: center;
  font-weight: 700;
`;

export const ProductCard = ({ product }: ProductCardProps): JSX.Element => {

  const onProductClicked = (product: Product): void => {
    alert(product.productName);
  };

  return (
    <StyledCard onClick={() => onProductClicked(product)}>
      <ProductName>{product.productName}</ProductName>
      <ProductCost>${product.cost}</ProductCost>
    </StyledCard>
  );
};
