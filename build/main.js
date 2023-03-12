import path from 'path';
import fs from 'fs/promises';
import readline from 'readline/promises';
import { setMatrix } from './modules/set-matrix.js';
import { setVector } from './modules/set-vector.js';
import { choiceLogic } from './modules/choice-logic.js';
import { setSizeOfMatrix } from './modules/set-size-of-matrix.js';
import { LinearSystemSolver } from './modules/linear-system-solver.js';
const main = async () => {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    console.log('Приложение для решения систем линейных уравнений методом простых итераций.');
    const commandLineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    const choice = await choiceLogic(commandLineInterface);
    const sizeOfMatrix = await setSizeOfMatrix(commandLineInterface);
    let matrix = [];
    let vector = [];
    if (choice === 1) {
        const variant = 'console';
        matrix = await setMatrix({ commandLineInterface, sizeOfMatrix, variant });
        vector = await setVector({ commandLineInterface, sizeOfMatrix, variant });
    }
    else if (choice === 2) {
        const variant = 'file';
        const filename = 'input.txt';
        const filepath = path.join(path.resolve(), filename);
        console.log(`Введите матрицу в файл - ${filename} через пробелы, затем поставьте запятую и введите вектор через пробелы`);
        const answer = await commandLineInterface.question('Как только заполните файл, введите ok: ');
        if (answer !== 'ok') {
            throw new Error('Вы ввели некорректное сообщение об окончании ввода в файл');
        }
        matrix = await setMatrix({ filepath, sizeOfMatrix, variant });
        vector = await setVector({ filepath, sizeOfMatrix, variant });
    }
    const linearSystem = new LinearSystemSolver(matrix, vector);
    const result = linearSystem.solve();
    const resultArray = result
        .toArray()
        .map(String)
        .map((el) => el.slice(0, 7))
        .map(Number)
        .map((el) => el.toFixed(3));
    const resultString = `Результат: ${resultArray.join(' ')}`;
    const filenameOutput = 'output.txt';
    const outputFilepath = path.join(path.resolve(), filenameOutput);
    console.log(resultString);
    try {
        await fs.writeFile(outputFilepath, resultString, 'utf-8');
    }
    catch (_a) {
        throw new Error('Ошибка записи ответа в файл');
    }
    commandLineInterface.close();
    process.exit(0);
};
try {
    await main();
}
catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
        process.exit(1);
    }
}
//# sourceMappingURL=main.js.map