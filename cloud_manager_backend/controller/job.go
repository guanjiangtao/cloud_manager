package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"project/get_manager/base"
)

// JobRouter 注册路由
var JobRouter = map[string]*base.Router{
	"addJob": {
		Func:   AddJob,
		Type:   "GET",
		IsAuth: true,
	},
	"execJob": {
		Func:   ExecJob,
		Type:   "GET",
		IsAuth: true,
	},
}

func init() {
	base.AddRouter(JobRouter)
}

// AddJob 添加一个任务
func AddJob(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

// ExecJob 执行Job
func ExecJob(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}
