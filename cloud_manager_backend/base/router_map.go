package base

import "github.com/gin-gonic/gin"

// Router 对象类
type Router struct {
	Func   func(c *gin.Context) `json:"func"`   // 待注册的方法
	Type   string               `json:"type"`   // 路由类似
	IsAuth bool                 `json:"isAuth"` // 是否需要鉴权
}

// RouterList 路由列表（用于路由初始化）
var RouterList = make([]map[string]*Router, 0)

// AddRouter 添加路由
func AddRouter(router map[string]*Router) {
	RouterList = append(RouterList, router)
}

func GetRouterList() []map[string]*Router {
	return RouterList
}
