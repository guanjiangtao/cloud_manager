import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card, Col,
    Form, Input, InputNumber, Loading, MessagePlugin, Row,
    Select,
    SelectOption,
    SelectValue,
    Space,
} from "tdesign-react";
import { chargeType, region, renewFlag, imageIds, internetChargeTypeOptions } from "../component/constants";
import { mockZoneData } from "../component/mock";


const { FormItem } = Form;

/**
 * CVM表单
 * @returns CVM组件
 */
const CvmForm: React.FC = () => {

    const navigate = useNavigate();

    const [isPeriod, setIsPeriod] = useState(false);
    const [zoneList, setZoneList] = useState([
        {
            label: '暂无数据',
            value: 'no_data',
        }
    ]);

    useEffect(() => {
        getZoneWithRegion('ap-guangzhou')
    });

    // 使用region获取Zone信息
    const getZoneWithRegion = (region: string) => {
        setZoneList(mockZoneData);
    }


    const [form] = Form.useForm();

    const onSubmit = (e) => {
        console.log(e);
        if (e.validateResult === true) {
            startSubmit(true)
        }
    };

    const onReset = (e) => {
        console.log(e);
        MessagePlugin.info('重置成功');
    };

    // 设置chargetType类型
    const chargeTypeChange = (value: SelectValue<SelectOption>) => {
        if (value == "PREPAID") {
            setIsPeriod(true);
            return;
        }
        setIsPeriod(false);
    };

    // regionChange 地区改变，获取zoom数据
    const regionChange = (value: SelectValue<SelectOption>) => {
        getZoneWithRegion(value as string);
    };

    const [loading, setLoading] = useState(false);
    const startSubmit = (value: boolean) => {
      setLoading(value);
      if (value)
        setTimeout(() => {
          setLoading(false);
          MessagePlugin.info('提交成功');
          navigate('/cvm/list')
        }, 2000);
    };

    return (
        <>
            <Loading loading={loading} fullscreen preventScrollThrough={true} text="加载中"></Loading>
            <Card
                bordered
                headerBordered={false}
                hoverShadow={false}
                loading={false}
                shadow={false}
                size="medium"
                theme="normal"
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <Form form={form} onSubmit={onSubmit} onReset={onReset} colon labelWidth={100}>
                            <FormItem label="地区" name="region">
                                {
                                    <Select
                                        onChange={regionChange}
                                        style={{ width: '100%' }}
                                        clearable>
                                        {region.map((item, index) => (
                                            <Select.Option value={item.value} label={item.label} key={index} />
                                        ))}
                                    </Select>
                                }
                            </FormItem>
                            <FormItem label="付费类型" name="instanceChargeType">
                                {
                                    <Select
                                        onChange={chargeTypeChange}
                                        style={{ width: '100%' }}
                                        clearable>
                                        {chargeType.map((item, index) => (
                                            <Select.Option value={item.value} label={item.label} key={index} />
                                        ))}
                                    </Select>
                                }
                            </FormItem>
                            {
                                isPeriod ? (
                                    <>
                                        <FormItem label="购买时常" name="period">
                                            <Input
                                                clearable={true}
                                                placeholder="请输入购买时常"
                                            />
                                        </FormItem>
                                        <FormItem label="自动续费标识" name="renewFlag">
                                            {
                                                <Select
                                                    onChange={chargeTypeChange}
                                                    style={{ width: '100%' }}
                                                    clearable>
                                                    {renewFlag.map((item, index) => (
                                                        <Select.Option value={item.value} label={item.label} key={index} />
                                                    ))}
                                                </Select>
                                            }
                                        </FormItem>
                                    </>
                                ) : null
                            }
                            <FormItem label="区域" name="zone">
                                {
                                    <Select
                                        style={{ width: '100%' }}
                                        clearable>
                                        {zoneList.map((item, index) => (
                                            <Select.Option value={item.value} label={item.label} key={index} />
                                        ))}
                                    </Select>
                                }
                            </FormItem>

                            <FormItem label="实例机型" name="instanceType">
                                {
                                    <Select
                                        style={{ width: '100%' }}
                                        clearable>
                                        {zoneList.map((item, index) => (
                                            <Select.Option value={item.value} label={item.label} key={index} />
                                        ))}
                                    </Select>
                                }
                            </FormItem>
                            <FormItem label="镜像ID" name="imageId">
                                {
                                    <Select
                                        style={{ width: '100%' }}
                                        clearable>
                                        {imageIds.map((item, index) => (
                                            <Select.Option value={item.value} label={item.label} key={index} />
                                        ))}
                                    </Select>
                                }
                            </FormItem>
                            <FormItem label="网络类型" name="internetChargeType">
                                {
                                    <Select
                                        style={{ width: '100%' }}
                                        clearable>
                                        {internetChargeTypeOptions.map((item, index) => (
                                            <Select.Option value={item.value} label={item.label} key={index} />
                                        ))}
                                    </Select>
                                }
                            </FormItem>
                            <FormItem label="带宽大小" name="internetMaxBandwidthOut">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    decimalPlaces={0}
                                    max={100}
                                />
                            </FormItem>
                            <FormItem label="机器数量" name="instanceCount">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    decimalPlaces={1}
                                    max={100}
                                />
                            </FormItem>
                            <FormItem label="实例名称" name="instanceName">
                                <Input
                                    clearable={true}
                                    placeholder="请输入实例名称"
                                />
                            </FormItem>
                            <FormItem label="实例密码" name="password">
                                <Input
                                    clearable={true}
                                    placeholder="请输入实例密码"
                                />
                            </FormItem>
                            <FormItem style={{ marginLeft: 100 }}>
                                <Space>
                                    <Button type="submit" theme="primary">
                                        提交
                                    </Button>
                                    {/* <Button onClick={setMessage}>设置信息</Button> */}
                                    <Button type="reset" theme="default">
                                        重置
                                    </Button>
                                </Space>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={3}>
                        <div></div>
                    </Col>
                    <Col span={3}>
                        <div></div>
                    </Col>
                </Row>

            </Card>
        </>
    )
}


export default memo(CvmForm);
