import { ColdCallPage } from './app.po';

describe('cold-call App', () => {
  let page: ColdCallPage;

  beforeEach(() => {
    page = new ColdCallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
