package entity

// CvmRequest cvm业务对象
type CvmRequest struct {
	InstanceIds []string `json:"instanceIds"`
	Offset      int64    `json:"offset"`
	Limit       int64    `json:"limit"`
}

// CvmResponse cvm响应对象（Do）
type CvmResponse struct {
	Data interface{} `json:"data"` // 返回数据

	AccountId int64 `json:"accountId"` // 账号Id

	ServiceProvider string `json:"serviceProvider"` // 服务提供商

	Tag string `json:"tag"` // 账号标识
}

type Cvm struct {
}
