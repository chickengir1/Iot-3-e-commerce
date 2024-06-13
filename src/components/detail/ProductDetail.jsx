import React, { useState } from 'react';
import { Container, ImageContainer, InfoContainer, ProductImage, ProductTitle, ProductPrice } from './styles/ProductDetailStyles';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import QuantitySelector from './QuantitySelector';
import ProductDescription from './ProductDescription';
import RelatedProducts from './RelatedProducts';
import { CheckoutButton, WishlistButton } from "./styles/AddToWishlistButtonStyles";

const ProductDetail = ({ product, relatedProducts = [] }) => {
  const placeholderImage = 'https://via.placeholder.com/150';
  const productImage = product?.images?.length > 0 ? product.images[0] : placeholderImage;

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchProductIdFromDB = async () => {
    return product.id;
  };

  const handleAddToWishlist = async () => {
    const productId = await fetchProductIdFromDB();

    const cartItem = {
      productId: productId,
      color: selectedColor,
      sizes: {
        [selectedSize]: quantity
      }
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItemIndex = cart.findIndex(item => item.productId === productId && item.color === selectedColor);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].sizes[selectedSize] = (cart[existingItemIndex].sizes[selectedSize] || 0) + quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('장바구니에 추가되었습니다.');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container>
      <ImageContainer>
        <ProductImage src={productImage} alt={product.name} />
      </ImageContainer>
      <InfoContainer>
        <ProductTitle>{product.name}</ProductTitle>
        <p style={{ marginTop: "5px", opacity: "0.7" }}>{product.description}</p>
        <ProductPrice>{product.price.toLocaleString('ko-KR')} 원</ProductPrice>
        <ColorSelector colors={product.colors || []} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        <SizeSelector sizes={product.sizes || []} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <div style={{ display: "flex", gap: "15px" }}>
          <WishlistButton onClick={handleAddToWishlist}>장바구니에 추가</WishlistButton>
          <CheckoutButton>결제하기</CheckoutButton>
        </div>
      </InfoContainer>
      <div style={{ width: "100%" }}>
        <ProductDescription description={product.longdescription} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </Container>
  );
};

export default ProductDetail;
