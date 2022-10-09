package controller

import (
	"github.com/gin-gonic/gin"
)

// LogRouter 注册路由
var LogRouter = map[string]*Router{
	"addLog": {
		Func:   AddLog,
		Type:   "POST",
		IsAuth: true,
	},
}

func init() {
	AddRouter(LogRouter)
}

func AddLog(c *gin.Context) {

}
