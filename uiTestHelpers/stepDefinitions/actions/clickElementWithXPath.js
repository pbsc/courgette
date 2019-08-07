module.exports = function clickElementWithXPath(nth, xpathSelector) {
  const EC = protractor.ExpectedConditions;

  let xpath = xpathSelector;
  if (nth) {
    // remove nd from 2nd for example
    xpath = `(${xpath})[${nth.replace(/\D/g, '')}]`;
  }
  console.log('            Getting element by xpath:');
  console.log('              ', xpath);
  const elToClick = element(by.xpath(xpath));
  return browser.wait(EC.presenceOf(elToClick))
    .then(() => elToClick.click());
};
