#!/bin/bash
source "$(dirname "$0")/functions.sh"
set -e
trap 'handle_error $LINENO' ERR

change_wallpaper() {
    local CUSTOM_WALLPAPER="$1"

    # Validate wallpaper file
    if [ ! -f "$CUSTOM_WALLPAPER" ]; then
        log "Error: Wallpaper file not found at $CUSTOM_WALLPAPER"
        exit 1
    fi

    # Variables
    local CHROOT_PATH="$TMP_PATH/ubuntu/filesystem"
    local BACKGROUNDS_DIR="$CHROOT_PATH/usr/share/backgrounds"
    local SCHEMAS_DIR="$CHROOT_PATH/usr/share/glib-2.0/schemas"
    local OVERRIDE_FILE="$SCHEMAS_DIR/10_ubuntu-settings.gschema.override"
    local WALLPAPER_NAME="$(basename "$CUSTOM_WALLPAPER")"
    local WALLPAPER_PATH="file:///usr/share/backgrounds/$WALLPAPER_NAME"

    # Copy the custom wallpaper into the chroot environment
    log "Copying custom wallpaper..."
    cp "$CUSTOM_WALLPAPER" "$BACKGROUNDS_DIR/"

    # Backup the original override file
    log "Backing up the original gschema override file..."
    cp "$OVERRIDE_FILE" "${OVERRIDE_FILE}.bak"

    # Modify the existing entries in the override file
    log "Modifying the gschema override file..."
    sed -i -E "s|^(picture-uri\s*=).*|\1 '$WALLPAPER_PATH'|g" "$OVERRIDE_FILE"
    sed -i -E "s|^(picture-uri-dark\s*=).*|\1 '$WALLPAPER_PATH'|g" "$OVERRIDE_FILE"

    # Compile the GSettings schemas
    log "Compiling GSettings schemas..."
    chroot "$CHROOT_PATH" /bin/bash -c "glib-compile-schemas /usr/share/glib-2.0/schemas"

    # Update backgrounds.xml if necessary
    log "Updating backgrounds.xml..."
    BACKGROUNDS_XML="$CHROOT_PATH/usr/share/gnome-background-properties/ubuntu-wallpapers.xml"

    # Backup the original backgrounds.xml
    cp "$BACKGROUNDS_XML" "${BACKGROUNDS_XML}.bak"

    # Add custom wallpaper entry
    sed -i "/<\/wallpapers>/i \
    <wallpaper deleted=\"false\">\
        <name>Custom Wallpaper</name>\
        <filename>$WALLPAPER_PATH</filename>\
        <filename-dark>$WALLPAPER_PATH</filename-dark>\
        <options>zoom</options>\
        <pcolor>#2c001e</pcolor>\
        <scolor>#2c001e</scolor>\
        <shade_type>solid</shade_type>\
    </wallpaper>" "$BACKGROUNDS_XML"

    # Create a new backgrounds.xml file
    log "Creating new backgrounds.xml..."
    cat << XML > "$TMP_PATH/ubuntu/filesystem/usr/share/gnome-background-properties/custom-wallpaper.xml"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE wallpapers SYSTEM "gnome-wp-list.dtd">
<wallpapers>
    <wallpaper deleted="false">
        <name>Custom Wallpaper</name>
        <filename>$WALLPAPER_PATH</filename>
        <filename-dark>$WALLPAPER_PATH</filename-dark>
        <options>zoom</options>
        <pcolor>#2c001e</pcolor>
        <scolor>#2c001e</scolor>
        <shade_type>solid</shade_type>
    </wallpaper>
</wallpapers>
XML

    # Update dconf database in chroot
    log "Updating dconf database..."
    chroot "$CHROOT_PATH" /bin/bash -c "dconf update"
}

customize_iso() {
    local config_path="$PROJECT_PATH/config/package_lists/packages.conf"
    local WALLPAPER_PATH="$1"

    log "Customizing ISO with packages and settings..."

    # Check if configuration exists
    if [ ! -f "$config_path" ]; then
        log "Error: Package list configuration not found!"
        exit 1
    fi

    # Read packages, handling spaces and newlines, and ignoring comments
    mapfile -t packages < <(tr ' ' '\n' < "$config_path" | grep -Ev '^\s*(#|$)')

    if [ ${#packages[@]} -eq 0 ]; then
        log "Error: No packages found in the configuration file!"
        exit 1
    fi

    # Log packages to be installed
    log "Packages to be installed:"
    printf '%s\n' "${packages[@]}"

    # Prepare the chroot environment for package installation
    log "Preparing chroot environment..."

    # Update package lists in chroot
    chroot "$TMP_PATH/ubuntu/filesystem" /bin/bash -c "apt-get update"

    # Install packages
    for pkg in "${packages[@]}"; do
        log "Installing package: $pkg"
        if chroot "$TMP_PATH/ubuntu/filesystem" /bin/bash -c "apt-get install -y $pkg"; then
            log "Successfully installed $pkg via apt"
        else
            log "Package $pkg not found in apt repositories. Attempting alternative installation methods."

            if [[ "$pkg" == "discord" ]]; then
                log "Installing $pkg from official website"
                chroot "$TMP_PATH/ubuntu/filesystem" /bin/bash << 'CHROOT_COMMANDS'
                # Install dependencies
                apt-get install -y libgconf-2-4 libappindicator1 libc++1 wget

                # Download Discord .deb package
                wget -O /tmp/discord.deb "https://discord.com/api/download?platform=linux&format=deb"

                # Install Discord .deb package
                dpkg -i /tmp/discord.deb || apt-get install -f -y

                # Clean up
                rm /tmp/discord.deb
CHROOT_COMMANDS
                log "$pkg installed successfully from .deb package"
            else
                log "No installation method for package: $pkg"
            fi
        fi
    done

    # Clean apt cache
    chroot "$TMP_PATH/ubuntu/filesystem" /bin/bash -c "apt-get clean"

    log "Package installation completed"
}
WALLPAPER=""
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -w|--wallpaper) WALLPAPER="$2"; shift ;;
        *) log "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done


# Call the function directly
customize_iso "$WALLPAPER"

