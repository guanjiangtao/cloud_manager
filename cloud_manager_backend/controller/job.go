package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// JobRouter 注册路由
var JobRouter = map[string]*Router{
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
	AddRouter(JobRouter)
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
