import { deepCopy, getIntervalTime, isObj, isArray } from '../../src/components/Page-components/utils';

describe('Test tool function', () => {
  it('deepCopy', () => {
    const ob1 = deepCopy();
    expect(ob1).toBeUndefined();

    const ob2 = deepCopy({a: 1, arr: [2,3,5,6]});
    expect(ob2.arr[0]).toBe(2);

    const a = {a: 1, obj: {a:1}};
    const ob3 = deepCopy(a);
    a.obj.a = 3;
    expect(ob3.obj.a).toBe(1);
  })

  it('the time interval', () => {
    const d1 = getIntervalTime();
    expect(d1).toEqual([]);

    // const d2 = getIntervalTime(3);
    // expect(d2).toEqual([(Date.now() - 3 * 24 * 3600 * 1000), Date.now()])
  })

  it('isObj', () => {
    const res = isObj({});
    expect(res).toBe(true);
  })

  it('isArray', () => {
    const arr = isArray();
    expect(arr).toBe(false);
  })
})

