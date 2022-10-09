package entity

type PageDTO struct {
	Index    int    `json:"index"`
	PageSize int    `json:"pageSize"`
	Value    string `json:"value"`
}

type CvmDTO struct {
	AccountId   int64    `json:"accountId"`
	Region      string   `json:"region"`
	InstanceIds []string `json:"instanceIds"`
	Offset      int64    `json:"offset"`
	Limit       int64    `json:"limit"`
}

type PostParamsGetter struct {
	Values map[string]interface{}
}

// ResponseData 响应结果
type ResponseData struct {
	Data       interface{}    `json:"data"`
	Message    string         `json:"message"`
	StatusCode RespStatusCode `json:"statusCode"`
}

type RespStatusCode int32

const (
	SUCCESS RespStatusCode = 200
	FAILED  RespStatusCode = 300
)
