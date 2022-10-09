package test

import (
	"project/get_manager/common"
	"project/get_manager/entity"
	"testing"
)

func TestDescribeInstances(t *testing.T) {
	cvmTools := &common.CvmTools{
		SecretId:  "",
		SecretKey: "",
		Region:    "ap-guangzhou",
	}
	cvmTools.DescribeInstances(&entity.CvmRequest{
		InstanceIds: []string{},
		Offset:      0,
		Limit:       100,
	})
}
