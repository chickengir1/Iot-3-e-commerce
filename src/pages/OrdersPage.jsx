import React, { useState, useEffect } from "react";
import OrderList from "../components/orders/OrderList";
import { PageContainer } from "../components/orders/styles/PageStyles";
import {
  PageLayout,
  SidebarLayout,
  ContentLayout,
} from "../GlobalStyles/LayoutStyles";
import Sidebar from "../components/sidebar/Sidebar";
import NavBar from "../components/nav/nav";
import useFetchData from "../hook/useFetchData";
import API_PATHS from "../utils/apiPaths";

const OrdersPage = () => {
  const { data: priceData, loading, error } = useFetchData(API_PATHS.PRODUCTS); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('cart'));
      if (storedOrders && priceData) {
        const formattedOrders = storedOrders.map((order, index) => {
          const orderItems = Object.entries(order.sizes).map(([size, quantity]) => {
            const product = priceData.find(p => p._id === order.productId);
            const productPrice = product?.price || 0;
            const totalPrice = productPrice * quantity;
            return {
              color: order.color,
              size,
              price: productPrice,
              totalPrice,
              stock: quantity,
              images: [
                "https://via.placeholder.com/150",
              ],
            };
          });

          return {
            order_date: new Date().toISOString().split('T')[0],
            order_id: (10000 + index).toString(),
            status: "주문 완료",
            product: {
              productId: order.productId,
              name: order.name,
              orderItems,
            },
          };
        });
        setOrders(formattedOrders);
      } else if (!storedOrders) {
        throw new Error("No orders data found in local storage");
      }
    } catch (err) {
      console.error("Error loading orders data:", err);
    }
  }, [priceData]); 

  const handleDelete = (orderId) => {
    const updatedOrders = orders.filter((order) => order.order_id !== orderId);
    setOrders(updatedOrders);
    const storedOrders = JSON.parse(localStorage.getItem('cart'));
    const updatedStoredOrders = storedOrders.filter((_, index) => (10000 + index).toString() !== orderId);
    localStorage.setItem('cart', JSON.stringify(updatedStoredOrders));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <NavBar />
      <PageLayout>
        <SidebarLayout>
          <Sidebar />
        </SidebarLayout>
        <ContentLayout>
          <div style={{ marginTop: "4rem" }}>
            <PageContainer>
              <OrderList orders={orders} onDelete={handleDelete} />
            </PageContainer>
          </div>
        </ContentLayout>
      </PageLayout>
    </>
  );
};

export default OrdersPage;
