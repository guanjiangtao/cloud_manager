package entity

import "time"

// Auth 数据库对象
type Auth struct {
	Id          int32      `gorm:"column:id;primaryKey;AUTO_INCREMENT" json:"id"` // 自增ID
	AccessKey   string     `gorm:"column:access_key" json:"accessKey"`            // AK
	SecurityKey string     `gorm:"column:security_key" json:"securityKey"`        // SK
	ServerName  string     `gorm:"column:server_name" json:"serverName"`          // 服务名称
	IsInUsed    bool       `gorm:"column:is_in_used" json:"isInUsed"`             // 是否启用
	CreateTime  *time.Time `gorm:"column:create_time" json:"createTime"`          // 创建时间
	UserId      int32      `gorm:"column:user_id" json:"userId"`                  // 用户ID
	Tag         string     `gorm:"column:tag" json:"tag"`                         // 标识（用于区分是什么业务产生的）
}

// TableName 设置映射表名
func (Auth) TableName() string {
	return "auth_center"
}
