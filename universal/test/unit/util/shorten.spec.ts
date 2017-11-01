import {expect} from 'chai';

import {shorten} from 'src/util/shorten';

describe('shorten', function() {
  it('should shorten some numbers', function() {
    expect(shorten(100, 0)).to.eql('100');
    expect(shorten(156300, 0)).to.eql('156K');
    expect(shorten(1200000, 0)).to.eql('1M');
  });

  it('should shorten some numbers with decimals', function() {
    expect(shorten(100, 1)).to.eql('100');
    expect(shorten(156300, 1)).to.eql('156.3K');
    expect(shorten(1200000, 1)).to.eql('1.2M');
  });
});
