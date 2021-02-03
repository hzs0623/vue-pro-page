import { formatTime, getManageMap, getTableList } from '../../src/components/Page-components/utils/tableCore';

describe('table config', () => {
  it('时间戳', () => {
    const date1 = formatTime(1612318013412);
    expect(date1).toBe('2021-02-03 10:06:53');

    const date2 = formatTime();
    expect(date2).toBeUndefined();

    const date3 = formatTime(1612318013412, 'YYYY-MM-DD');
    expect(date3).toBe('2021-02-03');
  });

  it('映射map', () => {
    const res1 = getManageMap({}, '');
    expect(res1).toBe('');

    const res2 = getManageMap([{label: 'key', value: 'value'}, 'value'],  'value');
    expect(res2).toBe('key');

    const res3 = getManageMap([{label: 'key', value: 'value'}, 'value'],  '');
    expect(res3).toBe('');

    const res4 = getManageMap({key: 'value'},  'key');
    expect(res4).toBe('value');
  })

  it('getTableList', () => {
    const res1 = getTableList([{title: 'title', key: 'id',}], [{id: '1'}]);
    expect(res1[0].id).toBe('1');

    const res2 = getTableList([{title: 'title', key: 'id',map: {1: '开启'}}], [{id: '1'}]);
    expect(res2[0].id).toBe('开启');


    const res3 = getTableList([{title: 'title', key: 'id',map: [{label: '开启',value: '1'}]}], [{id: '1'}]);
    expect(res3[0].id).toBe('开启');
  })
})