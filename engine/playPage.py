from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions

from config import config
from driver import driver




# class InterparkMusicalPage:
#     def __init__(self, driver: WebDriver):
#         self.driver = driver

#     def open(self):
#         self.driver.get(INTERPARK_MUSICAL_PAGE_URL)

#     @property
#     def popUp(self) -> WebElement | None:
#         try:
#             return self.driver.find_element(By.CLASS_NAME, 'popupWrap')
#         except:
#             return None

#     @property
#     def popUpCloseBtn(self) -> WebElement | None:
#         if self.popUp:
#             return self.popUp.find_element(By.CLASS_NAME, 'popupCloseBtn')
#         else:
#             return None

#     def removePopUp(self) -> None:
#         if not self.popUp:
#             return
#         self.popUpCloseBtn.click()

# createDriver()
# openPage()
# open
# isOpenTicket()
#     isLoggedIn()
#         login()
#         refresh()
#     closePopUp()


def book():
    url = config.get('play', 'url')

    driver.get(url)

    closePopUp()
    waitForTicketingOpens()
    startBooking()


    button = driver.find_element(By.CSS_SELECTOR, '#productSide > div > div.sideBtnWrap > a.sideBtn.is-primary')
    button.click()


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
