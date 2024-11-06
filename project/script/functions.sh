#!/bin/bash
# File: script/functions.sh
# Common functions and variables used across scripts

# Global variables
export USER_HOME=$(eval echo ~$SUDO_USER)
export PROJECT_PATH="$USER_HOME/project"
export ISO_PATH="$PROJECT_PATH/iso/ubuntu.iso"
export CUSTOM_PATH="$PROJECT_PATH/custom"
export EXTRACT_PATH="$CUSTOM_PATH/extract"
export GENERATED_PATH="$CUSTOM_PATH/generated"
export MNT_PATH="$CUSTOM_PATH/mnt"
export TMP_PATH="$CUSTOM_PATH/tmp"

# Logger function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Error handler
handle_error() {
    log "Error occurred in script at line $1"
    cleanup
    exit 1
}

# Cleanup function
cleanup() {
    log "Performing cleanup..."

    # Unmount mount point if mounted
    if mountpoint -q "$MNT_PATH/ubuntu"; then
        log "Unmounting $MNT_PATH/ubuntu"
        sudo umount -lf "$MNT_PATH/ubuntu" || true
    fi

    # Unmount dev, proc, and sys in chroot if they are mounted
    local chroot_base="$TMP_PATH/ubuntu/filesystem"
    local mount_points=("sys" "proc" "dev")
    
    for mp in "${mount_points[@]}"; do
        local full_path="$chroot_base/$mp"
        log "Checking $full_path"
        if [ -d "$full_path" ] && mountpoint -q "$full_path"; then
            log "Unmounting $full_path"
            sudo umount -lf "$full_path" || true
        fi
    done
    local dirs=(
        "$MNT_PATH"
        "$TMP_PATH"
        "$GENERATED_PATH"
        "$EXTRACT_PATH"
    )
    log "Removing old directories" 
     for dir in "${dirs[@]}"; do
        if [ -d "$dir" ]; then
            log "Removing directory: $dir"
            rm -rf "$dir"
        fi
    done

    log "Creating new directories"

    for dir in "${dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            log "Creating directory: $dir"
            mkdir -p "$dir"
        fi
    done

    # Optional: Remove temporary directories if needed
    # rm -rf "$TMP_PATH/ubuntu" || true
}