import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button, Card, Col,
    Divider, DropdownOption, Input,
    InputValue, Row, SelectOption,
    SelectValue, Table
} from "tdesign-react";

import { SearchIcon } from "tdesign-icons-react";
import { getCvmTableColumns, region } from "../component/constants";
import Selector from '../component/select'
import { mockData } from "../component/mock";
import styles from './index.module.less';


/**
 * CVM列表渲染
 * @returns Cvm组件
 */
const CvmList: React.FC = () => {

    const navigate = useNavigate();

    // 处理点击事件
    const clickHandler = (dropdownItem: DropdownOption) => {
        console.log(dropdownItem.value)
    }

    const total = 10;

    const [columns] = useState(getCvmTableColumns(clickHandler));
    const [regionValue, setRegionValue] = useState("")
    const [searchValue, setSearchValue] = useState("")


    const onRegionChange = (value: SelectValue<SelectOption>) => {
        value === null ? setRegionValue("") : setRegionValue(value.toString())
    }

    const onSearchChange = (value: InputValue) => {
        console.log(value)
        setSearchValue(value)
    }

    // 跳转申请机器页面
    const onClick = () => {
        navigate('/cvm/apply')
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
                <Table
                    rowKey="index"
                    data={mockData}
                    columns={columns}
                    pagination={{
                        defaultCurrent: 2,
                        defaultPageSize: 5,
                        total,
                        showJumper: true,
                        onChange(pageInfo) {
                            console.log(pageInfo, 'onChange pageInfo');
                        },
                        onCurrentChange(current, pageInfo) {
                            console.log(current, pageInfo, 'onCurrentChange current');
                        },
                        onPageSizeChange(size, pageInfo) {
                            console.log(size, pageInfo, 'onPageSizeChange size');
                        },
                    }}
                />
            </Card>
        </>
    )
}


export default memo(CvmList);
