let timeoutId;
const get = (id) => Number.parseInt(document.getElementById(id).value)
const clearOutput = () => document.getElementById('out').innerHTML = '';
const clearSteps = () => document.getElementById('step').innerHTML = '';

const drawRow = (x, y, n) => {
  const out = document.getElementById('out');
  const row = document.createElement('div');
  row.setAttribute('class', 'flex items-center justify-between fade-in mb-4');
  row.setAttribute('id', `row-${n}`);
  row.innerHTML = `
      <div class="x bg-blue-100 px-2 py-1 w-5/12">${x}</div>
      <div class="y bg-orange-100 px-2 py-1 w-5/12">${y}</div>
  `;
  out.append(row);
}

const drawStep = (message, bg = 'bg-blue-700') => {
  const step = document.getElementById('step');
  const explain = document.createElement('p');
  explain.innerHTML = message;
  explain.className = `px-2 py-1 mb-4 ${bg} text-white font-bold rounded fade-in`;
  step.append(explain);
}

const addRows = (n, total) => {  
  const row = document.querySelector(`#row-${n}`);
  if (!row) {
    timeoutId = setTimeout(() => {
      const row1 = document.querySelector('#row-0');
      const x1 = Number.parseInt(row1.querySelector(`.x`).innerHTML);
      const y1 = Number.parseInt(row1.querySelector(`.y`).innerHTML);
      drawStep(`${x1} × ${y1} = ${total}`, 'bg-green-700');
      drawStep('Explanation from Numberphile: <a href="https://www.youtube.com/watch?v=HJ_PP5rqLg0" target="_blank" class="underline">https://www.youtube.com/watch?v=HJ_PP5rqLg0</a>');
    }, 1500);
    return; // lazy
  }

  const x = Number.parseInt(row.querySelector(`.x`).innerHTML);
  const y = Number.parseInt(row.querySelector(`.y`).innerHTML);
  if (x % 2) {
    row.className = `${row.className} selected`;
    addRows(n + 1, total + y);
  } else {
    addRows(n + 1, total);
  }
}

const removeRows = (n) => {
  const row = document.querySelector(`#row-${n}`);
  const x = Number.parseInt(row.querySelector(`.x`).innerHTML);
  if (x % 2 === 0) {
    row.className = `${row.className} unselected`;
  }
  if (n === 0) {
    drawStep('4. Add the remaining values in the right column');
    timeoutId = setTimeout(() => addRows(n, 0), 2500);
    return;
  }
  
  removeRows(n - 1);
}

const doRussianMaths = (x, y, n) => {
  drawRow(x, y, n);
  if (x <= 1) {
    drawStep('3. Ignore the rows with even numbers on the left');
    timeoutId = setTimeout(() => removeRows(n), 2500);
    return;
  }

  timeoutId = setTimeout(() => {
    doRussianMaths(Math.floor(x / 2), y * 2, n + 1);
  }, 1500);
}

const fastRussianMaths = (x, y, total) => (
  x <= 0
    ? total
    : fastRussianMaths(x >> 1, y << 1, total + (x % 2 ? y : 0))
);

const doMath = () => {
  clearTimeout(timeoutId);
  clearOutput();
  clearSteps();
  
  drawStep('1. Divide the first number in half rounded down, double the second');
  setTimeout(() => drawStep('2. Repeat until you reach 1'), 2500);
  doRussianMaths(get('x'), get('y'), 0);
  
  // simple recursive implementation
  console.log(fastRussianMaths(get('x'), get('y'), 0));
  return false;
}