import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { ButtonStyled, TitleStyled } from "./styles/Content";
import { AddProductLayOut } from "./styles/AddProductLayOut";
import useProductForm from "../../hook/useProductForm";
import Notification from "../notification/Notification"

const ProductRoot = () => {
  const apiUrl = "/api/admin/products";
  const brandUrl = "/api/brand";
  const categoryUrl = "/api/category";

  const { handleProductChange, handleAddProduct } = useProductForm(apiUrl);
  const [notification, setNotification] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const [brandResponse, categoryResponse] = await Promise.all([
          fetch(brandUrl),
          fetch(categoryUrl),
        ]);
        const brandsData = await brandResponse.json();
        const categoriesData = await categoryResponse.json();
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching brands and categories:", error);
      }
    };

    fetchBrandsAndCategories();
  }, [brandUrl, categoryUrl]);

  const handleButtonClick = () => {
    if (!selectedCategory || !selectedBrand) {
      console.error("Category and Brand are required.");
      return;
    }
    handleAddProduct(selectedCategory, selectedBrand);
    setNotification("제품이 성공적으로 등록되었습니다.");
    setTimeout(() =>  setNotification(""), 1000);
    setTimeout(() =>  window.location.reload(), 1500);
  };

  const handleFormChange = (field, value) => {
    handleProductChange(field, value);
  };

  return (
    <div style={{ paddingTop: "5rem", height: "100%" }}>
       {notification && <Notification message={notification} />}
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "5rem",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <TitleStyled>제품 추가</TitleStyled>
      </div>
      <AddProductLayOut>
        <AddProduct
          onChange={handleFormChange}
          brands={brands}
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          setSelectedBrand={setSelectedBrand}
        />
        <div
          style={{
            display: "flex",
            height: "5rem",
            justifyContent: "end",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <ButtonStyled onClick={handleButtonClick}>저장</ButtonStyled>
        </div>
      </AddProductLayOut>
    </div>
  );
};

export default ProductRoot;
