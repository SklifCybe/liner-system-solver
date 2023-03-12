import fs from 'fs/promises';
export const setVector = async (params) => {
    const { variant, sizeOfMatrix } = params;
    let vectorString = '';
    if (variant === 'console') {
        vectorString = await params.commandLineInterface.question('Введите вектор, через пробел: ');
    }
    else {
        const fileData = await fs.readFile(params.filepath, 'utf-8');
        [, vectorString] = fileData.split(',');
    }
    const vector = vectorString.trim().split(' ').map(Number);
    if (vector.includes(Number.NaN)) {
        throw new Error('Ошибка ввода вектора. Используйте числа и ставьте между ними пробел.');
    }
    if (vector.length !== sizeOfMatrix) {
        throw new Error('Ошибка заполнения вектора. Вводите кол-во элементов согласно размеру матрицы.');
    }
    return vector;
};
//# sourceMappingURL=set-vector.js.map