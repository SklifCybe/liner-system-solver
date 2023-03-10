import fs from 'fs/promises';

import type { Interface } from 'readline/promises';

import type { VariantUse } from '../types/variant-use.js';

type Parameters =
    | {
          sizeOfMatrix: number;
          variant: Extract<VariantUse, 'console'>;
          commandLineInterface: Interface;
      }
    | {
          sizeOfMatrix: number;
          variant: Extract<VariantUse, 'file'>;
          filepath: string;
      };

export const setVector = async (params: Parameters): Promise<number[]> => {
    const { variant, sizeOfMatrix } = params;

    let vectorString = '';

    if (variant === 'console') {
        vectorString = await params.commandLineInterface.question('Введите вектор, через пробел: ');
    } else {
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
