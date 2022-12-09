package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"project/get_manager/base"
	"project/get_manager/entity"
	"project/get_manager/service"
	"strconv"
)

// UserRouter 注册路由
var UserRouter = map[string]*base.Router{
	"addUser": {
		Func:   AddUser,
		Type:   "POST",
		IsAuth: true,
	},
	"getUserByPageDto": {
		Func:   GetUserByPageDto,
		Type:   "GET",
		IsAuth: true,
	},
	"getUserInfoById": {
		Func:   GetUserInfoById,
		Type:   "GET",
		IsAuth: true,
	},
	"login": {
		Func:   Login,
		Type:   "POST",
		IsAuth: true,
	},
}

func init() {
	base.AddRouter(UserRouter)
}

// AddUser 添加用户
func AddUser(c *gin.Context) {
	username, _ := c.GetPostForm("username")
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
		"res":     username,
	})
}

// GetUserByPageDto 分页查询表格数据
func GetUserByPageDto(c *gin.Context) {
	userList, err := service.GetUserByPageDto()
	respData := &entity.ResponseData{}
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
	respData.Data = userList
	c.JSON(http.StatusOK, gin.H{
		"res": respData,
	})
}

func GetUserInfoById(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("token"))
	respData := &entity.ResponseData{
		Data: nil,
	}
	// id不能为负
	if id >= 0 {
		user := service.GetUserById(id)
		respData.Data = user
		respData.StatusCode = entity.SUCCESS
		respData.Message = "请求成功！"
		c.JSON(http.StatusOK, gin.H{
			"res": respData,
		})
		return
	}
	respData.StatusCode = entity.FAILED
	respData.Message = "请求失败！"
	c.JSON(http.StatusOK, gin.H{
		"res": respData,
	})
}

func Login(c *gin.Context) {
	loginDto := &entity.LoginDTO{} //注意该结构接受的内容
	username, _ := c.GetPostForm("username")
	password, _ := c.GetPostForm("password")
	loginDto.Username = username
	loginDto.Password = password
	c.JSON(http.StatusOK, gin.H{
		"code": http.StatusOK,
		"data": gin.H{
			"token": "123456",
		},
	})
}
