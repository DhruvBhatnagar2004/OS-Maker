class ConfigurationService:
    @staticmethod
    def predefined_service(os_type, config_type):
        predefined_configs = {
            'Minimal': ['git', 'python3', 'vim'],
            'Standard': ['git', 'python3', 'vim', 'firefox', 'gimp', 'vlc'],
            'RAM-Efficient': ['git', 'python3-minimal', 'vim-tiny']
        }
        return predefined_configs.get(config_type, [])

    @staticmethod
    def customized_service(packages):
        return packages