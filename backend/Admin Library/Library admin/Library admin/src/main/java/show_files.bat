@echo off
for /r %%f in (*.*) do (
    echo ======== %%~nxf ========
    type "%%f"
    echo.
)