@cls & echo off
echo.

REM 检查 Java 环境
echo %path% | find "java" > %~dp0Compressor.log
if %errorlevel% NEQ 0 (
    echo 请先安装 JDK/JRE Java环境!
    goto End
)

REM 过滤文件后缀，只压缩 JS/CSS
if "%~x1" NEQ ".js" (
    if "%~x1" NEQ ".css" (
        echo 请选择 JS/CSS 文件!
        goto End
    )
)

REM 压缩后的文件名规则：
REM 1.文件名有 .source 时：filename.source.js -> filename.js
REM 2.其他情况：filename.js -> filename.min.js
set filename=%~n1.min%~x1
echo %~nx1 | find ".source." >> %~dp0Compressor.log
if %errorlevel% == 0 (
    for %%a in ("%~n1") do (
        set filename=%%~na%~x1
    )
)

REM 压缩过程
echo 当前目录: %cd% >> %~dp0Compressor.log
echo 正在压缩 %1 ... >> %~dp0Compressor.log
echo java -jar %~dp0Compressor.jar %1 -o "%~dp1%filename%" >> %~dp0Compressor.log
java -jar %~dp0Compressor.jar %1 -o "%~dp1%filename%"

REM 压缩结果
if %errorlevel% == 0 (
    echo 压缩文件 %~nx1 到 %filename% 完成!
    echo.
    echo Powered by  YUI Compressor 2.4.7
)

:End
exit