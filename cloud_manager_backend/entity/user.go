package entity

import "time"

// User 实体
type User struct {
	Id           int32      `gorm:"column:id;primaryKey;AUTO_INCREMENT"` // 自增ID
	UId          string     `gorm:"column:u_id"`                         // uid用于区别账户的
	Username     string     `gorm:"column:username"`                     // 用户名
	Password     string     `gorm:"column:password"`                     // 密码
	Token        string     `gorm:"column:token"`                        // token（可作为鉴权ID）
	OrgId        int32      `gorm:"column:org_id"`                       // 组织ID
	DepartmentId int32      `gorm:"column:department_id"`                // 部门ID
	RoleId       int32      `gorm:"column:role_id"`                      // 角色ID
	BirthDay     *time.Time `gorm:"column:birthday"`                     // 生日
	Political    string     `gorm:"column:department_id"`                // 政治面貌
	Phone        string     `gorm:"column:phone"`                        // 联系电话
	OfficeAddr   string     `gorm:"column:office_addr"`                  // 办公地点
	Email        string     `gorm:"column:email"`                        // 邮件地址
	QQ           string     `gorm:"column:qq"`                           // qq
	Wechat       string     `gorm:"column:wechat"`                       // 微信
	CreateTime   *time.Time `gorm:"column:create_time"`                  // 创建时间
	UpdateTime   *time.Time `gorm:"column:update_time"`                  // 更新时间
	AvatarId     int32      `gorm:"column:avatar"`                       // 头像
}

// UserDTO 用于前后台交换的实体
type UserDTO struct {
	Id           int32      `json:"id"`            // 自增ID
	UId          string     `json:"UId"`           // uid用于区别账户的
	Username     string     `json:"username"`      // 用户名
	Password     string     `json:"password"`      // 密码
	Token        string     `json:"token"`         // token（可作为鉴权ID）
	OrgName      string     `json:"orgName"`       // 组织
	OrgId        int32      `json:"orgId"`         // 组织ID
	Department   string     `json:"department"`    // 部门
	DepartmentId int32      `json:"departmentId"`  // 部门ID
	RoleId       int32      `json:"roleId"`        // 角色ID
	RoleName     string     `json:"roleName"`      // 角色名称
	BirthDay     *time.Time `json:"birthDay"`      // 生日
	Political    string     `json:"political"`     // 政治面貌
	Phone        string     `json:"phone"`         // 联系电话
	OfficeAddr   string     `json:"officeAddr"`    // 办公地点
	Email        string     `json:"email"`         // 邮件地址
	QQ           string     `json:"QQ"`            // qq
	Wechat       string     `json:"wechat"`        // 微信
	CreateTime   *time.Time `json:"createTime"`    // 创建时间
	UpdateTime   *time.Time `json:"updateTime"`    // 更新时间
	Avatar       string     `gorm:"column:avatar"` // 头像
}

// LoginDTO 登陆
type LoginDTO struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
