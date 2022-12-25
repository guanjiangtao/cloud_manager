/**
 * Cvm实体
 */
export interface Cvm{
    /**
     * ID
     */
    id: Number;
    /**
     * 实例名称
     */
    instanceName: string;
    /**
     * 实例ID
     */
    instanceId: string;
    /**
     * IP地址
     */
    ipAddress: string;
    /**
     * 申请区域
     */
    region: string;
    /**
     * 机器配置
     */
    instanceConfig: string;
    /**
     * 机器状态
     */
    status: string;
    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 过期时间
     */
    expiredTime: string;
}