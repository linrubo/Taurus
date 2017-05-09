@cls & echo off
echo.
echo Compressor for EditPlus 1.7.509

REM ��� Java ����
echo %path% | find "java" > %~dp0Compressor.log
if %errorlevel% NEQ 0 (
    echo.
    echo ���Ȱ�װ JDK/JRE Java����!
    echo.
    goto End
)

REM �����ļ���׺��ֻѹ�� JS/CSS
if "%~x1" NEQ ".js" (
    if "%~x1" NEQ ".css" (
        echo.
        echo ��ѡ�� JS/CSS �ļ�!
        echo.
        goto End
    )
)

REM ѹ������ļ�������
REM 1.�ļ����� .source ʱ��filename.source.js -> filename.js
REM 2.���������filename.js -> filename.min.js
set filename=%~n1.min%~x1
echo %~nx1 | find ".source." >> %~dp0Compressor.log
if %errorlevel% == 0 (
    for %%a in ("%~n1") do (
        set filename=%%~na%~x1
    )
)

REM ѹ������
echo ��ǰĿ¼: %cd% >> %~dp0Compressor.log
echo ����ѹ�� %1 ... >> %~dp0Compressor.log
echo java -jar %~dp0Compressor.jar %1 -o "%~dp1%filename%" >> %~dp0Compressor.log
java -jar %~dp0Compressor.jar %1 -o "%~dp1%filename%"

REM ѹ�����
if %errorlevel% == 0 (
    echo.
    echo ѹ���ļ� %~nx1 �� %filename% ���!
    echo.
    echo Power by  YUI Compressor 2.4.7
)

:End
exit