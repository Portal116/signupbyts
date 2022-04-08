import React from 'react';

function Practice() {
  // let songInfo: { song: string; singer: string } = { song: '하늘바라기', singer: '정은지' };
  function test(salary: number, house: boolean, charm: '상' | '중' | '하') {
    let point = salary;
    if (house) {
      point += 500;
    }
    if (charm === '상') {
      point += 100;
    }
    if (point >= 600) {
      return '결혼가능';
    }
  }
  return <div className="App">{test(500, false, '상')}</div>;
}
export default Practice;
