const { willCollide } = require('../../assets/Script/util/sceneUtils');

describe('willCollide - ', () => {
  test.each`
  x1    | x2      | dist   | expected
  ${-1} | ${200}  | ${200} | ${false}
  ${0}  | ${200}  | ${200} | ${true}
  ${1}  | ${200}  | ${200} | ${true}
  ${0}  | ${-200} | ${200} | ${true}
  ${-1} | ${-200} | ${200} | ${true}
  ${1}  | ${-200} | ${200} | ${false}
  ${0}  | ${1}    | ${1}   | ${true}
  ${0}  | ${2}    | ${1}   | ${false}
  ${0}  | ${0}    | ${1}   | ${true}
  ${-50}| ${50}   | ${200} | ${true}
  ${1}  | ${1}    | ${0} | ${true}
  `('returns $expected when $x1 is compared to $x2 with a distance of $dist', ({ expected, x1, x2, dist }) => expect(willCollide(x1, x2, dist)).toEqual(expected));
});
