package model

import (
	cvm "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/cvm/v20170312"
	"log"
	"project/get_manager/common"
	"project/get_manager/entity"
)

// GetCvmByList 分页获取
func GetCvmByList(cvmDto *entity.CvmDTO) ([]*cvm.Instance, error) {
	Auth, err := GetAuthById(cvmDto.AccountId)
	if err != nil {
		log.Printf("获取aksk失败 %s", err)
		return nil, err
	}
	cvmTools := &common.CvmTools{
		Region:    cvmDto.Region,
		SecretKey: Auth.SecurityKey,
		SecretId:  Auth.AccessKey,
	}
	return cvmTools.DescribeInstances(&entity.CvmRequest{
		InstanceIds: cvmDto.InstanceIds,
		Offset:      cvmDto.Offset,
		Limit:       cvmDto.Limit,
	})
}
