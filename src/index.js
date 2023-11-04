import React from 'react';
import ReactDOM from 'react-dom/client';
import PageMain from "pages/PageMain";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <PageMain app_name={"fracto-inspector"}/>
  </React.StrictMode>
);

