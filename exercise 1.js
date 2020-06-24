const sleep = (milliseconds) => {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
};

const printTime = () => {
    return `${new Date().getTime()} -`;
};

const t = () => printTime();

const curryDelay = (f, delay, delaySinceCompletion, waitForPrevious, queueLimit) => {

    const startDelayed = (f, number, callback, delay) => {
        const queueLength = queue.length;

        addToQueue(f, number);

        console.log(`${t()} №${number} ждет в очереди`);

        const action = () => {
            console.log(`${t()} №${number} начал выполнение`);
            f();
            console.log(`${t()} №${number} закончил выполнение`);
            callback();
        };

        setTimeout(action, delay*queueLength);

        /*
        if (delaySinceCompletion) { //от конца

        } else { //от начала
            if (waitForPrevious) { //ждать
                const prevTaskExist = queue[number-1];

                if (prevTaskExist) {

                } else {

                }
            } else { //не ждать
                setTimeout(action, delay*queueLength);
            }
        }
        */
    };

    let queue = [];

    const addToQueue = (func, number) => {
        queue.push({
            func,
            number,
            status: "Waiting",
        });
        console.log(`${t()} теперь в очереди ${queue.length} задач(и)`);
    };

    const delFromQueue = () => {
        const deleted = queue.shift();

        console.log(`${t()} №${deleted.number} вышел из очереди`);
        console.log(`${t()} теперь в очереди ${queue.length} задач(и)`);
    };

    const startNextChain = () => {
        if (queue.length > 0) {
            const action = queue[0].func;

            setTimeout(action, delaySinceCompletion ? delay : 0);
        }
    };

    let totalCount = 0;

    const incrementTotalCount = () => {
        return totalCount+=1;
    };

    return (...args) => {
        console.log(`${t()} сейчас в очереди ${queue.length} задач(и)`);

        const action = () => f(...args);

        const number = incrementTotalCount();

        const callback = () => {
            delFromQueue();

            //startNextChain();
        };

        startDelayed(
            action,
            number,
            callback,
            delay
        );
    };
};

const f = (number) => {
    console.log(`Процесс...`);
    sleep(number);
};

const g = curryDelay(f, 10000, false);

g(100000);
g(100000);
g(100000);
g(100000);