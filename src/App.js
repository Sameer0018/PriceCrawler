import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/components/Pages/Home';
import Fitness from '../src/components/Pages/Fitness';
import Filterdata from '../src/components/Pages/Filterdata';
import Websitejson from '../src/components/Pages/Websitejson';
import Converttext from '../src/components/Pages/Converttext';
import PlansList from '../src/components/Pages/PlansList';
import Uploadjsondb from './components/Pages/Uploadjsondb';
import PriceCrawler from './components/Pages/PriceCrawler';
import Layout from '../src/components/Layout/Layout';
import PriceCrawlerdate from './components/Pages/PriceCrawlerdate';
import Login from './components/Pages/Login';

function App() {
  return (
        <Router>
        {/* <Layout> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/websitejson" element={<Websitejson />} />
            <Route path="/filterdata" element={<Filterdata />} />
            <Route path="/Converttext" element={<Converttext />} />
            <Route path="/PlansList" element={<PlansList />} />
            <Route path="/Uploadjsondb" element={<Uploadjsondb />} />
            <Route path="/PriceCrawler" element={<PriceCrawler />} />
            <Route path="/PriceCrawlerdate" element={<PriceCrawlerdate />} />

          </Routes>
          {/* </Layout> */}
    </Router>
  );
}

export default App;
