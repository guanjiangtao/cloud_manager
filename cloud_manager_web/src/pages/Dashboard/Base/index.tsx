import React, { memo } from 'react';
import TopPanel from './components/TopPanel';
import MiddleChart from './components/MiddleChart';
import RankList from './components/RankList';

const DashBoard = () => (
  <div style={{ overflowX: 'hidden' }}>
    <TopPanel />
    <MiddleChart />
    <RankList />
  </div>
);

export default memo(DashBoard);
