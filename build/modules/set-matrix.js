import fs from 'fs/promises';
export const setMatrix = async (params) => {
    let matrixString = '';
    const { variant, sizeOfMatrix } = params;
    if (variant === 'console') {
        matrixString = await params.commandLineInterface.question('Заполните матрицу значениями, через пробел: ');
    }
    else {
        const fileData = await fs.readFile(params.filepath, 'utf-8');
        if (!fileData.includes(',')) {
            throw new Error('Вы пропустили знак запятой, между матрицей и вектором');
        }
        [matrixString] = fileData.split(',');
    }
    const singleMatrix = matrixString.trim().split(' ').map(Number);
    if (singleMatrix.includes(Number.NaN)) {
        throw new Error('Ошибка ввода матрицы. Используйте только числа и ставьте между ними пробел.');
    }
    if (Math.sqrt(singleMatrix.length) !== sizeOfMatrix) {
        throw new Error('Введённая матрица не соответствует своему размеру.');
    }
    const matrix = [];
    while (singleMatrix.length) {
        matrix.push(singleMatrix.splice(0, sizeOfMatrix));
    }
    return matrix;
};
//# sourceMappingURL=set-matrix.js.map