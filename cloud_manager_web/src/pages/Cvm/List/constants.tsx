import { FileCopyIcon } from "tdesign-icons-react"
import { MessagePlugin } from "tdesign-react";
import Link from "tdesign-react/es/link/Link"

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

export const getCvmTableColumns = (): any => {
    return [
        {
            colKey: 'instanceName',
            title: '机器名称',
            ellipsis: true,
            width: 150,
        },
        {
            colKey: 'instanceId',
            title: '实例ID',
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
            ellipsisTitle: true,
        },
        {
            title: '机器配置',
            colKey: 'instanceConfig',
            width: 300,
            ellipsis: {
                theme: 'light',
                placement: 'bottom',
            },
        },
        {
            title: '机器状态',
            colKey: 'status',
            width: 150,
            ellipsis: {
                theme: 'light',
                placement: 'bottom',
            },
        },
        {
            title: '创建时间',
            colKey: 'createTime',
            width: 175,
        },
        {
            title: '过期时间',
            colKey: 'expiredTime',
            width: 175,
        },
        {
            title: '操作',
            colKey: 'operation',
            cell: ({ row }) => (
                <Link theme="primary" hover="color">
                    {row.status === 0 ? '查看详情' : '再次申请'}
                </Link>
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
