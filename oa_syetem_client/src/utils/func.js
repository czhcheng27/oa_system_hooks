export function arrange(name) {
  const tasks = [];

  tasks.push(() => {
    console.log(`${name} is notified`);
  });

  function wait(time) {
    tasks.push(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, time * 1000);
        })
    );
    return this;
  }
  function doSomething(taskName) {
    tasks.push(() => {
      console.log(`Start to ${taskName}`);
    });
    return this;
  }
  function waitFirst(time) {
    tasks.unshift(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            console.log(`I've wait ${time} seconds`);
            resolve();
          }, time * 1000);
        })
    );
    return this;
  }
  async function execute() {
    for (const t of tasks) {
      await t();
    }
    return this;
  }

  return {
    wait,
    doSomething,
    waitFirst,
    execute,
  };
}
