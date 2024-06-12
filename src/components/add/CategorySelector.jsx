import React from "react";
import { StyledSelect } from "./styles/Content";

const CategorySelector = ({ setSelectedCategory, setSelectedBrand, brands, categories }) => {
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  return (

      <div style={{ display: "flex", flexDirection: "row", gap: "15px", width: "100%" }}>
        <StyledSelect onChange={handleCategoryChange}>
          <option value="">카테고리 선택</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </StyledSelect>

        <StyledSelect onChange={handleBrandChange}>
          <option value="">브랜드 선택</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </StyledSelect>
      </div>

  );
};

export default CategorySelector;
