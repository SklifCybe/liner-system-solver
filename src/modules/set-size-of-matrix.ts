import type { Interface } from 'readline/promises';

// устанавливаем значение размера матрицы
export const setSizeOfMatrix = async (commandLineInterface: Interface): Promise<number> => {
    const sizeOfMatrixString = await commandLineInterface.question('Выберите размерность матрицы: ');
    const sizeOfMatrix = Number(sizeOfMatrixString.trim());

    if (Number.isNaN(sizeOfMatrix) || Math.round(sizeOfMatrix) !== sizeOfMatrix || sizeOfMatrix < 0) {
        throw new Error('Ошибка выбора размера матрицы. Используйте только целые числа.');
    }

    return sizeOfMatrix;
};
