import time
import os

from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.chrome.webdriver import WebDriver


def main():
    driverHandler = DriverHandler()
    driverHandler.createWebDriver()

    driver = driverHandler.getWebDriver()

    # do something here

    time.sleep(30)

    driverHandler.removeWebDriver()


class DriverHandler:
    CHROME_DRIVER_EXECUTABLE_PATH_mac64_m1 = os.path.abspath('drivers/chromedriver_mac64_m1-2')

    def __init__(self) -> None:
        self.driver = None

    def getWebDriver(self) -> WebDriver:
        if self.driver is None:
            self.createWebDriver()
        return self.driver

    def createWebDriver(self) -> None:
        # 사용하는 기기에 맞게, 사전에 다운로드해둔 드라이버를 이 곳에서 선택.
        executablePath = self.CHROME_DRIVER_EXECUTABLE_PATH_mac64_m1
        self.driver = self.createChromeDriver(executablePath)

    def createChromeDriver(self, driverPath: str) -> WebDriver:
        try:
            driver = webdriver.Chrome(driverPath)
        except WebDriverException as webDriverException:
            # macOS 사용자의 경우.
            # 에러 메시지가 다음과 같다면, 아래의 방법을 시도해 볼 것.
            # selenium.common.exceptions.WebDriverException: Message: 'chromedriver_mac64_m1-2.zip' executable may have wrong permissions. Please see https://chromedriver.chromium.org/home
            # 컨트롤 키(⌃)를 누른채로 크롬드라이버 파일을 1회 실행시켜, 파일에 권환을 부여해볼것.
            raise webDriverException
        return driver

    def removeWebDriver(self) -> None:
        if self.driver is None:
            return
        self.driver.quit()
        self.driver = None


if __name__ == '__main__':
    main()
