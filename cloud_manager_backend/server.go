package main

import (
	routerManager "project/get_manager/base"
)

// main 管理入口
func main() {
	router := routerManager.GinRouter()
	router.Run()
}
