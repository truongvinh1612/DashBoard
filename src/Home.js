import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { MdTableBar } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { ResponsiveContainer } from 'recharts';

import OrdersChart from './ChartDoanhThu';
import ThucUong from './ChartThucUongTheoLoai';

function Home() {
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [numberOfTables, setNumberOfTables] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
      fetch('http://localhost:8080/api/orders')
          .then(response => response.json())
          .then(data => {
              setNumberOfOrders(data.length);
          })
          .catch(error => console.error('Error fetching orders:', error));

      fetch('http://localhost:8080/api/table')
          .then(response => response.json())
          .then(data => {
              setNumberOfTables(data.length);
          })
          .catch(error => console.error('Error fetching tables:', error));
      fetch('http://localhost:8080/api/products')
          .then(response => response.json())
          .then(data => {
            
              setNumberOfProducts(data.length);
          })
          .catch(error => console.error('Error fetching products:', error));
  }, []);
    
    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>KHÁCH HÀNG</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>SẢN PHẨM</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{numberOfProducts}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>BÀN</h3>
                        <MdTableBar className='card_icon'/>
                    </div>
                    <h1>{numberOfTables}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>HOÁ ĐƠN</h3>
                        <FaFileInvoiceDollar className='card_icon'/>
                    </div>
                    <h1>{numberOfOrders}</h1>
                </div>
            </div>

            <div className='charts'>
                <div className='chart-container' style={{ marginBottom: '70px' }}>
                    <h2 className='chart-title'>Biểu đồ doanh thu theo từng tháng</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <OrdersChart/>
                    </ResponsiveContainer>
                </div>

                <div className='chart-container' style={{ marginBottom: '70px' }}>
                    <h2 className='chart-title'>Biểu đồ thức uống yêu thích</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <ThucUong />
                    </ResponsiveContainer>
                </div>
                
                
            </div>
        </main>
    );
}

export default Home;
