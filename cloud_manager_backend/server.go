package main

import (
	routerManager "project/get_manager/controller"
)

// main 管理入口
func main() {
	router := routerManager.GinRouter()
	router.Run()
}
