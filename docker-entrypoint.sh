#!/usr/bin/env bash
set -e

if [ "$1" = 'nginx' ]; then
    exec gosu www-data "$@"
fi

exec "$@"
