package controller

import (
	"github.com/gin-gonic/gin"
	"project/get_manager/base"
)

// LogRouter 注册路由
var LogRouter = map[string]*base.Router{
	"addLog": {
		Func:   AddLog,
		Type:   "POST",
		IsAuth: true,
	},
}

func init() {
	base.AddRouter(LogRouter)
}

func AddLog(c *gin.Context) {

}
