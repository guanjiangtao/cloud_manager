import { memo, useEffect, useState } from "react";
import { Button, Card, Col, Divider, Input, InputValue, MessagePlugin, Row, SelectOption, SelectValue, Table, Tag } from "tdesign-react";
import { getCvmTableColumns, region } from "./constants";
import Selector from './select'
import { mockData } from "./mock";
import styles from './index.module.less';
import { SearchIcon } from "tdesign-icons-react";


/**
 * CVM列表渲染
 * @returns Cvm组件
 */
const CvmList: React.FC = () => {
    const [columns] = useState(getCvmTableColumns());
    const [regionValue, setRegionValue] = useState("")
    const [searchValue, setSearchValue] = useState("")

    // useEffect(() => {

    // })

    const onRegionChange = (value: SelectValue<SelectOption>) => {
        value === null ? setRegionValue("") : setRegionValue(value.toString())
    }

    const onSearchChange = (value: InputValue) => {
        setSearchValue(value)
    }

    const onClick = () => {
        console.log("触发申请机器")
    }

    return (
        <>
            <Card
                bordered
                headerBordered={false}
                hoverShadow={false}
                loading={false}
                shadow={false}
                size="medium"
                theme="normal"
            >
                <Row gutter={16} className={styles.header}>
                    <Col span={1}>
                        <Selector selectors={region} value={regionValue} onChange={onRegionChange} />
                    </Col>
                    <Col span={2}>
                        <Input
                            suffixIcon={<SearchIcon />}
                            placeholder="请输入要搜索的内容"
                            value={searchValue}
                            type="text"
                            onChange={onSearchChange}
                        />
                    </Col>
                    <Col span={1}>
                        <Button
                            block={false}
                            ghost={false}
                            loading={false}
                            shape="rectangle"
                            size="medium"
                            type="button"
                            variant="base"
                            onClick={onClick}
                        >
                            申请机器
                        </Button>
                    </Col>
                </Row>
                <Divider></Divider>
                <Table rowKey="index" data={mockData} columns={columns} />
            </Card>
        </>
    )
}


export default memo(CvmList);
