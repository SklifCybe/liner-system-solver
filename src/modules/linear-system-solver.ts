import * as math from 'mathjs';

export class LinearSystemSolver {
    private A: math.Matrix;
    private b: math.Matrix;
    private x0: math.Matrix;
    private tolerance: number;
    private maxIterations: number;

    constructor(A: number[][], b: number[]) {
        this.A = math.matrix(A);
        this.b = math.matrix(b);
        this.x0 = math.matrix(Array(b.length).fill(0));
        this.tolerance = 0.01;
        this.maxIterations = 100;
    }

    public solve(): math.Matrix {
        let x = this.x0.clone();
        let iteration = 0;
        let error: number | math.BigNumber = Infinity;

        while (iteration < this.maxIterations && error > this.tolerance) {
            let xNext = math.multiply(this.A, x);
            xNext = math.add(xNext, this.b);
            error = math.norm(math.subtract(xNext, x));
            x = xNext.clone();
            iteration++;
        }

        return x;
    }
}
