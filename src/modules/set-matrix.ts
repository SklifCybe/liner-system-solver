import fs from 'fs/promises';

import type { Interface } from 'readline/promises';

import type { VariantUse } from '../types/variant-use.js';

const diagonal = (matrix: number[][]): boolean => {
    let flag = true;
    const matrixSize = matrix.length;
    let sum = 0;
  
    for (let i = 0; i < matrixSize; i++) {
      sum = 0;
      
      for (let j = 0; j < matrixSize; j++) {
        sum += Math.abs(matrix[i][j]);
      }
  
      sum -= Math.abs(matrix[i][i]);
  
      if (sum > matrix[i][i]) {
        flag = false;
      }
    }
  
    return flag;
  };

type Parameters =
    | {
          commandLineInterface: Interface;
          variant: Extract<VariantUse, 'console'>;
          sizeOfMatrix: number;
      }
    | {
          filepath: string;
          variant: Extract<VariantUse, 'file'>;
          sizeOfMatrix: number;
      };

export const setMatrix = async (params: Parameters): Promise<number[][]> => {
    let matrixString = '';

    const { variant, sizeOfMatrix } = params;

    if (variant === 'console') {
        matrixString = await params.commandLineInterface.question('Заполните матрицу значениями, через пробел: ');
    } else {
        const fileData = await fs.readFile(params.filepath, 'utf-8');

        if (!fileData.includes(',')) {
            throw new Error(
                'Вы пропустили знак запятой, между матрицей и вектором',
            );
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

    const matrix: number[][] = [];

    while (singleMatrix.length) {
        matrix.push(singleMatrix.splice(0, sizeOfMatrix));
    }

    if (!diagonal(matrix)) {
        throw new Error('Не выполняется преобладание диагоналей');
    }

    return matrix;
};
