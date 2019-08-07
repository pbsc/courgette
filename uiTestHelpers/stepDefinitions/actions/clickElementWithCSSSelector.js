module.exports = function clickElementWithXPath(cssSelector) {
  const EC = protractor.ExpectedConditions;

  console.log('            Getting element by css:');
  console.log('              ', cssSelector);
  const elToClick = element(by.css(cssSelector));
  return browser.wait(EC.presenceOf(elToClick))
    .then(() => elToClick.click());
};
