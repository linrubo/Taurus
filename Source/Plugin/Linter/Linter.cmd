@cls & echo off
echo.

REM ��� Node.js ����
echo %path% | find "NodeJS" > %~dp0Linter.log
if %errorlevel% NEQ 0 (
    echo ���Ȱ�װ Node.js ����!
    goto End
)

REM �����ļ���׺��ֻ���JS
if "%~x1" NEQ ".js" (
    echo ��ѡ�� JS �ļ�!
    goto End
)

REM ������
echo ��ǰĿ¼: %cd% >> %~dp0Linter.log
echo ��ǰ�ļ�: %1 >> %~dp0Linter.log
echo Linting ...
node %~dp0Linter.js %1

REM �����
if %errorlevel% == 0 (
    echo.
    echo �ļ� %~nx1 ������!
)

:End
exit