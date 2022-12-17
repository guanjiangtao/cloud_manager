import React from 'react';
import { Col, Radio, Row, Table, Button, Card } from 'tdesign-react';
import { TdPrimaryTableProps } from 'tdesign-react/es/table';
import classnames from 'classnames';
import { TrendIcon, ETrend } from 'components/Board';
import { PURCHASE_TREND_LIST, SALE_TREND_LIST } from '../constant';
import Style from './RankList.module.less';

const DateRadioGroup = (
  <Radio.Group defaultValue='recent_week'>
    <Radio.Button value='recent_week'>本周</Radio.Button>
    <Radio.Button value='recent_month'>近三个月</Radio.Button>
  </Radio.Group>
);

const SALE_COLUMNS: TdPrimaryTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 80,
    fixed: 'left',
    cell: ({ rowIndex }) => (
      <span className={classnames(Style.rankIndex, { [Style.rankIndexTop]: rowIndex < 3 })}>{rowIndex + 1}</span>
    ),
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: '账户名称',
    width: 200,
  },
  {
    align: 'center',
    colKey: 'count',
    title: '消费金额',
    width: 100,
  },
  {
    align: 'center',
    colKey: 'date',
    width: 140,
    title: '数据统计日期',
  }
];

const PURCHASE_COLUMNS: TdPrimaryTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 80,
    fixed: 'left',
    cell: ({ rowIndex }) => (
      <span className={classnames(Style.rankIndex, { [Style.rankIndexTop]: rowIndex < 3 })}>{rowIndex + 1}</span>
    ),
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: '产品名称',
    width: 200,
  },
  {
    align: 'center',
    colKey: 'count',
    title: '购买数量',
    width: 100,
  },
  {
    align: 'center',
    colKey: 'price',
    width: 140,
    title: '总价格',
  }
];

const RankList = () => (
  <Row gutter={[16, 16]} className={Style.rankListPanel}>
    <Col xs={12} xl={6} span={12}>
      <Card title='账户余额排名' actions={DateRadioGroup}>
        <Table columns={SALE_COLUMNS} rowKey='productName' size='medium' data={SALE_TREND_LIST} />
      </Card>
    </Col>
    <Col xs={12} xl={6} span={12}>
      <Card title='产品花费排名' actions={DateRadioGroup}>
        <Table columns={PURCHASE_COLUMNS} rowKey='productName' size='medium' data={PURCHASE_TREND_LIST} />
      </Card>
    </Col>
  </Row>
);

export default React.memo(RankList);
