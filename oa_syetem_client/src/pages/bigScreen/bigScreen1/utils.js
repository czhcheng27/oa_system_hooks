export const finishNum = (obj) => {
  const values = Object.values(obj);
  let num = 0;
  for (let i = 0; i < values.length; i++) {
    if (!values[i]) num += 1;
  }
  return num;
};

// 针对 chart 1&2 获取 x 轴项目号及项目id 的数组
export const getSpecificData = (array = [], code) => {
  let res = [];
  array?.forEach((el) => {
    res.push(el[code]);
  });
  return res;
};

export const formatData = (data) => {
  return data.map((el) => {
    return {
      value: el,
    };
  });
};

export const getPureAccumulate = (array) => {
  let res = [];
  for (let i = 0; i < array[0].length; i++) {
    let num = 0;
    for (let j = 0; j < array.length; j++) {
      num += array[j][i];
    }
    res.push(num);
  }
  return res;
};

// 计算冲击波的值确定高度
export const getTotalData = (array) => {
  let res = [];
  for (let i = 0; i < array[0].length; i++) {
    let num = 0;
    for (let j = 0; j < array.length; j++) {
      num += array[j][i].value;
    }
    res.push({ value: num + num * 0.01 });
  }
  return res;
};

export const formatChart7 = (array = []) => {
  let res = [];
  array.forEach((el) => {
    const { abilityScore, tacticScore, firstSystem, firstSystemName } = el;
    return res.push({
      firstSystem,
      firstSystemName,
      value: [abilityScore, tacticScore],
    });
  });
  return res;
};
