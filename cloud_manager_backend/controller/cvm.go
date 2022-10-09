package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"project/get_manager/entity"
	"project/get_manager/model"
	"strconv"
)

// CvmRouter 注册路由
var CvmRouter = map[string]*Router{
	"addCvm": {
		Func:   addCvm,
		Type:   "POST",
		IsAuth: true,
	},
	"getCvm": {
		Func:   getCvm,
		Type:   "GET",
		IsAuth: true,
	},
	"getCvmByList": {
		Func:   getCvmByList,
		Type:   "GET",
		IsAuth: true,
	},
}

func init() {
	AddRouter(CvmRouter)
}

// addSecKey 添加AKSK
func addCvm(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

// getSecKey 获取Sec Key
func getCvm(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func getCvmByList(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Query("id"), 10, 64)
	region := c.Query("region")
	offset, _ := strconv.ParseInt(c.Query("offset"), 10, 64)
	limit, _ := strconv.ParseInt(c.Query("limit"), 10, 64)

	list, err := model.GetCvmByList(&entity.CvmDTO{
		Limit:     limit,
		Region:    region,
		AccountId: id,
		Offset:    offset,
	})
	if err != nil {
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": list,
	})
}
