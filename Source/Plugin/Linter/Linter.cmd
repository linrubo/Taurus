@cls & echo off
echo.

REM 检查 Node.js 环境
echo %path% | find "NodeJS" > %~dp0Linter.log
if %errorlevel% NEQ 0 (
    echo 请先安装 Node.js 环境!
    goto End
)

REM 过滤文件后缀，只检测JS
if "%~x1" NEQ ".js" (
    echo 请选择 JS 文件!
    goto End
)

REM 检测过程
echo 当前目录: %cd% >> %~dp0Linter.log
echo 当前文件: %1 >> %~dp0Linter.log
echo Linting ...
node %~dp0Linter.js %1

REM 检测结果
if %errorlevel% == 0 (
    echo.
    echo 文件 %~nx1 检测完成!
)

:End
exit