import { FileCopyIcon, Icon } from "tdesign-icons-react"
import { Button, Dropdown, DropdownOption, Link, MessagePlugin } from "tdesign-react";

function copyToClipboard(e: React.MouseEvent<SVGSVGElement, MouseEvent>, text: string, placeholder: string) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.style.position = 'fixed';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.style.top = '10px';
        textarea.value = text;
        textarea.select();
        document.execCommand('copy', true);
        document.body.removeChild(textarea);
    }
    MessagePlugin.success(placeholder);
}

// Cvm表格参数
export const getCvmTableColumns = (clickHandler: (dropdownItem?: DropdownOption) => void): any => {
    return [
        {
            colKey: 'id',
            title: 'ID',
            ellipsis: true,
            align: 'center',
            fixed: 'left',
            width: 100,
        },
        {
            colKey: 'instanceName',
            title: '机器名称',
            ellipsis: true,
            align: 'center',
            width: 150,
        },
        {
            colKey: 'instanceId',
            title: '实例ID',
            align: 'center',
            width: 150,
            cell: ({ row }) => (
                <div>{row.instanceId} <FileCopyIcon style={
                    {
                        "cursor": "pointer"
                    }
                } onClick={
                    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                        copyToClipboard(event, row.instanceId, '实例ID复制成功')
                } /></div>
            )
        },
        {
            title: 'IP地址',
            colKey: 'ipAddress',
            width: 150,
            align: 'center',
            ellipsisTitle: true,
            cell: ({ row }) => (
                <div>{row.ipAddress} <FileCopyIcon style={
                    {
                        "cursor": "pointer"
                    }
                } onClick={
                    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                        copyToClipboard(event, row.ipAddress, 'IP地址复制成功')
                } /></div>
            )
        },
        {
            title: '地区',
            colKey: 'region',
            width: 100,
            align: 'center',
            ellipsisTitle: true,
        },
        {
            title: '机器配置',
            colKey: 'instanceConfig',
            width: 300,
            align: 'center',
            ellipsis: {
                theme: 'light',
                placement: 'bottom',
            },
        },
        {
            title: '机器状态',
            colKey: 'status',
            width: 150,
            align: 'center',
            ellipsis: {
                theme: 'light',
                placement: 'bottom',
            },
        },
        {
            title: '创建时间',
            colKey: 'createTime',
            width: 150,
            align: 'center',
        },
        {
            title: '过期时间',
            colKey: 'expiredTime',
            width: 150,
            align: 'center',
        },
        {
            title: '操作',
            colKey: 'operation',
            fixed: 'right',
            align: 'center',
            cell: ({ row }) => (
                <>

                    <Button theme="primary" variant="text" onClick={clickHandler}>
                        登陆
                    </Button>
                    <Dropdown options={options} onClick={clickHandler}>
                        <Button theme="primary" variant="text" suffix={<Icon name="chevron-down" size="16" />}>
                            更多
                        </Button>
                    </Dropdown>
                </>
            )
        },
    ]
}

export const region = [
    {
        label: '广州',
        value: 'ap-guangzhou'
    },
    {
        label: '北京',
        value: 'ap-beijing'
    },
    {
        label: '南京',
        value: 'ap-nanjing'
    },
    {
        label: '成都',
        value: 'ap-chengdu'
    },
    {
        label: '香港',
        value: 'ap-hongkong'
    }
]

export const chargeType = [
    {
        label: '预付费',
        value: 'PREPAID'
    },
    {
        label: '按小时后付费',
        value: 'POSTPAID_BY_HOUR'
    },
]

export const renewFlag = [
    {
        label: '通知过期且自动续费',
        value: 'NOTIFY_AND_AUTO_RENEW'
    },
    {
        label: '通知过期不自动续费',
        value: 'NOTIFY_AND_MANUAL_RENEW'
    },
    {
        label: '不通知过期不自动续费',
        value: 'DISABLE_NOTIFY_AND_MANUAL_RENEW'
    },
]

export const internetChargeTypeOptions = [
    {
        label: '预付费按带宽结算',
        value: 'BANDWIDTH_PREPAID'
    },
    {
        label: '流量按小时后付费',
        value: 'TRAFFIC_POSTPAID_BY_HOUR'
    },
]



const options = [
    {
        content: '关机',
        value: 1,
    },
    {
        content: '开机',
        value: 2,
    },
    {
        content: '重启',
        value: 3,
    },
    {
        content: '销毁',
        value: 4,
    },
];


export const imageIds = [
    {
        label: 'TencentOS Server 3.1 for ARM64 (TK4)',
        value: 'img-9a0eg8mt',
    },
    {
        label: 'TencentOS Server 3.1 (TK4)',
        value: 'img-eb30mz89',
    },
    {
        label: 'CentOS 8.4 64位',
        value: 'img-l5eqiljn',
    },
    {
        label: 'Windows Server 2016 数据中心版 64位中文版',
        value: 'img-9id7emv7',
    },
    {
        label: 'Ubuntu Server 22.04 LTS 64位',
        value: 'img-487zeit5',
    },
    {
        label: 'Ubuntu Server 20.04 LTS 64位',
        value: 'img-22trbn9x',
    },
    {
        label: 'Ubuntu Server 18.04 LTS 64位',
        value: 'img-pi0ii46r',
    }
]
