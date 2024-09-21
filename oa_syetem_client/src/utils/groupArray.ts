const people = [
  {
    name: "Alice",
    age: 30,
    sex: "female",
  },
  {
    name: "Bob",
    age: 25,
    sex: "male",
  },
  {
    name: "Charlie",
    age: 30,
    sex: "male",
  },
  {
    name: "Diana",
    age: 25,
    sex: "female",
  },
  {
    name: "Eva",
    age: 25,
    sex: "female",
  },
  {
    name: "Frank",
    age: 25,
    sex: "male",
  },
  {
    name: "Grace",
    age: 20,
    sex: "female",
    address: {
      province: "LiaoNing",
      city: "ShenYang",
    },
  },
];

function groupBy(arr, generateKey) {
  let func;
  if (typeof generateKey === "string") {
    func = (item) => item[generateKey];
  }
  const result = {};
  for (const person of arr) {
    debugger;
    const key = (func ?? generateKey)(person);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(person);
  }
  return result;
}

// 按年龄分组
const result1 = groupBy(people, (item) => item.age);
console.log("result1", result1);

// 按性别分组
const result2 = groupBy(people, "sex");
console.log("result2", result2);

// 按照性别和年龄分组
const result3 = groupBy(people, (item) => `${item.sex}-${item.age}`);
console.log("result3", result3);

// 按照奇偶数分组
const arr = [3, 7, 1, 4, 8, 2];
const result4 = groupBy(arr, (item) => (item % 2 === 0 ? "偶数" : "奇数"));
console.log("result4", result4);
