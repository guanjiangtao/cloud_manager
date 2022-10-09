package model

import (
	"errors"
	"project/get_manager/entity"
)

// AddAuth 添加AKSK
func AddAuth(center *entity.Auth) (int32, error) {
	result := conn.Create(&center)
	if result.Error != nil {
		return 0, result.Error
	}
	if result.RowsAffected == 0 {
		return 0, errors.New("sql执行失败，未产生有效结果")
	}
	return center.Id, nil
}

// GetAuthByList 分页获取
func GetAuthByList(page *entity.PageDTO) ([]*entity.Auth, error) {
	AuthList := make([]*entity.Auth, 0)
	if page.Value != "" {
		if err := conn.Limit(page.PageSize).Offset((page.Index-1)*page.PageSize).
			Where("server_name like ?", "%"+page.Value+"%").
			Order("id asc").Find(&AuthList).Error; err != nil {
			return nil, err
		}
	} else {
		if err := conn.Limit(page.PageSize).Offset((page.Index - 1) * page.PageSize).
			Order("id asc").Find(&AuthList).Error; err != nil {
			return nil, err
		}
	}

	return AuthList, nil
}

// DeleteAuthById 根据ID删除权限
func DeleteAuthById(id int) (int32, error) {
	result := conn.Delete(&entity.Auth{}, id)
	if result.RowsAffected == 0 {
		return 0, errors.New("sql执行失败，未产生有效结果")
	}
	return 1, nil
}

// GetAuthCount 获取总数
func GetAuthCount() (int64, error) {
	var count int64 = 0
	result := conn.Model(&entity.Auth{}).Count(&count)

	if result.Error != nil {
		return count, result.Error
	}
	return count, nil
}

// GetAuthById 根据ID获取权限信息
func GetAuthById(id int64) (*entity.Auth, error) {
	Auth := &entity.Auth{}
	result := conn.Model(&entity.Auth{}).Where("id = ?", id).Find(&Auth)
	if result.Error != nil {
		return nil, result.Error
	}
	return Auth, nil
}

func GetAllAuthAccount() ([]*entity.Auth, error) {
	authList := make([]*entity.Auth, 0)
	result := conn.Model(&entity.Auth{}).Find(&authList)
	if result.Error != nil {
		return nil, result.Error
	}
	return authList, nil
}
