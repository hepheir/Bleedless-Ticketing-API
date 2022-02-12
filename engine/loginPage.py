from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions

from config import config
from driver import driver


URL = 'https://ticket.interpark.com/Gate/TPLogin.asp'


def login():
    driver.get(URL)

    userId = config.get('login', 'id')
    userPwd = config.get('login', 'password')

    enterId(userId)
    enterPwd(userPwd)
    pressLoginButton()


class ContextSwitchedDriver:
    """
    로그인 페이지에서 아이디, 비밀번호 입력 폼이
    <iframe> 태그 속에 위치하기 때문에, <iframe> 속
    WebElement를 이용하기 위해서 우선 driver.switch_to 의
    메소드를 이용해주어야 한다.
    """

    IFRAME_FULL_XPATH = "//div[@class='leftLoginBox']/iframe[@title='login']"

    def __enter__(self) -> WebDriver:
        self.waitForElementByXPATH(self.IFRAME_FULL_XPATH)

        iframe = driver.find_element(By.XPATH, self.IFRAME_FULL_XPATH)
        driver.switch_to.frame(iframe)
        return driver

    def __exit__(self, type, value, traceback) -> None:
        driver.switch_to.default_content()
        return

    def waitForElementByXPATH(self, xpath: str) -> WebDriverWait:
        SECONDS_TO_WAIT = 30

        wait = WebDriverWait(driver, SECONDS_TO_WAIT)
        wait.until(expected_conditions
            .visibility_of_all_elements_located((By.XPATH, xpath)))
        return wait


def enterId(userId: str):
    with ContextSwitchedDriver() as driver:
        inputBox = driver.find_element(By.ID, 'userId')
        inputBox.send_keys(userId)

def enterPwd(userPwd: str):
    with ContextSwitchedDriver() as driver:
        inputBox = driver.find_element(By.ID, 'userPwd')
        inputBox.send_keys(userPwd)

def pressLoginButton():
    with ContextSwitchedDriver() as driver:
        element = driver.find_element(By.ID, 'btn_login')
        element.click()
