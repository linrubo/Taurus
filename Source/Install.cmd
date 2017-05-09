@cls & echo off

title Taurus installer

cd %~dp0

REM 注册表导入

reg import Install.reg
if %errorlevel% NEQ 0 (
    echo.
    echo 注册表导入失败
    echo.
    goto Error
) else (
    echo.
    echo 注册表导入成功
    echo.
)


REM 第一次执行检测

reg query "HKCU\Software\ES-Computing\EditPlus\Install" /v "First Run" | find "0x0" > Install.log

if %errorlevel% NEQ 1 (
    goto Import
) else (
    goto Success
)


:Import
REM 从安装目录导入语法文件

set source=%ProgramFiles%\EditPlus
set target=%UserProfile%\.EditPlus\Syntax\

copy "%source%\*.acp" %target%
copy "%source%\*.ctl" %target%
copy "%source%\*.stx" %target%
copy "%source%\template*.*" %target%
copy "%source%\*.js*" %target%
copy "%source%\entities_u.txt" %target%

if %errorlevel% NEQ 0 (
    echo.
    echo 导入语法文件失败
    echo.
    goto Error
) else (
    echo.
    echo 导入语法文件成功
    echo.
    goto Success
)


:Error
echo 安装失败
echo.
goto End


:Success
echo 安装完成
echo.
goto End


:End
pause
