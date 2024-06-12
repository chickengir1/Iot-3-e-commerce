import React from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Sidebar from "../components/sidebar/Sidebar";
import {
  PageLayout,
  SidebarLayout,
  ContentLayout,
} from "../GlobalStyles/LayoutStyles";
import NavBar from "../components/nav/nav";
import Footer from "../components/footer/footer";
import useFetchData from "../hook/useFetchData";

const DashboardPage = () => {
  const { data, loading, error } = useFetchData("http://localhost:8000/api/product");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  const uniqueBrands = data ? data.reduce((acc, product) => {
    if (!acc.includes(product.brand._id)) {
      acc.push(product.brand._id);
    }
    return acc;
  }, []) : [];

  const total = {
    priceData: {
      totalSales: 45231890,
      totalProducts: data ? data.length : 0,
      totalBrands: uniqueBrands.length,
      totalStock: data ? data.reduce((acc, product) => acc + product.price, 0) : 0,
    }
  };

  return (
    <>
      <NavBar />
      <PageLayout>
        <SidebarLayout>
          <Sidebar />
        </SidebarLayout>
        <ContentLayout>
            <Dashboard data={{ productList: data }} total={total} />
        </ContentLayout>
      </PageLayout>
      <Footer />
    </>
  );
};

export default DashboardPage;
