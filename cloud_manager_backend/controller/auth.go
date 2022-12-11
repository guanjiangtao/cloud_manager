package controller

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"project/get_manager/entity"
	"project/get_manager/model"
	"strconv"
	"time"
)

// AuthRouter 注册路由
var AuthRouter = map[string]*Router{
	"addAuth": {
		Func:   addAuth,
		Type:   "POST",
		IsAuth: true,
	},
	"getAuthByList": {
		Func:   getAuthByList,
		Type:   "GET",
		IsAuth: true,
	},
	"deleteAuthById": {
		Func:   deleteAuthById,
		Type:   "GET",
		IsAuth: true,
	},
	"getAuthCount": {
		Func:   getAuthCount,
		Type:   "GET",
		IsAuth: true,
	},
	"getAuthById": {
		Func:   getAuthById,
		Type:   "GET",
		IsAuth: true,
	},
	"getAllAuthAccount": {
		Func:   getAllAuthAccount,
		Type:   "GET",
		IsAuth: true,
	},
}

func init() {
	AddRouter(AuthRouter)
}

var logger = log.Logger{}

// addAuth 添加AKSK
func addAuth(c *gin.Context) {
	respData := &entity.ResponseData{}
	createTime := time.Now()
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)                    // 解析json请求结果

	userId := int64(json["userId"].(float64))
	Auth := &entity.Auth{
		AccessKey:   json["accessKey"].(string),
		SecurityKey: json["securityKey"].(string),
		ServerName:  json["serverName"].(string),
		IsInUsed:    false,
		CreateTime:  &createTime,
		UserId:      int32(userId),
	}
	// 返回结果为影响行数
	rows, err := model.AddAuth(Auth)
	if err != nil {
		return
	}

	if err != nil {
		respData.StatusCode = entity.FAILED
		respData.Message = err.Error()
		c.JSON(http.StatusOK, gin.H{
			"data": respData,
		})
		return
	}
	respData.StatusCode = entity.SUCCESS
	respData.Message = "请求成功！"
	respData.Data = rows // 返回影响行数给前端
	c.JSON(http.StatusOK, gin.H{
		"data": respData,
	})
}

// getAuthByList 获取授权中心列表
func getAuthByList(c *gin.Context) {
	value := c.Query("value")
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	index, _ := strconv.Atoi(c.Query("index"))

	list, err := model.GetAuthByList(&entity.PageDTO{
		Index:    index,
		PageSize: pageSize,
		Value:    value,
	})
	if err != nil {
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": list,
	})
}

// deleteAuthById 通过ID删除权限
func deleteAuthById(c *gin.Context) {
	queryId := c.Query("id")
	respData := &entity.ResponseData{}
	id, err := strconv.Atoi(queryId)
	if err != nil {
		respData.StatusCode = entity.FAILED
		respData.Message = err.Error()
		c.JSON(http.StatusOK, gin.H{
			"data": respData,
		})
		return
	}
	// 删除权限ID
	_, err = model.DeleteAuthById(id)
	if err != nil {
		respData.StatusCode = entity.FAILED
		respData.Message = err.Error()
		c.JSON(http.StatusOK, gin.H{
			"data": respData,
		})
		return
	}
	respData.StatusCode = entity.SUCCESS
	respData.Message = "请求成功！"
	respData.Data = nil // 返回影响行数给前端
	c.JSON(http.StatusOK, gin.H{
		"data": respData,
	})
}

// getAuthCount 获取
func getAuthCount(c *gin.Context) {
	respData := &entity.ResponseData{}
	count, err := model.GetAuthCount()
	if err != nil {
		respData.StatusCode = entity.FAILED
		respData.Message = err.Error()
		c.JSON(http.StatusOK, gin.H{
			"data": respData,
		})
		return
	}
	respData.StatusCode = entity.SUCCESS
	respData.Message = "请求成功！"
	respData.Data = count // 返回影响行数给前端
	c.JSON(http.StatusOK, gin.H{
		"data": respData,
	})
}

// getAuthById
func getAuthById(c *gin.Context) {
	queryId := c.Query("id")
	respData := &entity.ResponseData{}
	id, err := strconv.ParseInt(queryId, 10, 64)
	if err != nil {
		respData.StatusCode = entity.FAILED
		respData.Message = err.Error()
		c.JSON(http.StatusOK, gin.H{
			"data": respData,
		})
		return
	}
	Auth, err := model.GetAuthById(id)
	if err != nil {
		return
	}
	if err != nil {
		respData.StatusCode = entity.FAILED
		respData.Message = err.Error()
		c.JSON(http.StatusOK, gin.H{
			"data": respData,
		})
		return
	}
	respData.StatusCode = entity.SUCCESS
	respData.Message = "请求成功！"
	respData.Data = Auth // 返回影响行数给前端
	c.JSON(http.StatusOK, gin.H{
		"data": respData,
	})
}

func getAllAuthAccount(c *gin.Context) {
	accountList, err := model.GetAllAuthAccount()
	respData, err := PackageResponseParams(accountList, err)
	if err != nil {
		logger.Printf("catch error %s", err)
		c.JSON(http.StatusOK, gin.H{
			"data": respData,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": respData,
	})
}
