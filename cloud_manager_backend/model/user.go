package model

import (
	"project/get_manager/common"
	"project/get_manager/entity"
)

var conn = common.GoManagerConfig.MySQLConn

func init() {
	// 判断表是否存在，如果不存在则新建
	AutoMigrate()
}

func AutoMigrate() {
	if !conn.Migrator().HasTable(&entity.User{}) {
		err := conn.Migrator().CreateTable(&entity.User{})
		if err != nil {
			return
		}
	}
}
