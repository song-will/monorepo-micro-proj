default: help

install:
	yarn install

dev:
	yarn run dev

pack:
	yarn run build
	
play:
	yarn run dev:play

new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake new <component-name> [中文名]\033[0m\t---  创建新组件 package. 例如 'make new button 按钮'"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  文档模式"
	@echo "   \033[35mmake play\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake pack\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  打包组件"
