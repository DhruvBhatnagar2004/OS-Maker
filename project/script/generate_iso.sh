#!/bin/bash
source "$(dirname "$0")/functions.sh"
set -e
trap 'handle_error $LINENO' ERR

generate_iso() {
    local output_name=$1

    # Unmounting the chroot environment
    log "Unmounting chroot environment..."
    sudo umount "$TMP_PATH/ubuntu/filesystem/dev" 2>/dev/null || true
    sudo umount "$TMP_PATH/ubuntu/filesystem/proc" 2>/dev/null || true
    sudo umount "$TMP_PATH/ubuntu/filesystem/sys" 2>/dev/null || true

    # Create new squashfs
    log "Creating new squashfs..."

    # Remove existing squashfs if it exists
    rm -f "$TMP_PATH/ubuntu/casper/minimal.squashfs"

    # Create squashfs from the filesystem directory
    sudo mksquashfs "$TMP_PATH/ubuntu/filesystem" "$TMP_PATH/ubuntu/casper/minimal.squashfs" \
        -comp xz -b 1M -Xbcj x86 -processors "$(nproc)" \
        -e "proc/*" "sys/*" "dev/*" \
        -noappend -no-recovery || {
            log "Failed to create squashfs"
            exit 1
    }

    # Remove the filesystem directory to prevent it from being included in the ISO
    sudo rm -rf "$TMP_PATH/ubuntu/filesystem"

    # Update filesystem size
    log "Updating filesystem size..."
    printf $(du -sx --block-size=1 "$TMP_PATH/ubuntu/casper" | cut -f1) > "$TMP_PATH/ubuntu/casper/filesystem.size"

    # Update MD5 sums
    log "Updating MD5 sums..."
    cd "$TMP_PATH/ubuntu"
    find . -type f -print0 | xargs -0 md5sum > md5sum.txt

    xorriso -as mkisofs -r \
        -V "Custom_Ubuntu" \
        -o "$GENERATED_PATH/${output_name}.iso" \
        -J -l \
        -b boot/grub/i386-pc/eltorito.img \
        -c boot.catalog \
        -no-emul-boot -boot-load-size 4 -boot-info-table \
        -eltorito-alt-boot \
        -e EFI/boot/bootx64.efi \
        -no-emul-boot \
        . || {
            log "Failed to generate ISO"
            exit 1
    }

    log "ISO generated successfully: $GENERATED_PATH/${output_name:-custom-ubuntu}.iso"
}

# Check if output name is provided
if [ -z "$1" ]; then
    output_name="custom-ubuntu"
else
    output_name="$1"
fi

# Run the main function
generate_iso "$output_name"