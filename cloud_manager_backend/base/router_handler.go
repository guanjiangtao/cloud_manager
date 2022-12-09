package base

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"project/get_manager/common"
	"project/get_manager/entity"
	"project/get_manager/middleware"
)

// RouterManager 路由管理器

// GinRouter gin路由
func GinRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Cors())
	// 注册路由
	for index := range GetRouterList() {
		routerMap := GetRouterList()[index]
		for key := range routerMap {
			router := routerMap[key]
			key = fmt.Sprintf("%s/%s", common.GoManagerConfig.BaseRouter, key)
			if router.Type == "GET" {
				r.GET(key, router.Func)
			} else if router.Type == "POST" {
				r.POST(key, router.Func)
			}
		}
	}
	return r
}

// PackageResponseParams 包装响应结果
func PackageResponseParams(params interface{}, err error) (*entity.ResponseData, error) {
	respData := &entity.ResponseData{}
	if err != nil {
		respData.StatusCode = entity.FAILED
		respData.Message = err.Error()
		return respData, errors.New(fmt.Sprintf("package params failed! error %s", err.Error()))
	}
	respData.StatusCode = entity.SUCCESS
	respData.Message = "请求成功！"
	respData.Data = params
	return respData, nil
}
