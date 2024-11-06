#!/bin/bash
source "$(dirname "$0")/functions.sh"
set -e
trap 'handle_error $LINENO' ERR

mount_and_extract() {
    # Check if ISO exists
    if [ ! -f "$ISO_PATH" ]; then
        log "Error: ISO file not found at $ISO_PATH"
        exit 1
    fi

    # Clean up any existing mounts
    cleanup

    # Create fresh mount point
    mkdir -p "$MNT_PATH/ubuntu"
    mkdir -p "$TMP_PATH/ubuntu"

    # Mount ISO
    log "Mounting ISO..."
    mount -o loop "$ISO_PATH" "$MNT_PATH/ubuntu"

    # Copy ISO contents
    log "Copying ISO contents..."
    rsync -a --exclude='/casper/minimal.squashfs' "$MNT_PATH/ubuntu/" "$TMP_PATH/ubuntu"

    # Extract squashfs
    log "Extracting squashfs filesystem..."
    unsquashfs -d "$TMP_PATH/ubuntu/filesystem" "$MNT_PATH/ubuntu/casper/minimal.squashfs"

    # Unmount ISO
    sudo umount "$MNT_PATH/ubuntu"

    # Set up chroot environment
    log "Setting up chroot environment..."
    mount --bind /dev "$TMP_PATH/ubuntu/filesystem/dev"
    mount --bind /proc "$TMP_PATH/ubuntu/filesystem/proc"
    mount --bind /sys "$TMP_PATH/ubuntu/filesystem/sys"

    # Copy DNS settings
    cp /etc/resolv.conf "$TMP_PATH/ubuntu/filesystem/etc/resolv.conf"
}

mount_and_extract
