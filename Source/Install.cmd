@cls & echo off

title Taurus installer

cd %~dp0

REM ע�����

reg import Install.reg
if %errorlevel% NEQ 0 (
    echo.
    echo ע�����ʧ��
    echo.
    goto Error
) else (
    echo.
    echo ע�����ɹ�
    echo.
)


REM ��һ��ִ�м��

reg query "HKCU\Software\ES-Computing\EditPlus\Install" /v "First Run" | find "0x0" > Install.log

if %errorlevel% NEQ 1 (
    goto Import
) else (
    goto Success
)


:Import
REM �Ӱ�װĿ¼�����﷨�ļ�

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
    echo �����﷨�ļ�ʧ��
    echo.
    goto Error
) else (
    echo.
    echo �����﷨�ļ��ɹ�
    echo.
    goto Success
)


:Error
echo ��װʧ��
echo.
goto End


:Success
echo ��װ���
echo.
goto End


:End
pause
