#!/usr/bin/env sh
find '/usr/share/nginx/html' -name 'environment.ts' | xargs sed -i'' -e 's,http://localhost:4200/api,http://localhost:80/api/v1,g' \;
nginx -g "daemon off;"