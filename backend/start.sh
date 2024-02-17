#!/bin/bash

env_secret_debug()
{
    if [ ! -z "$ENV_SECRETS_DEBUG" ]; then
        echo -e "\033[1m$@\033[0m"
    fi
}

set_env_secrets() {
    secret_name=$SECRET_NAME
    secret_file_path="/run/secrets/${secret_name}"
    env_secret_debug "Secret file: $secret_name"
    if [ -f "$secret_file_path" ]; then
        while read -r line || [[ -n "$line" ]]; do
            export ${line%$'\r'}
        done < "$secret_file_path"
    else
        env_secret_debug "Secret file does not exist! $secret_name"
    fi

    if [ ! -z "$ENV_SECRETS_DEBUG" ]; then
        echo -e "\n\033[1mExpanded environment variables\033[0m"
        printenv
    fi
}

# ENV_SECRETS_DEBUG=true
set_env_secrets

npx prisma db push
node dist/main.js