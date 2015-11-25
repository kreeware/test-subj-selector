function seletorToTerms(selector) {
  return selector
  .replace(/\s*&\s*/g, '&') // remove all whitespace around joins
  .split(/\s+/)
}

function termToCssSelector(term) {
  return term ? '[data-test-subj~="' + term + '"]' : '';
}

module.exports = function testSubjSelector(/* ...selectors */) {
  var selectors = Array.prototype.slice.call(arguments);
  var cssSelectors = [];

  while (selectors.length) {
    var cssSelectorParts = [];
    var subjectSelector = selectors.shift();
    var terms = seletorToTerms(subjectSelector);

    while (terms.length) {
      var term = terms.shift();
      // split each term by joins/& and map to css selectors
      cssSelectorParts.push(term.split('&').map(termToCssSelector).join(''));
    }

    cssSelectors.push(cssSelectorParts.join(' '));
  }

  return cssSelectors;
};
