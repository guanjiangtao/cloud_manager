import React, { useState } from 'react';
import { Col, Row, Card } from 'tdesign-react';
import ReactEcharts from 'echarts-for-react';
import Board from 'components/Board';
import { PANE_LIST } from '../constant';
import { cvmRegionOptions } from '../chart';
import useDynamicChart from 'hooks/useDynamicChart';


const MonthPurchase = () => {

  const [customOptions] = useState(cvmRegionOptions);

  const dynamicChartOptions = useDynamicChart(customOptions, {
    placeholderColor: ['legend.textStyle.color', 'xAxis.axisLabel.color', 'yAxis.axisLabel.color'],
  });

  return (
    <Card title='主机资源概览' >
    <Row gutter={[16, 16]}>
      {PANE_LIST.map((item) => (
        <Col key={item.title} xs={6} xl={3} span={12}>
          <Board
            title={item.title}
            trend={item.trend}
            trendNum={item.trendNum}
            count={item.count}
            desc={'环比'}
            border
          />
        </Col>
      ))}
       <Col span={12}>
       <ReactEcharts
            option={dynamicChartOptions}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: 400 }}
            opts={{ locale: 'FR' }}
          />
      </Col>
    </Row>
  </Card>
  )
};

export default React.memo(MonthPurchase);
