const test = require('node:test');
const assert = require('node:assert/strict');
function ohmsLaw(voltage, resistance){ if(!Number.isFinite(voltage)||!Number.isFinite(resistance)||voltage<0||resistance<=0) throw new Error('Invalid circuit values'); return voltage/resistance; }
function scoreQuiz(questions, answers){ if(!Array.isArray(answers)||answers.length!==questions.length) throw new Error('Answer count mismatch'); return {score:questions.reduce((sum,q,i)=>sum+(answers[i]===q.correct?1:0),0),total:questions.length}; }
function academicIndicator({type,value,maxValue}){ if(type==='assessment'&&maxValue>0&&value/maxValue<.5)return 'attention';if(type==='attendance'&&value<75)return 'attention';return null; }
test('Ohm’s Law computes current from voltage and resistance',()=>{assert.equal(ohmsLaw(12,6),2);assert.equal(ohmsLaw(9,3),3)});
test('Ohm’s Law rejects zero resistance',()=>{assert.throws(()=>ohmsLaw(12,0),/Invalid/)});
test('quiz scoring uses answer key, not client-supplied score',()=>{const r=scoreQuiz([{correct:0},{correct:2},{correct:1}],[0,2,0]);assert.deepEqual(r,{score:2,total:3})});
test('quiz scoring rejects incomplete submissions',()=>{assert.throws(()=>scoreQuiz([{correct:1} ,{correct:0}],[1]),/Answer count/)});
test('academic indicators trigger only when documented thresholds are crossed',()=>{assert.equal(academicIndicator({type:'assessment',value:40,maxValue:100}),'attention');assert.equal(academicIndicator({type:'attendance',value:74}),'attention');assert.equal(academicIndicator({type:'assessment',value:80,maxValue:100}),null);assert.equal(academicIndicator({type:'attendance',value:90}),null)});
