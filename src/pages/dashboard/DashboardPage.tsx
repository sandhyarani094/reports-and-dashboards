import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const DashboardPage = () => {
  const isClient = typeof window !== 'undefined';
  const defaultLayout = [
    { i: 'item-1', x: 0, y: 0, w: 6, h: 1 },
    { i: 'item-2', x: 8, y: 0, w: 5, h: 1 },
  ];

  const [layout, setLayout] = useState([{}]);

  useEffect(() => {
    let dashboardLayout = localStorage.getItem("dashboardLayout");
    if(dashboardLayout) {
      setLayout(JSON.parse(dashboardLayout));
    } else {
      setLayout(defaultLayout);
    }
  },[])

  useEffect(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
  }, [layout]);

  const handleOnLayoutChange = (event) => {
    console.log(event);
    setLayout(event);
  }


  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={100}
      onLayoutChange={handleOnLayoutChange}
      // onDragStop ={(e)=> console.log(e)} 
      width={900}>
      <Card key="item-1">Item 1</Card>
      <Card key="item-2">Item 2</Card>
    </GridLayout>
  );
};

export default DashboardPage;
