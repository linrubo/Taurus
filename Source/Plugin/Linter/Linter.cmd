@cls & echo off
echo.
echo JSLint for EditPlus 1.7.509

REM ��� Node.js ����
echo %path% | find "NodeJS" > %~dp0Linter.log
if %errorlevel% NEQ 0 (
    echo.
    echo ���Ȱ�װ Node.js ����!
    echo.
    goto End
)

REM �����ļ���׺��ֻ���JS
if "%~x1" NEQ ".js" (
    echo.
    echo ��ѡ�� JS �ļ�!
    echo.
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