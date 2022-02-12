from os import path
from configparser import ConfigParser


DEFAULT_CONFIG_FILE = path.abspath('config.ini')
DEFAULT_CONFIG_TEMPLATE_FILE = path.abspath('engine/config.ini.template')


class Config(ConfigParser):
    def __init__(self) -> None:
        super().__init__()
        self.readConfigFile()

    def readConfigFile(self, configFilePath: str = DEFAULT_CONFIG_FILE):
        if not path.exists(configFilePath):
            self.createConfigFile()
        self.read(configFilePath)

    def createConfigFile(self, configFilePath: str = DEFAULT_CONFIG_FILE):
        self.readConfigFile(DEFAULT_CONFIG_TEMPLATE_FILE)
        with open(configFilePath, 'w') as configFile:
            self.write(configFile)


config = Config()
