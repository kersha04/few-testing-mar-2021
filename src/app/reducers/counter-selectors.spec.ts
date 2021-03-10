import * as index from '.';
describe('Counter Selectors', () => {

  it('can select the counter branch', () => {

    const response = index._selectCounterBranch({
      counter: { current: 99 }
    });

    expect(response).toEqual({
      current: 99
    });
  });

  it('selectCurrentCount', () => {
    // const response = index.selectCurrentCount({
    //   counter: {
    //     current: 12
    //   }
    // });
    const response = index.selectCurrentCount.projector({ current: 9 });

    expect(response).toBe(9);
  });

});
