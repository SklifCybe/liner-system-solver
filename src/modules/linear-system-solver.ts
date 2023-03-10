export class LinearSystemSolver {
    private readonly tolerance = 0.0001;

    constructor(private readonly matrix: number[][], private readonly vector: number[]) {}

    public solve() {
        const result: number[] = [];
        const size = this.vector.length;
        
        let counter = 0;

        for (let i = 0; i < size; i++) {
            result[i] = this.vector[i] / this.matrix[i][i];
        }

        const Xn: number[] = [];

        do {
            counter++;

            if (counter >= 100_000_000) {
                throw new Error('Алгоритм подсчёта выполнился более 100 миллиона раз. Сложно подсчитать значение.');
            }

            for (let i = 0; i < size; i++) {
                Xn[i] = this.vector[i] / this.matrix[i][i];

                for (let j = 0; j < size; j++) {
                    if (i === j) {
                        continue;
                    } else {
                        Xn[i] -= (this.matrix[i][j] / this.matrix[i][i]) * result[j];
                    }
                }
            }

            let flag = true;
            for (let i = 0; i < size - 1; i++) {
                if (Math.abs(Xn[i] - result[i]) > this.tolerance) {
                    flag = false;
                    break;
                }
            }

            for (let i = 0; i < size; i++) {
                result[i] = Xn[i];
            }

            if (flag) {
                break;
            }
        } while (1);

        return result;
    }
}
